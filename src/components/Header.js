import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { getUserProfile } from '../services/userService';

const Header = () => {
  const { user, loading } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // 檢查用戶是否為真實登入用戶（非匿名、非臨時用戶）
  const isRealUser = user && !user.isAnonymous && !user.isTemporary && user.email;

  // 當用戶登入時，獲取完整的用戶資料
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isRealUser && user.uid) {
        setProfileLoading(true);
        try {
          const profile = await getUserProfile(user.uid);
          console.log('獲取到的用戶資料:', profile);
          setUserProfile(profile);
        } catch (error) {
          console.error('獲取用戶資料失敗:', error);
          // 如果獲取失敗，使用 Firebase Auth 的基本資訊
          setUserProfile({
            nickname: user.displayName || user.email?.split('@')[0] || '用戶',
            email: user.email
          });
        } finally {
          setProfileLoading(false);
        }
      } else {
        setUserProfile(null);
      }
    };

    fetchUserProfile();
  }, [isRealUser, user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null); // 清除用戶資料
      alert('登出成功！');
    } catch (error) {
      console.error('登出失敗:', error);
      alert('登出失敗，請稍後再試');
    }
  };

  // 獲取顯示名稱
  const getDisplayName = () => {
    if (userProfile) {
      return userProfile.nickname || userProfile.fullName || userProfile.email?.split('@')[0] || '用戶';
    }
    return user?.displayName || user?.email?.split('@')[0] || '用戶';
  };
  return (
    <header className="bg-white border-b border-primary-200 shadow-sm">
      <div className="container-sm">
        <div className="flex justify-between items-center h-20">
          {/* 左側 - LOGO 和導航選單 */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Catcher Logo" className="h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity" />
            </Link>
            
            {/* 導航選單 */}
            <nav className="hidden md:flex space-x-8">
              {isRealUser && (
                <>
                  <a href="#" className="text-primary-600 hover:text-primary-800 font-medium transition-colors">上架服務</a>
                  <Link to="/chat" className="text-primary-600 hover:text-primary-800 font-medium transition-colors">私訊紀錄</Link>
                </>
              )}
              <a href="#" className="text-primary-600 hover:text-primary-800 font-medium transition-colors">聯絡我們</a>
              <a href="#" className="text-primary-600 hover:text-primary-800 font-medium transition-colors">FAQ</a>
            </nav>
          </div>

          {/* 右側 - 登入按鈕 */}
          <div className="flex items-center space-x-4">
            {loading || profileLoading ? (
              <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
            ) : isRealUser ? (
              <>
                <span className="text-primary-600 font-medium">
                  歡迎，{getDisplayName()}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-primary-600 hover:text-primary-800 font-medium transition-colors"
                >
                  登出
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-primary-600 hover:text-primary-800 font-medium transition-colors">
                  登入
                </Link>
                <Link to="/register" className="btn-primary">
                  免費註冊
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
