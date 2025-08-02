import { 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config.js'; // 重新啟用 Firestore 導入

// 初始化服務數據
export const initializeServices = async () => {
  const services = [
    {
      title: '專業網頁設計服務',
      description: '提供響應式網頁設計，包含 UI/UX 設計和前端開發。專業團隊為您打造現代化、用戶友好的網站。',
      category: '網頁設計',
      price: 25000,
      currency: 'TWD',
      creatorId: 'creator1',
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
      deliveryDays: 14,
      revisions: 3,
      status: 'active'
    },
    {
      title: '品牌Logo設計',
      description: '專業品牌識別設計，包含Logo、名片、企業形象設計。獨特創意，展現品牌價值。',
      category: '平面設計',
      price: 8000,
      currency: 'TWD',
      creatorId: 'creator2',
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
      deliveryDays: 7,
      revisions: 5,
      status: 'active'
    },
    {
      title: '社群媒體行銷',
      description: 'FB、IG、LINE 社群經營與廣告投放策略。提升品牌知名度，增加客戶轉換率。',
      category: '行銷企劃',
      price: 15000,
      currency: 'TWD',
      creatorId: 'creator3',
      creatorName: '行銷達人',
      creatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      tags: ['行銷', '社群', 'SEO'],
      images: [
        'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop'
      ],
      rating: 4.7,
      reviewCount: 18,
      featured: true,
      deliveryDays: 21,
      revisions: 2,
      status: 'active'
    },
    {
      title: '產品攝影服務',
      description: '商品攝影、形象照、活動紀錄專業服務。高品質攝影，展現產品最佳面貌。',
      category: '攝影服務',
      price: 12000,
      currency: 'TWD',
      creatorId: 'creator4',
      creatorName: '攝影工作室',
      creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      tags: ['攝影', '品牌'],
      images: [
        'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1542038784456-1ea8e732a8c5?w=800&h=600&fit=crop'
      ],
      rating: 4.6,
      reviewCount: 15,
      featured: false,
      deliveryDays: 10,
      revisions: 2,
      status: 'active'
    },
    {
      title: '手機APP開發',
      description: 'iOS/Android 原生APP開發，提供完整的移動應用解決方案。',
      category: '程式開發',
      price: 80000,
      currency: 'TWD',
      creatorId: 'creator5',
      creatorName: '開發團隊',
      creatorAvatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
      tags: ['開發', 'APP'],
      images: [
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop'
      ],
      rating: 4.5,
      reviewCount: 8,
      featured: true,
      deliveryDays: 60,
      revisions: 3,
      status: 'active'
    },
    {
      title: '文案撰寫服務',
      description: '廣告文案、內容創作、SEO文章撰寫。專業文案師為您創造有說服力的文字內容。',
      category: '文案撰寫',
      price: 3500,
      currency: 'TWD',
      creatorId: 'creator6',
      creatorName: '文案創作者',
      creatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      tags: ['文案', '行銷'],
      images: [
        'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop'
      ],
      rating: 4.4,
      reviewCount: 28,
      featured: false,
      deliveryDays: 5,
      revisions: 3,
      status: 'active'
    }
  ];

  try {
    const promises = services.map(service => 
      addDoc(collection(db, 'services'), {
        ...service,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
    );
    
    await Promise.all(promises);
    console.log('服務數據初始化完成');
  } catch (error) {
    console.error('服務數據初始化失敗:', error);
  }
};

// 初始化創作者數據
export const initializeCreators = async () => {
  const creators = [
    {
      id: 'creator1',
      name: '設計師小王',
      email: 'wang@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: '專業網頁設計師，擁有5年以上設計經驗，專精於 UI/UX 設計和前端開發。',
      skills: ['網頁設計', 'UI/UX', '前端開發', 'Figma', 'React'],
      location: '台北市',
      rating: 4.8,
      reviewCount: 45,
      completedProjects: 128,
      responseTime: '2小時內',
      languages: ['繁體中文', '英文'],
      portfolio: [
        {
          title: '電商網站設計',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
          url: '#'
        },
        {
          title: '企業官網重設計',
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
          url: '#'
        }
      ],
      verified: true,
      joinDate: new Date('2022-01-15'),
      status: 'active'
    },
    {
      id: 'creator2',
      name: '創意工作室',
      email: 'creative@example.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b632?w=150&h=150&fit=crop&crop=face',
      bio: '創意設計工作室，專注於品牌識別設計、Logo設計和視覺設計。',
      skills: ['品牌設計', 'Logo設計', '插畫', 'Adobe Creative Suite'],
      location: '台中市',
      rating: 4.9,
      reviewCount: 67,
      completedProjects: 89,
      responseTime: '1小時內',
      languages: ['繁體中文'],
      portfolio: [
        {
          title: 'Logo設計作品集',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
          url: '#'
        }
      ],
      verified: true,
      joinDate: new Date('2021-08-20'),
      status: 'active'
    },
    {
      id: 'creator3',
      name: '行銷達人',
      email: 'marketing@example.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: '數位行銷專家，專精於社群媒體行銷、SEO優化和內容行銷策略。',
      skills: ['社群行銷', 'SEO', '廣告投放', 'Google Analytics', 'Facebook Ads'],
      location: '高雄市',
      rating: 4.7,
      reviewCount: 34,
      completedProjects: 76,
      responseTime: '3小時內',
      languages: ['繁體中文', '英文'],
      portfolio: [
        {
          title: '社群媒體成功案例',
          image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
          url: '#'
        }
      ],
      verified: true,
      joinDate: new Date('2022-03-10'),
      status: 'active'
    }
  ];

  try {
    const promises = creators.map(creator => 
      addDoc(collection(db, 'creators'), {
        ...creator,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
    );
    
    await Promise.all(promises);
    console.log('創作者數據初始化完成');
  } catch (error) {
    console.error('創作者數據初始化失敗:', error);
  }
};

// 初始化評論數據
export const initializeReviews = async () => {
  const reviews = [
    {
      serviceId: 'service1', // 需要替換為實際的服務ID
      userId: 'user1',
      userName: '張小明',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment: '非常專業的設計師，網站設計超出預期，溝通順暢，準時交付。強烈推薦！',
      createdAt: serverTimestamp()
    },
    {
      serviceId: 'service2',
      userId: 'user2',
      userName: '李美華',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b632?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment: 'Logo設計很有創意，完全符合我們公司的形象。設計師很有耐心，修改了好幾次都很配合。',
      createdAt: serverTimestamp()
    }
  ];

  try {
    const promises = reviews.map(review => 
      addDoc(collection(db, 'reviews'), review)
    );
    
    await Promise.all(promises);
    console.log('評論數據初始化完成');
  } catch (error) {
    console.error('評論數據初始化失敗:', error);
  }
};

// 執行所有初始化
export const initializeAllData = async () => {
  try {
    await initializeServices();
    await initializeCreators();
    await initializeReviews();
    console.log('所有數據初始化完成');
  } catch (error) {
    console.error('數據初始化失敗:', error);
  }
};
