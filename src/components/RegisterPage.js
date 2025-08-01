import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { createUserProfile } from '../services/userService';
import { createRealtimeUserProfile, updateUserOnlineStatus } from '../services/realtimeUserService';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    nickname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 檢查檔案大小 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          avatar: '檔案大小不能超過 5MB'
        }));
        return;
      }

      // 檢查檔案類型
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          avatar: '請選擇圖片檔案'
        }));
        return;
      }

      setAvatarFile(file);
      
      // 產生預覽
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatarPreview(ev.target.result);
      };
      reader.readAsDataURL(file);

      // 清除錯誤訊息
      if (errors.avatar) {
        setErrors(prev => ({
          ...prev,
          avatar: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // 必填欄位驗證
    if (!formData.fullName.trim()) {
      newErrors.fullName = '姓名為必填欄位';
    }

    if (!formData.nickname.trim()) {
      newErrors.nickname = '暱稱為必填欄位';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email 為必填欄位';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '請輸入有效的 Email 格式';
    }

    // 手機號碼格式驗證（選填）
    if (formData.phone && !/^09\d{8}$/.test(formData.phone)) {
      newErrors.phone = '請輸入有效的手機號碼格式（例：0912345678）';
    }

    // 密碼驗證
    if (!formData.password) {
      newErrors.password = '密碼為必填欄位';
    } else if (formData.password.length < 6) {
      newErrors.password = '密碼至少需要 6 個字元';
    }

    // 確認密碼驗證
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '請確認密碼';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '密碼不一致';
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
      // 1. 在 Firebase Authentication 中創建帳戶
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );

      let avatarURL = null;

      // 2. 如果有頭像檔案，先上傳到 Firebase Storage
      if (avatarFile) {
        try {
          const filename = 'avatars/' + Date.now() + '_' + avatarFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
          const imgRef = ref(storage, filename);
          await uploadBytes(imgRef, avatarFile);
          avatarURL = await getDownloadURL(imgRef);
          console.log('頭像上傳成功:', avatarURL);
        } catch (uploadError) {
          console.warn('頭像上傳失敗，但繼續註冊流程:', uploadError);
        }
      }

      // 3. 更新 Firebase Auth 的 profile
      await updateProfile(userCredential.user, {
        displayName: formData.nickname.trim(),
        photoURL: avatarURL
      });

      // 4. 創建用戶資料
      const userData = {
        uid: userCredential.user.uid,
        fullName: formData.fullName.trim(),
        nickname: formData.nickname.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        avatar: avatarURL || null,
        online: true,
        lastActive: Date.now(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      console.log('創建用戶資料:', userData);

      // 4. 嘗試同時創建 Firestore 和 Realtime Database 用戶資料（不阻擋註冊流程）
      try {
        await Promise.all([
          createUserProfile(userData), // Firestore
          createRealtimeUserProfile(userData) // Realtime Database
        ]);
        console.log('用戶資料創建完成（Firestore + Realtime Database）');
      } catch (dbError) {
        console.warn('用戶資料創建失敗，但不影響註冊流程:', dbError);
        // 資料庫寫入失敗不影響註冊成功
      }
      
      // 5. 嘗試設置用戶在線狀態（不阻擋註冊流程）
      try {
        await updateUserOnlineStatus(userCredential.user.uid, true);
      } catch (statusError) {
        console.warn('設置在線狀態失敗，但不影響註冊流程:', statusError);
      }
      
      // 6. 嘗試更新 AuthContext 中的用戶狀態（不阻擋註冊流程）
      try {
        await updateUser(userCredential.user, userData);
      } catch (contextError) {
        console.warn('更新 AuthContext 失敗，但不影響註冊流程:', contextError);
      }
      
      // 7. 註冊成功，無論資料載入是否成功都跳轉到首頁
      alert('註冊成功！歡迎加入 Catcher！');
      navigate('/');
      
    } catch (error) {
      console.error('註冊失敗:', error);
      
      // 處理不同的錯誤類型
      let errorMessage = '註冊失敗，請稍後再試';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = '此 Email 已被註冊';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email 格式不正確';
          break;
        case 'auth/weak-password':
          errorMessage = '密碼強度太弱';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = '註冊功能未啟用';
          break;
        default:
          errorMessage = error.message || '註冊失敗，請稍後再試';
      }
      
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">會員註冊</h2>
            <p className="text-gray-600">請填寫以下資訊完成註冊</p>
          </div>

          {/* 顯示一般錯誤訊息 */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 姓名 */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                姓名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="請輸入您的真實姓名"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* 暱稱 */}
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
                暱稱 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.nickname ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="請輸入您的暱稱"
              />
              {errors.nickname && (
                <p className="mt-1 text-sm text-red-600">{errors.nickname}</p>
              )}
            </div>

            {/* 頭像上傳 */}
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-2">
                頭像 <span className="text-gray-500">(選填)</span>
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="頭像預覽"
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-gray-500">支援 JPG, PNG 格式，檔案大小不超過 5MB</p>
                  {errors.avatar && (
                    <p className="mt-1 text-sm text-red-600">{errors.avatar}</p>
                  )}
                </div>
              </div>
            </div>

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
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* 手機 */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                手機號碼 <span className="text-gray-500">(選填)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="請輸入您的手機號碼"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
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
                  placeholder="請輸入密碼（至少6個字元）"
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

            {/* 確認密碼 */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                確認密碼 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="請再次輸入密碼"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
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
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* 提交按鈕 */}
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
                    註冊中...
                  </div>
                ) : (
                  '完成註冊'
                )}
              </button>
            </div>
          </form>

          {/* 登入連結 */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              已經有帳戶了嗎？
              <Link
                to="/login"
                className="ml-1 font-medium text-green-600 hover:text-green-500"
              >
                立即登入
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

export default RegisterPage;
