import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth, db, realtimeDb } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// 漢堡選單圖標組件
const MenuIcon = ({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
    aria-label="Toggle menu"
  >
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {isOpen ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  </button>
);

// 用戶頭像組件
const UserAvatar = ({ user, userProfile, onClick, className = "w-8 h-8" }) => {
  const getInitials = (name) => {
    if (!name) return '?';
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name[0]?.toUpperCase() || '?';
  };

  const getAvatarColor = (uid) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500',
      'bg-teal-500', 'bg-cyan-500'
    ];
    if (!uid) return colors[0];
    
    const hash = uid.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length];
  };

  const displayName = userProfile?.nickname || userProfile?.displayName || user?.displayName || user?.email?.split('@')[0] || '訪客';
  const avatarUrl = userProfile?.avatar || userProfile?.photoURL || user?.photoURL;

  return (
    <div 
      className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
      onClick={onClick}
    >
      <div className={`${className} rounded-full overflow-hidden mr-2 border-2 border-gray-200 flex-shrink-0`}>
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={displayName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className={`w-full h-full flex items-center justify-center text-white text-sm font-medium ${getAvatarColor(user?.uid)} ${avatarUrl ? 'hidden' : 'flex'}`}
        >
          {getInitials(displayName)}
        </div>
      </div>
      <span className="text-gray-700 font-medium max-w-24 truncate hidden sm:block">{displayName}</span>
    </div>
  );
};

// 個人資料編輯模態框
const ProfileEditModal = ({ isOpen, onClose, user, userProfile, onProfileUpdate }) => {
  const [formData, setFormData] = useState({
    nickname: '',
    avatar: '',
    bio: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen && userProfile) {
      setFormData({
        nickname: userProfile.nickname || user?.displayName || '',
        avatar: userProfile.avatar || '',
        bio: userProfile.bio || ''
      });
    }
  }, [isOpen, userProfile, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.uid) return;

    setSaving(true);
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const updateData = {
        ...formData,
        updatedAt: new Date()
      };
      
      await updateDoc(userDocRef, updateData);
      onProfileUpdate(updateData);
      onClose();
    } catch (error) {
      console.error('更新個人資料失敗:', error);
      alert('更新失敗，請稍後再試');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">編輯個人資料</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              暱稱
            </label>
            <input
              type="text"
              value={formData.nickname}
              onChange={(e) => setFormData({...formData, nickname: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="請輸入暱稱"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              頭像網址
            </label>
            <input
              type="url"
              value={formData.avatar}
              onChange={(e) => setFormData({...formData, avatar: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="請輸入頭像圖片網址"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              個人簡介
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="請輸入個人簡介"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              disabled={saving}
            >
              取消
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              {saving ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Header = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 檢查用戶是否為真實登入用戶
  const isRealUser = user && !user.isAnonymous && !user.isTemporary && user.email;

  // 獲取用戶資料
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isRealUser && user.uid) {
        try {
          console.log('🔍 Header: 獲取用戶資料 from Firestore');
          
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            console.log('✅ Header: Firestore 用戶資料獲取成功');
            setUserProfile(userDoc.data());
          } else {
            console.log('📝 Header: 創建新的用戶基本資料');
            // 如果沒有用戶資料，創建基本資料
            const basicProfile = {
              nickname: user.displayName || user.email?.split('@')[0] || '用戶',
              email: user.email,
              avatar: user.photoURL || '',
              bio: ''
            };
            setUserProfile(basicProfile);
          }
        } catch (error) {
          console.error('❌ Header: Firestore 用戶資料獲取錯誤:', error);
          // 發生錯誤時使用基本資料
          setUserProfile({
            nickname: user.displayName || user.email?.split('@')[0] || '用戶',
            email: user.email,
            avatar: user.photoURL || '',
            bio: ''
          });
          console.error('獲取用戶資料失敗:', error);
          // 設置基本資料作為後備
          setUserProfile({
            nickname: user.displayName || user.email?.split('@')[0] || '用戶',
            email: user.email,
            avatar: user.photoURL || '',
            bio: ''
          });
        }
      } else {
        setUserProfile(null);
      }
    };

    // 只在用戶狀態穩定後才獲取資料
    if (!loading) {
      fetchUserProfile();
    }
  }, [user, loading, isRealUser]);

  // 點擊外部關閉下拉選單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
      setShowProfileMenu(false);
      setMobileMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('登出失敗:', error);
    }
  };

  const handleProfileUpdate = (updatedData) => {
    setUserProfile(prev => ({ ...prev, ...updatedData }));
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // 避免載入時的閃爍，只在真正需要時顯示載入狀態
  const shouldShowLoading = loading && !user;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
              <img 
                src="/Catcher/logo.png" 
                alt="Catcher" 
                className="h-15 w-auto mr-2"
                onError={(e) => {
                  e.target.src = "/Catcher/images/logo.png";
                  e.target.onerror = () => {
                    e.target.src = process.env.PUBLIC_URL + "/logo.png";
                  };
                }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 flex-1 justify-start ml-8">
            <Link to="/search" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              尋找創作者
            </Link>
            <Link to="/become-creator" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              成為創作者
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              關於我們
            </Link>
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {shouldShowLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
              </div>
            ) : isRealUser ? (
              <div className="relative" ref={dropdownRef}>
                <UserAvatar
                  user={user}
                  userProfile={userProfile}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                />
                
                {/* Desktop 下拉選單 */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                    <button
                      onClick={() => {
                        setShowProfileModal(true);
                        setShowProfileMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      編輯個人資料
                    </button>
                    <Link
                      to="/upload-service"
                      className="block px-4 py-2 text-sm text-primary-600 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      上架服務
                    </Link>
                    <Link
                      to="/chat"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      私訊聊天
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                    >
                      登出
                    </button>
                  </div>
                )}
              </div>
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

          {/* Mobile Menu Button & Auth */}
          <div className="flex items-center space-x-3 md:hidden">
            {shouldShowLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
            ) : isRealUser ? (
              <UserAvatar
                user={user}
                userProfile={userProfile}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-8 h-8"
              />
            ) : null}
            
            <MenuIcon 
              isOpen={mobileMenuOpen} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            />
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {/* Mobile Navigation Links */}
              <Link
                to="/search"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                尋找創作者
              </Link>
              
              <Link
                to="/become-creator"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                成為創作者
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                關於我們
              </Link>
              
              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                {isRealUser ? (
                  <>
                    <div className="px-3 py-2">
                      <div className="flex items-center space-x-3">
                        <UserAvatar
                          user={user}
                          userProfile={userProfile}
                          className="w-10 h-10"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowProfileModal(true);
                        closeMobileMenu();
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      編輯個人資料
                    </button>
                    <Link
                      to="/chat"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={closeMobileMenu}
                    >
                      私訊聊天
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      登出
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-base font-medium text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded-md transition-colors"
                      onClick={closeMobileMenu}
                    >
                      登入
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-2 text-base font-medium bg-primary-600 text-white hover:bg-primary-700 rounded-md transition-colors text-center"
                      onClick={closeMobileMenu}
                    >
                      免費註冊
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Profile Menu (for logged in users) */}
      {showProfileMenu && isRealUser && (
        <div className="md:hidden absolute top-20 right-4 w-64 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            <UserAvatar
              user={user}
              userProfile={userProfile}
              className="w-12 h-12"
            />
          </div>
          <button
            onClick={() => {
              setShowProfileModal(true);
              setShowProfileMenu(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            編輯個人資料
          </button>
          <Link
            to="/upload-service"
            className="block px-4 py-2 text-sm text-primary-600 hover:bg-gray-100 transition-colors"
            onClick={() => setShowProfileMenu(false)}
          >
            上架服務
          </Link>
          <Link
            to="/chat"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setShowProfileMenu(false)}
          >
            私訊聊天
          </Link>
          <hr className="my-1" />
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
          >
            登出
          </button>
        </div>
      )}

      {/* 個人資料編輯模態框 */}
      <ProfileEditModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={user}
        userProfile={userProfile}
        onProfileUpdate={handleProfileUpdate}
      />
    </header>
  );
};

export default Header;
