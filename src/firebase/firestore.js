import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config'; // 重新啟用 Firestore

// ===== 服務相關 =====

// 獲取所有服務
export const getServices = async (filters = {}) => {
  try {
    let q = collection(db, 'services');
    
    // 應用篩選條件
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    
    if (filters.tags && filters.tags.length > 0) {
      q = query(q, where('tags', 'array-contains-any', filters.tags));
    }
    
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case 'low':
          q = query(q, where('price', '<', 10000));
          break;
        case 'mid':
          q = query(q, where('price', '>=', 10000), where('price', '<', 20000));
          break;
        case 'high':
          q = query(q, where('price', '>=', 20000));
          break;
        default:
          // 不添加價格篩選
          break;
      }
    }
    
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-low':
          q = query(q, orderBy('price', 'asc'));
          break;
        case 'price-high':
          q = query(q, orderBy('price', 'desc'));
          break;
        case 'rating':
          q = query(q, orderBy('rating', 'desc'));
          break;
        default:
          q = query(q, orderBy('createdAt', 'desc'));
      }
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('獲取服務失敗:', error);
    throw error;
  }
};

// 根據分類獲取服務（添加快取）
let categoryServicesCache = {};
let categoryCacheTimestamp = {};
const CATEGORY_CACHE_DURATION = 3 * 60 * 1000; // 3分鐘快取

export const getServicesByCategory = async (category) => {
  try {
    // 檢查快取是否有效
    const now = Date.now();
    if (categoryServicesCache[category] && 
        categoryCacheTimestamp[category] && 
        (now - categoryCacheTimestamp[category]) < CATEGORY_CACHE_DURATION) {
      return categoryServicesCache[category];
    }

    const q = query(
      collection(db, 'services'),
      where('category', '==', category),
      orderBy('rating', 'desc')
    );
    const snapshot = await getDocs(q);
    const services = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // 更新快取
    categoryServicesCache[category] = services;
    categoryCacheTimestamp[category] = now;

    return services;
  } catch (error) {
    console.error('獲取分類服務失敗:', error);
    throw error;
  }
};

// 獲取所有服務（不分類）- 添加快取
let allServicesCache = null;
let allServicesCacheTimestamp = null;
const ALL_SERVICES_CACHE_DURATION = 5 * 60 * 1000; // 5分鐘快取

export const getAllServices = async () => {
  try {
    // 檢查快取是否有效
    const now = Date.now();
    if (allServicesCache && 
        allServicesCacheTimestamp && 
        (now - allServicesCacheTimestamp) < ALL_SERVICES_CACHE_DURATION) {
      return allServicesCache;
    }

    const q = query(
      collection(db, 'services'),
      orderBy('rating', 'desc')
    );
    const snapshot = await getDocs(q);
    const services = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // 更新快取
    allServicesCache = services;
    allServicesCacheTimestamp = now;

    return services;
  } catch (error) {
    console.error('獲取所有服務失敗:', error);
    throw error;
  }
};

// 優化版：一次性獲取所有服務並計算分類數量
export const getCategoryCounts = async () => {
  try {
    const allServices = await getAllServices();
    const counts = {};
    
    allServices.forEach(service => {
      const category = service.category;
      counts[category] = (counts[category] || 0) + 1;
    });
    
    return counts;
  } catch (error) {
    console.error('獲取分類數量失敗:', error);
    throw error;
  }
};

// 獲取精選服務（添加快取）
let featuredServicesCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5分鐘快取

export const getFeaturedServices = async () => {
  try {
    // 檢查快取是否有效
    const now = Date.now();
    if (featuredServicesCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
      return featuredServicesCache;
    }

    const q = query(
      collection(db, 'services'),
      where('featured', '==', true),
      orderBy('rating', 'desc'),
      limit(6)
    );
    const snapshot = await getDocs(q);
    const services = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // 更新快取
    featuredServicesCache = services;
    cacheTimestamp = now;

    return services;
  } catch (error) {
    console.error('獲取精選服務失敗:', error);
    throw error;
  }
};

// 獲取單個服務詳情
export const getServiceById = async (serviceId) => {
  try {
    const docRef = doc(db, 'services', serviceId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('服務不存在');
    }
  } catch (error) {
    console.error('獲取服務詳情失敗:', error);
    throw error;
  }
};

// 創建新服務
export const createService = async (serviceData) => {
  try {
    const docRef = await addDoc(collection(db, 'services'), {
      ...serviceData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      rating: 0,
      reviewCount: 0,
      featured: false
    });
    return docRef.id;
  } catch (error) {
    console.error('創建服務失敗:', error);
    throw error;
  }
};

// 更新服務
export const updateService = async (serviceId, updates) => {
  try {
    const docRef = doc(db, 'services', serviceId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('更新服務失敗:', error);
    throw error;
  }
};

// ===== 創作者相關 =====

// 獲取所有創作者
export const getCreators = async (filters = {}) => {
  try {
    let q = collection(db, 'creators');
    
    if (filters.skills && filters.skills.length > 0) {
      q = query(q, where('skills', 'array-contains-any', filters.skills));
    }
    
    if (filters.location) {
      q = query(q, where('location', '==', filters.location));
    }
    
    if (filters.sortBy === 'rating') {
      q = query(q, orderBy('rating', 'desc'));
    } else {
      q = query(q, orderBy('createdAt', 'desc'));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('獲取創作者失敗:', error);
    throw error;
  }
};

// 獲取單個創作者資料
export const getCreatorById = async (creatorId) => {
  try {
    const docRef = doc(db, 'creators', creatorId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('創作者不存在');
    }
  } catch (error) {
    console.error('獲取創作者資料失敗:', error);
    throw error;
  }
};

// 創建創作者資料
export const createCreator = async (creatorData) => {
  try {
    const docRef = await addDoc(collection(db, 'creators'), {
      ...creatorData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      rating: 0,
      reviewCount: 0,
      completedProjects: 0
    });
    return docRef.id;
  } catch (error) {
    console.error('創建創作者資料失敗:', error);
    throw error;
  }
};

// 更新創作者資料
export const updateCreator = async (creatorId, updates) => {
  try {
    const docRef = doc(db, 'creators', creatorId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('更新創作者資料失敗:', error);
    throw error;
  }
};

// ===== 評論相關 =====

// 獲取服務評論
export const getServiceReviews = async (serviceId) => {
  try {
    const q = query(
      collection(db, 'reviews'),
      where('serviceId', '==', serviceId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('獲取評論失敗:', error);
    throw error;
  }
};

// 創建評論
export const createReview = async (reviewData) => {
  try {
    const docRef = await addDoc(collection(db, 'reviews'), {
      ...reviewData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('創建評論失敗:', error);
    throw error;
  }
};

// ===== 搜尋相關 =====

// 搜尋服務
export const searchServices = async (searchTerm, selectedTags = [], filters = {}) => {
  try {
    let q = collection(db, 'services');
    
    // 標籤篩選
    if (selectedTags.length > 0) {
      q = query(q, where('tags', 'array-contains-any', selectedTags));
    }
    
    // 價格篩選
    if (filters.priceRange && filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case 'low':
          q = query(q, where('price', '<', 10000));
          break;
        case 'mid':
          q = query(q, where('price', '>=', 10000), where('price', '<', 20000));
          break;
        case 'high':
          q = query(q, where('price', '>=', 20000));
          break;
        default:
          // 不添加價格篩選
          break;
      }
    }
    
    // 排序
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-low':
          q = query(q, orderBy('price', 'asc'));
          break;
        case 'price-high':
          q = query(q, orderBy('price', 'desc'));
          break;
        case 'rating':
          q = query(q, orderBy('rating', 'desc'));
          break;
        default:
          q = query(q, orderBy('createdAt', 'desc'));
      }
    }
    
    const snapshot = await getDocs(q);
    let results = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // 文字搜尋（前端過濾）
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(item =>
        item.title?.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term) ||
        item.creatorName?.toLowerCase().includes(term)
      );
    }
    
    return results;
  } catch (error) {
    console.error('搜尋服務失敗:', error);
    throw error;
  }
};

// ===== 服務分類相關 =====

// 獲取服務分類統計
export const getServiceCategories = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'services'));
    const categories = {};
    
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.category) {
        categories[data.category] = (categories[data.category] || 0) + 1;
      }
    });
    
    return categories;
  } catch (error) {
    console.error('獲取分類統計失敗:', error);
    throw error;
  }
};
