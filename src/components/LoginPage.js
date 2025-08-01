import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { getUserByEmail } from '../services/userService';
import { getRealtimeUserByEmail, updateUserOnlineStatus } from '../services/realtimeUserService';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 清除錯誤訊息
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email 驗證
    if (!formData.email.trim()) {
      newErrors.email = 'Email 為必填欄位';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '請輸入有效的 Email 格式';
    }

    // 密碼驗證
    if (!formData.password) {
      newErrors.password = '密碼為必填欄位';
    } else if (formData.password.length < 6) {
      newErrors.password = '密碼至少需要 6 個字元';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Firebase 登入
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        formData.email.trim(), 
        formData.password
      );
      
      console.log('登入成功:', userCredential.user);
      
      // 嘗試從 Realtime Database 獲取用戶資料並更新 AuthContext（不阻擋登入流程）
      try {
        const realtimeUserProfile = await getRealtimeUserByEmail(formData.email.trim());
        console.log('Realtime Database 用戶資料:', realtimeUserProfile);
        
        if (realtimeUserProfile) {
          // 更新用戶在線狀態
          try {
            await updateUserOnlineStatus(userCredential.user.uid, true);
          } catch (statusError) {
            console.warn('更新在線狀態失敗:', statusError);
          }
          
          // 更新 AuthContext 中的用戶狀態
          try {
            await updateUser(userCredential.user, realtimeUserProfile);
            localStorage.setItem('userProfile', JSON.stringify(realtimeUserProfile));
          } catch (contextError) {
            console.warn('更新 AuthContext 失敗:', contextError);
          }
        } else {
          // 如果 Realtime Database 中沒有資料，嘗試從 Firestore 獲取
          try {
            const firestoreUserProfile = await getUserByEmail(formData.email.trim());
            console.log('Firestore 用戶資料:', firestoreUserProfile);
            
            if (firestoreUserProfile) {
              await updateUser(userCredential.user, firestoreUserProfile);
              localStorage.setItem('userProfile', JSON.stringify(firestoreUserProfile));
            }
          } catch (firestoreError) {
            console.warn('從 Firestore 獲取用戶資料失敗:', firestoreError);
          }
        }
      } catch (profileError) {
        console.warn('獲取用戶資料失敗，但不影響登入流程:', profileError);
        // 如果所有資料庫都失敗，只使用 Firebase Auth 的基本資料
        try {
          await updateUser(userCredential.user);
        } catch (basicUpdateError) {
          console.warn('更新基本用戶資料失敗:', basicUpdateError);
        }
      }
      
      // 登入成功，無論資料載入是否成功都跳轉到首頁
      alert('登入成功！歡迎回來！');
      navigate('/');
      
    } catch (error) {
      console.error('登入失敗:', error);
      
      // 處理不同的錯誤類型
      let errorMessage = '登入失敗，請稍後再試';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = '找不到此 Email 的帳戶';
          break;
        case 'auth/wrong-password':
          errorMessage = '密碼錯誤';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email 格式不正確';
          break;
        case 'auth/user-disabled':
          errorMessage = '此帳戶已被停用';
          break;
        case 'auth/too-many-requests':
          errorMessage = '嘗試次數過多，請稍後再試';
          break;
        default:
          errorMessage = error.message || '登入失敗，請稍後再試';
      }
      
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // 這裡將來可以實作忘記密碼功能
    alert('忘記密碼功能尚未實作');
  };

  return (
    <div className="min-h-screen bg-cream-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">會員登入</h2>
            <p className="text-gray-600">歡迎回來！請輸入您的登入資訊</p>
          </div>

          {/* 顯示一般錯誤訊息 */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="請輸入您的 Email"
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* 密碼 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                密碼 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="請輸入您的密碼"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* 記住我和忘記密碼 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  記住我
                </label>
              </div>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-green-600 hover:text-green-500"
              >
                忘記密碼？
              </button>
            </div>

            {/* 登入按鈕 */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    登入中...
                  </div>
                ) : (
                  '登入'
                )}
              </button>
            </div>
          </form>

          {/* 註冊連結 */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              還沒有帳戶嗎？
              <Link
                to="/register"
                className="ml-1 font-medium text-green-600 hover:text-green-500"
              >
                立即註冊
              </Link>
            </p>
          </div>

          {/* 返回首頁連結 */}
          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-sm text-green-600 hover:text-green-500"
            >
              返回首頁
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
