import { ref, set } from 'firebase/database';
import { realtimeDb } from './config.js';

// 初始化 3 個服務數據到 Realtime Database
export const initializeRealtimeServices = async () => {
  const services = {
    'service-1': {
      title: '專業網頁設計服務',
      description: '提供響應式網頁設計，包含 UI/UX 設計和前端開發。專業團隊為您打造現代化、用戶友好的網站。',
      category: '網頁設計',
      price: 25000,
      currency: 'TWD',
      creatorId: 'creator-1',
      creatorName: '設計師小王',
      creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      tags: ['設計', 'UI/UX', '開發'],
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop'
      ],
      rating: 4.8,
      reviewCount: 24,
      featured: true,
      published: true,
      deliveryDays: 14,
      revisions: 3,
      status: 'active',
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    'service-2': {
      title: '品牌Logo設計',
      description: '專業品牌識別設計，包含Logo、名片、企業形象設計。獨特創意，展現品牌價值。',
      category: '平面設計',
      price: 8000,
      currency: 'TWD',
      creatorId: 'creator-2',
      creatorName: '創意工作室',
      creatorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b632?w=150&h=150&fit=crop&crop=face',
      tags: ['設計', '品牌', '插畫'],
      images: [
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=600&fit=crop'
      ],
      rating: 4.9,
      reviewCount: 32,
      featured: true,
      published: true,
      deliveryDays: 7,
      revisions: 5,
      status: 'active',
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    'service-3': {
      title: '影片剪輯製作',
      description: '專業影片剪輯服務，包含特效製作、調色、配音等。讓您的創意變成精彩影片。',
      category: '影音剪輯',
      price: 15000,
      currency: 'TWD',
      creatorId: 'creator-3',
      creatorName: '影像工作者',
      creatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      tags: ['影片', '剪輯', '特效'],
      images: [
        'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop'
      ],
      rating: 4.7,
      reviewCount: 18,
      featured: true,
      published: true,
      deliveryDays: 10,
      revisions: 2,
      status: 'active',
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
  };

  try {
    const servicesRef = ref(realtimeDb, 'services');
    await set(servicesRef, services);
    console.log('服務數據初始化成功');
    return true;
  } catch (error) {
    console.error('服務數據初始化失敗:', error);
    return false;
  }
};

// 初始化 3 個創作者數據到 Realtime Database
export const initializeRealtimeCreators = async () => {
  const creators = {
    'creator-1': {
      name: '設計師小王',
      email: 'wang@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: '資深網頁設計師，擁有5年以上設計經驗，專精於 UI/UX 設計和前端開發。',
      skills: ['網頁設計', 'UI/UX', '前端開發', 'React', 'Vue'],
      location: '台北市',
      languages: ['中文', '英文'],
      joinDate: Date.now() - 365 * 24 * 60 * 60 * 1000, // 1年前
      rating: 4.8,
      reviewCount: 45,
      completedProjects: 67,
      responseTime: '2小時內',
      portfolio: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop'
      ],
      verified: true,
      status: 'active'
    },
    'creator-2': {
      name: '創意工作室',
      email: 'studio@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b632?w=150&h=150&fit=crop&crop=face',
      bio: '專業設計團隊，提供品牌識別、平面設計等服務，致力於為客戶打造獨特的視覺形象。',
      skills: ['平面設計', '品牌設計', 'Logo設計', 'Adobe套件', '插畫'],
      location: '新北市',
      languages: ['中文', '英文', '日文'],
      joinDate: Date.now() - 2 * 365 * 24 * 60 * 60 * 1000, // 2年前
      rating: 4.9,
      reviewCount: 78,
      completedProjects: 124,
      responseTime: '1小時內',
      portfolio: [
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=400&h=300&fit=crop'
      ],
      verified: true,
      status: 'active'
    },
    'creator-3': {
      name: '影像工作者',
      email: 'video@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: '專業影像製作人，專精於影片剪輯、特效製作、動畫設計。讓每個故事都精彩呈現。',
      skills: ['影片剪輯', '特效製作', '動畫設計', 'After Effects', 'Premiere Pro'],
      location: '台中市',
      languages: ['中文', '英文'],
      joinDate: Date.now() - 1.5 * 365 * 24 * 60 * 60 * 1000, // 1.5年前
      rating: 4.7,
      reviewCount: 34,
      completedProjects: 52,
      responseTime: '4小時內',
      portfolio: [
        'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop'
      ],
      verified: true,
      status: 'active'
    }
  };

  try {
    const creatorsRef = ref(realtimeDb, 'creators');
    await set(creatorsRef, creators);
    console.log('創作者數據初始化成功');
    return true;
  } catch (error) {
    console.error('創作者數據初始化失敗:', error);
    return false;
  }
};

// 初始化所有數據
export const initializeAllRealtimeData = async () => {
  try {
    console.log('開始初始化所有 Realtime Database 數據...');
    
    console.log('步驟 1: 初始化服務數據...');
    const servicesResult = await initializeRealtimeServices();
    console.log('服務數據初始化結果:', servicesResult);
    
    if (!servicesResult) {
      console.error('服務數據初始化失敗，停止初始化');
      return false;
    }
    
    console.log('步驟 2: 初始化創作者數據...');
    const creatorsResult = await initializeRealtimeCreators();
    console.log('創作者數據初始化結果:', creatorsResult);
    
    if (!creatorsResult) {
      console.error('創作者數據初始化失敗');
      return false;
    }
    
    console.log('✅ 所有 Realtime Database 數據初始化成功');
    return true;
  } catch (error) {
    console.error('❌ 初始化數據時發生錯誤:', error);
    console.error('錯誤詳情:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    return false;
  }
};

// 簡化版初始化函數 - 只初始化一個服務進行測試
export const initializeSimpleData = async () => {
  console.log('🚀 開始簡化數據初始化...');
  
  try {
    // 檢查 realtimeDb 是否正確導入
    console.log('📊 檢查 realtimeDb:', realtimeDb);
    if (!realtimeDb) {
      throw new Error('realtimeDb 未正確初始化');
    }

    console.log('📝 準備測試數據...');
    const simpleService = {
      'test-service-1': {
        title: '測試服務',
        description: '這是一個測試服務',
        category: '平面設計',
        price: 1000,
        currency: 'TWD',
        creatorId: 'test-creator',
        creatorName: '測試創作者',
        creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        tags: ['測試'],
        images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'],
        rating: 4.5,
        reviewCount: 10,
        featured: true,
        published: true,
        deliveryDays: 7,
        revisions: 3,
        status: 'active',
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
    };

    console.log('📋 測試數據內容:', simpleService);

    console.log('🔗 創建 Firebase 引用...');
    const servicesRef = ref(realtimeDb, 'services');
    console.log('📍 Firebase 引用:', servicesRef);

    console.log('💾 開始寫入數據到 Firebase...');
    const result = await set(servicesRef, simpleService);
    console.log('💾 寫入結果:', result);

    console.log('✅ 簡化數據初始化成功');
    return true;
  } catch (error) {
    console.log('❌ 簡化數據初始化失敗');
    console.error('錯誤對象:', error);
    console.error('錯誤類型:', typeof error);
    console.error('錯誤名稱:', error?.name);
    console.error('錯誤信息:', error?.message);
    console.error('錯誤代碼:', error?.code);
    console.error('錯誤堆疊:', error?.stack);
    console.error('完整錯誤:', JSON.stringify(error, null, 2));
    
    // 重新拋出錯誤以便上層捕獲
    throw error;
  }
};
