import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// 用戶頭像組件
const UserAvatar = ({ user, userProfile, onClick }) => {
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
      <div className="w-8 h-8 rounded-full overflow-hidden mr-2 border-2 border-gray-200">
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
      <span className="text-gray-700 font-medium max-w-24 truncate">{displayName}</span>
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
  const dropdownRef = useRef(null);

  // 檢查用戶是否為真實登入用戶
  const isRealUser = user && !user.isAnonymous && !user.isTemporary && user.email;

  // 獲取用戶資料
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isRealUser && user.uid) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          } else {
            // 如果沒有用戶資料，創建基本資料
            setUserProfile({
              nickname: user.displayName || user.email?.split('@')[0] || '用戶',
              email: user.email,
              avatar: user.photoURL || '',
              bio: ''
            });
          }
        } catch (error) {
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
      navigate('/');
    } catch (error) {
      console.error('登出失敗:', error);
    }
  };

  const handleProfileUpdate = (updatedData) => {
    setUserProfile(prev => ({ ...prev, ...updatedData }));
  };

  // 避免載入時的閃爍，只在真正需要時顯示載入狀態
  const shouldShowLoading = loading && !user;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center mr-8">
            <img src="/images/logo.png" alt="Catcher" className="h-12 w-auto" />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 flex-1">
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

          {/* Auth Section */}
          <div className="flex items-center space-x-4 ml-auto">
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
                
                {/* 下拉選單 */}
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
        </div>
      </div>

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
