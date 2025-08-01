import { ref, set, get, update, onDisconnect, serverTimestamp } from 'firebase/database';
import { realtimeDb } from '../firebase/config';

// 創建或更新用戶資料（使用 Realtime Database）
export const createRealtimeUserProfile = async (userData) => {
  try {
    console.log('createRealtimeUserProfile 被調用，資料:', userData);
    
    const userRef = ref(realtimeDb, `users/${userData.uid}`);
    const dataToWrite = {
      uid: userData.uid,
      nickname: userData.nickname || '新用戶',
      avatar: userData.avatar || 'default-avatar.png',
      email: userData.email,
      fullName: userData.fullName,
      phone: userData.phone || null,
      friends: {},
      online: true,
      lastActive: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    console.log('準備寫入 Realtime Database 的資料:', dataToWrite);
    
    await set(userRef, dataToWrite);
    
    // 設置離線狀態管理
    await onDisconnect(ref(realtimeDb, `users/${userData.uid}/online`)).set(false);
    
    console.log('Realtime Database 用戶檔案創建成功，ID:', userData.uid);
    
    return userData.uid;
    
  } catch (error) {
    console.error('創建 Realtime Database 用戶檔案失敗:', error);
    throw error;
  }
};

// 根據 ID 獲取用戶檔案（使用 Realtime Database）
export const getRealtimeUserProfile = async (userId) => {
  try {
    const userRef = ref(realtimeDb, `users/${userId}`);
    const snapshot = await get(userRef);
    
    if (snapshot.exists()) {
      return {
        id: userId,
        ...snapshot.val()
      };
    } else {
      throw new Error('用戶不存在');
    }
  } catch (error) {
    console.error('獲取 Realtime Database 用戶檔案失敗:', error);
    throw error;
  }
};

// 根據 Email 獲取用戶檔案（使用 Realtime Database）
export const getRealtimeUserByEmail = async (email) => {
  try {
    const usersRef = ref(realtimeDb, 'users');
    const snapshot = await get(usersRef);
    
    if (snapshot.exists()) {
      const users = snapshot.val();
      const userEntry = Object.entries(users).find(([_, userData]) => userData.email === email);
      
      if (userEntry) {
        const [userId, userData] = userEntry;
        return {
          id: userId,
          ...userData
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error('根據 Email 獲取 Realtime Database 用戶失敗:', error);
    throw error;
  }
};

// 更新用戶在線狀態
export const updateUserOnlineStatus = async (userId, isOnline) => {
  try {
    const userRef = ref(realtimeDb, `users/${userId}`);
    await update(userRef, {
      online: isOnline,
      lastActive: serverTimestamp()
    });
    
    if (isOnline) {
      // 如果上線，設置離線監聽
      await onDisconnect(ref(realtimeDb, `users/${userId}/online`)).set(false);
    }
    
    console.log(`用戶 ${userId} 在線狀態更新為:`, isOnline);
  } catch (error) {
    console.error('更新用戶在線狀態失敗:', error);
    throw error;
  }
};

// 更新用戶檔案
export const updateRealtimeUserProfile = async (userId, updateData) => {
  try {
    const userRef = ref(realtimeDb, `users/${userId}`);
    
    const dataToUpdate = {
      ...updateData,
      updatedAt: serverTimestamp()
    };
    
    await update(userRef, dataToUpdate);
    
    console.log('Realtime Database 用戶檔案更新成功');
    return true;
    
  } catch (error) {
    console.error('更新 Realtime Database 用戶檔案失敗:', error);
    throw error;
  }
};
