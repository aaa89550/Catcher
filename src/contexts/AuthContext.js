import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider: 初始化 Firebase 認證監聽器');
    let isComponentMounted = true;
    
    // 設置一個較短的超時，確保不會無限載入
    const loadingTimeout = setTimeout(() => {
      console.warn('AuthProvider: 認證載入超時，設置預設用戶');
      if (isComponentMounted) {
        setUser({
          uid: 'temp_user_' + Date.now(),
          displayName: '臨時用戶',
          email: null,
          isAnonymous: true,
          isTemporary: true
        });
        setLoading(false);
      }
    }, 5000); // 5秒超時，比之前更短
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('AuthProvider: 認證狀態變更:', user);
      if (!isComponentMounted) return;
      
      clearTimeout(loadingTimeout); // 清除超時計時器
      
      if (user) {
        console.log('AuthProvider: 用戶已登入:', user.uid);
        setUser({
          uid: user.uid,
          displayName: user.displayName || `用戶 ${user.uid.slice(0, 6)}`,
          email: user.email,
          isAnonymous: user.isAnonymous,
          isTemporary: false
        });
        setLoading(false);
      } else {
        console.log('AuthProvider: 沒有用戶，嘗試匿名登入...');
        // 如果沒有用戶，自動匿名登入
        signInAnonymously(auth)
          .then((result) => {
            console.log('AuthProvider: 匿名登入成功:', result.user.uid);
            // 認證狀態變更事件會自動處理用戶設置
          })
          .catch((error) => {
            console.error('AuthProvider: 匿名登入失敗:', error);
            if (isComponentMounted) {
              // 設置臨時用戶以便應用程式能夠繼續運行
              setUser({
                uid: 'fallback_user_' + Date.now(),
                displayName: '訪客用戶',
                email: null,
                isAnonymous: true,
                isTemporary: true
              });
              setLoading(false);
            }
          });
      }
    });

    return () => {
      isComponentMounted = false;
      clearTimeout(loadingTimeout);
      unsubscribe();
    };
  }, []);

  const updateUser = async (firebaseUser, additionalData = {}) => {
    try {
      console.log('AuthProvider: 更新用戶資料', firebaseUser, additionalData);
      setUser({
        uid: firebaseUser.uid,
        displayName: additionalData.nickname || firebaseUser.displayName || `用戶 ${firebaseUser.uid.slice(0, 6)}`,
        email: firebaseUser.email,
        isAnonymous: firebaseUser.isAnonymous,
        isTemporary: false,
        ...additionalData
      });
    } catch (error) {
      console.error('AuthProvider: 更新用戶資料失敗:', error);
      // 即使更新失敗，也要設置基本的用戶資料
      setUser({
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName || `用戶 ${firebaseUser.uid.slice(0, 6)}`,
        email: firebaseUser.email,
        isAnonymous: firebaseUser.isAnonymous,
        isTemporary: false
      });
    }
  };

  const value = {
    user,
    loading,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
