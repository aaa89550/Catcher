import { ref, set, get, push, remove, onValue, off } from 'firebase/database';
import { realtimeDb } from './config';

// 獲取所有服務
export const getAllServices = async () => {
  try {
    console.log('🔍 Realtime: 獲取所有服務');
    const servicesRef = ref(realtimeDb, 'services');
    const snapshot = await get(servicesRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      const servicesArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      
      // 只返回已發布的服務（包含未設置 published 狀態的舊服務）
      const publishedServices = servicesArray.filter(service => service.published !== false);
      console.log(`✅ Realtime: 找到 ${publishedServices.length} 個已發布服務`);
      return publishedServices;
    } else {
      console.log('📭 Realtime: 沒有找到服務數據');
      return [];
    }
  } catch (error) {
    console.error('❌ Realtime: 獲取所有服務失敗:', error);
    throw error;
  }
};

// 根據分類獲取服務
export const getServicesByCategory = async (category) => {
  try {
    console.log(`🔍 Realtime: 獲取分類服務 - ${category}`);
    
    // 如果是全部分類，返回所有服務
    if (category === '全部') {
      return await getAllServices();
    }
    
    const servicesRef = ref(realtimeDb, 'services');
    const snapshot = await get(servicesRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      const servicesArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      
      // 過濾出指定分類且已發布的服務
      const categoryServices = servicesArray.filter(service => 
        service.category === category && service.published !== false
      );
      
      console.log(`✅ Realtime: 找到 ${categoryServices.length} 個 ${category} 分類的服務`);
      return categoryServices;
    } else {
      console.log('📭 Realtime: 沒有找到服務數據');
      return [];
    }
  } catch (error) {
    console.error(`❌ Realtime: 獲取分類服務失敗 (${category}):`, error);
    throw error;
  }
};

// 獲取精選服務
export const getFeaturedServices = async () => {
  try {
    console.log('🔍 Realtime: 獲取精選服務');
    const servicesRef = ref(realtimeDb, 'services');
    const snapshot = await get(servicesRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      const servicesArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      
      // 過濾精選且已發布的服務，按評分排序
      const featuredServices = servicesArray
        .filter(service => service.featured && service.published !== false)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 6);
      
      console.log(`✅ Realtime: 找到 ${featuredServices.length} 個精選服務`);
      return featuredServices;
    } else {
      console.log('📭 Realtime: 沒有找到服務數據');
      return [];
    }
  } catch (error) {
    console.error('❌ Realtime: 獲取精選服務失敗:', error);
    throw error;
  }
};

// 實時監聽所有服務
export const subscribeToAllServices = (callback) => {
  console.log('🔄 Realtime: 開始監聽所有服務');
  const servicesRef = ref(realtimeDb, 'services');
  
  return onValue(servicesRef, (snapshot) => {
    try {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const servicesArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        
        const publishedServices = servicesArray.filter(service => service.published !== false);
        console.log(`🔄 Realtime: 監聽更新 - ${publishedServices.length} 個服務`);
        callback(publishedServices);
      } else {
        console.log('🔄 Realtime: 監聽更新 - 沒有服務數據');
        callback([]);
      }
    } catch (error) {
      console.error('❌ Realtime: 監聽服務失敗:', error);
      callback([]);
    }
  });
};

// 實時監聽分類服務
export const subscribeToServicesByCategory = (category, callback) => {
  console.log(`🔄 Realtime: 開始監聽分類服務 - ${category}`);
  
  if (!realtimeDb) {
    console.error('❌ Realtime: 數據庫未初始化');
    callback([]);
    return () => {}; // 返回空的清理函數
  }
  
  try {
    const servicesRef = ref(realtimeDb, 'services');
    
    return onValue(servicesRef, (snapshot) => {
      try {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (!data || typeof data !== 'object') {
            console.log('🔄 Realtime: 數據格式錯誤，返回空陣列');
            callback([]);
            return;
          }
          
          const servicesArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          
          let filteredServices;
          if (category === '全部') {
            filteredServices = servicesArray.filter(service => service.published !== false);
          } else {
            filteredServices = servicesArray.filter(service => 
              service.category === category && service.published !== false
            );
          }
          
          console.log(`🔄 Realtime: 分類監聽更新 - ${filteredServices.length} 個 ${category} 服務`);
          callback(filteredServices || []);
        } else {
          console.log('🔄 Realtime: 分類監聽更新 - 沒有服務數據');
          callback([]);
        }
      } catch (error) {
        console.error(`❌ Realtime: 監聽分類服務失敗 (${category}):`, error);
        callback([]);
      }
    }, (error) => {
      // Firebase onValue 的錯誤處理回調
      console.error(`❌ Realtime: 監聽器錯誤 (${category}):`, error);
      callback([]);
    });
  } catch (error) {
    console.error(`❌ Realtime: 建立監聽器失敗 (${category}):`, error);
    callback([]);
    return () => {}; // 返回空的清理函數
  }
};

// 獲取單個服務詳情
export const getServiceById = async (serviceId) => {
  try {
    console.log(`🔍 Realtime: 獲取服務詳情 - ${serviceId}`);
    const serviceRef = ref(realtimeDb, `services/${serviceId}`);
    const snapshot = await get(serviceRef);
    
    if (snapshot.exists()) {
      const service = {
        id: serviceId,
        ...snapshot.val()
      };
      console.log(`✅ Realtime: 獲取服務詳情成功 - ${service.title}`);
      return service;
    } else {
      console.log(`📭 Realtime: 服務不存在 - ${serviceId}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Realtime: 獲取服務詳情失敗 (${serviceId}):`, error);
    throw error;
  }
};
