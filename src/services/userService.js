import { collection, addDoc, doc, getDoc, setDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

// 創建用戶檔案
export const createUserProfile = async (userData) => {
  try {
    console.log('createUserProfile 被調用，資料:', userData);
    
    // 如果有提供 uid，使用 setDoc 來指定文檔 ID
    if (userData.uid) {
      const docRef = doc(db, 'users', userData.uid);
      const dataToWrite = {
        ...userData,
        status: 'active',
        emailVerified: false,
        profileComplete: true
      };
      
      console.log('準備寫入 Firestore 的資料:', dataToWrite);
      
      await setDoc(docRef, dataToWrite);
      
      console.log('用戶檔案創建成功，ID:', userData.uid);
      
      // 驗證寫入是否成功
      const verification = await getDoc(docRef);
      if (verification.exists()) {
        console.log('驗證成功，寫入的資料:', verification.data());
      } else {
        console.error('驗證失敗，文檔不存在');
      }
      
      return userData.uid;
    } else {
      // 沒有 uid 的話，檢查 email 和暱稱是否已存在
      const emailQuery = query(
        collection(db, 'users'),
        where('email', '==', userData.email)
      );
      const emailSnapshot = await getDocs(emailQuery);
      
      if (!emailSnapshot.empty) {
        throw new Error('此 Email 已被註冊');
      }

      // 檢查暱稱是否已存在
      const nicknameQuery = query(
        collection(db, 'users'),
        where('nickname', '==', userData.nickname)
      );
      const nicknameSnapshot = await getDocs(nicknameQuery);
      
      if (!nicknameSnapshot.empty) {
        throw new Error('此暱稱已被使用');
      }

      // 創建新用戶檔案（自動生成 ID）
      const docRef = await addDoc(collection(db, 'users'), {
        ...userData,
        status: 'active',
        emailVerified: false,
        profileComplete: true
      });

      console.log('用戶檔案創建成功，ID:', docRef.id);
      return docRef.id;
    }
    
  } catch (error) {
    console.error('創建用戶檔案失敗:', error);
    throw error;
  }
};

// 根據 ID 獲取用戶檔案
export const getUserProfile = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('用戶不存在');
    }
  } catch (error) {
    console.error('獲取用戶檔案失敗:', error);
    throw error;
  }
};

// 根據 Email 獲取用戶檔案
export const getUserByEmail = async (email) => {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('根據 Email 獲取用戶失敗:', error);
    throw error;
  }
};

// 更新用戶檔案
export const updateUserProfile = async (userId, updateData) => {
  try {
    const docRef = doc(db, 'users', userId);
    
    // 如果更新暱稱，需要檢查是否重複
    if (updateData.nickname) {
      const nicknameQuery = query(
        collection(db, 'users'),
        where('nickname', '==', updateData.nickname)
      );
      const nicknameSnapshot = await getDocs(nicknameQuery);
      
      // 確保不是自己的暱稱
      const existingUser = nicknameSnapshot.docs.find(doc => doc.id !== userId);
      if (existingUser) {
        throw new Error('此暱稱已被使用');
      }
    }

    await setDoc(docRef, {
      ...updateData,
      updatedAt: new Date()
    }, { merge: true });

    console.log('用戶檔案更新成功');
    return true;
    
  } catch (error) {
    console.error('更新用戶檔案失敗:', error);
    throw error;
  }
};

// 檢查暱稱是否可用
export const checkNicknameAvailability = async (nickname, excludeUserId = null) => {
  try {
    const q = query(collection(db, 'users'), where('nickname', '==', nickname));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return true; // 暱稱可用
    }
    
    // 如果有排除的用戶 ID（編輯時使用）
    if (excludeUserId) {
      const existingUser = querySnapshot.docs.find(doc => doc.id !== excludeUserId);
      return !existingUser; // 如果找不到其他用戶使用此暱稱，則可用
    }
    
    return false; // 暱稱已被使用
  } catch (error) {
    console.error('檢查暱稱可用性失敗:', error);
    throw error;
  }
};

// 檢查 Email 是否可用
export const checkEmailAvailability = async (email, excludeUserId = null) => {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return true; // Email 可用
    }
    
    // 如果有排除的用戶 ID（編輯時使用）
    if (excludeUserId) {
      const existingUser = querySnapshot.docs.find(doc => doc.id !== excludeUserId);
      return !existingUser; // 如果找不到其他用戶使用此 Email，則可用
    }
    
    return false; // Email 已被使用
  } catch (error) {
    console.error('檢查 Email 可用性失敗:', error);
    throw error;
  }
};
