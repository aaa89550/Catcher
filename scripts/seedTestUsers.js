import { realtimeDb } from '../src/firebase/config.js';
import { ref, set, push } from 'firebase/database';

// 假的創作者/會員數據
const testUsers = [
  {
    uid: 'test_creator_001',
    displayName: '小明創作者',
    email: 'xiaoming@example.com',
    bio: '專業攝影師，擅長風景攝影和人像攝影。',
    avatar: 'https://picsum.photos/200?random=1',
    userType: 'creator',
    skills: ['攝影', '後製', '平面設計'],
    location: '台北市',
    rating: 4.8,
    projectsCompleted: 25,
    joinDate: '2024-01-15'
  },
  {
    uid: 'test_creator_002', 
    displayName: '小華設計師',
    email: 'xiaohua@example.com',
    bio: '資深UI/UX設計師，有5年設計經驗。',
    avatar: 'https://picsum.photos/200?random=2',
    userType: 'creator',
    skills: ['UI設計', 'UX設計', 'Figma', 'Adobe Creative Suite'],
    location: '新北市',
    rating: 4.9,
    projectsCompleted: 42,
    joinDate: '2023-08-20'
  },
  {
    uid: 'test_creator_003',
    displayName: '美美插畫家',
    email: 'meimei@example.com', 
    bio: '自由插畫家，專精於數位插畫和角色設計。',
    avatar: 'https://picsum.photos/200?random=3',
    userType: 'creator',
    skills: ['插畫', '角色設計', 'Procreate', 'Photoshop'],
    location: '台中市',
    rating: 4.7,
    projectsCompleted: 18,
    joinDate: '2024-03-10'
  },
  {
    uid: 'test_creator_004',
    displayName: '阿傑影片剪輯',
    email: 'ajie@example.com',
    bio: '影片剪輯專家，擅長各種風格的影片製作。',
    avatar: 'https://picsum.photos/200?random=4', 
    userType: 'creator',
    skills: ['影片剪輯', 'After Effects', 'Premiere Pro', '動畫製作'],
    location: '高雄市',
    rating: 4.6,
    projectsCompleted: 33,
    joinDate: '2023-11-05'
  },
  {
    uid: 'test_creator_005',
    displayName: '文文文案師',
    email: 'wenwen@example.com',
    bio: '專業文案創作者，擅長行銷文案和品牌故事。',
    avatar: 'https://picsum.photos/200?random=5',
    userType: 'creator', 
    skills: ['文案撰寫', '行銷企劃', '品牌策略', 'SEO'],
    location: '台南市',
    rating: 4.9,
    projectsCompleted: 29,
    joinDate: '2024-02-01'
  },
  {
    uid: 'test_member_001',
    displayName: '客戶小王',
    email: 'xiaowang@example.com',
    bio: '小型企業老闆，經常需要設計和行銷服務。',
    avatar: 'https://picsum.photos/200?random=6',
    userType: 'member',
    company: '小王咖啡店',
    location: '桃園市',
    joinDate: '2024-04-12'
  },
  {
    uid: 'test_member_002', 
    displayName: '李小姐',
    email: 'lixiaojie@example.com',
    bio: '新創公司創辦人，需要各種創意服務支援。',
    avatar: 'https://picsum.photos/200?random=7',
    userType: 'member',
    company: '創新科技有限公司',
    location: '新竹市',
    joinDate: '2024-01-30'
  }
];

// 創建一些假的作品/專案數據
const testProjects = [
  {
    creatorId: 'test_creator_001',
    title: '婚禮攝影作品集',
    description: '浪漫唯美的婚禮攝影作品，捕捉每一個美好瞬間。',
    category: '攝影',
    images: [
      'https://picsum.photos/400/300?random=10',
      'https://picsum.photos/400/300?random=11',
      'https://picsum.photos/400/300?random=12'
    ],
    tags: ['婚禮攝影', '人像攝影', '戶外攝影'],
    price: 15000,
    duration: '1天',
    likes: 45,
    views: 230,
    createdAt: '2024-06-15'
  },
  {
    creatorId: 'test_creator_002',
    title: '電商網站UI設計',
    description: '現代化的電商網站介面設計，提升用戶體驗。',
    category: '設計',
    images: [
      'https://picsum.photos/400/300?random=13',
      'https://picsum.photos/400/300?random=14'
    ],
    tags: ['UI設計', '電商設計', '響應式設計'],
    price: 25000,
    duration: '2週',
    likes: 62,
    views: 180,
    createdAt: '2024-07-02'
  },
  {
    creatorId: 'test_creator_003',
    title: '角色插畫設計',
    description: '可愛風格的角色插畫，適用於各種媒體。',
    category: '插畫',
    images: [
      'https://picsum.photos/400/300?random=15',
      'https://picsum.photos/400/300?random=16'
    ],
    tags: ['角色設計', '插畫', '數位繪圖'],
    price: 8000,
    duration: '1週',
    likes: 38,
    views: 150,
    createdAt: '2024-07-10'
  }
];

// 執行數據導入
const seedDatabase = async () => {
  try {
    console.log('開始導入測試用戶數據...');
    
    // 導入用戶數據
    for (const user of testUsers) {
      const userRef = ref(realtimeDb, `users/${user.uid}`);
      await set(userRef, user);
      console.log(`✅ 導入用戶: ${user.displayName}`);
    }
    
    console.log('開始導入測試專案數據...');
    
    // 導入專案數據
    for (const project of testProjects) {
      const projectsRef = ref(realtimeDb, 'projects');
      await push(projectsRef, project);
      console.log(`✅ 導入專案: ${project.title}`);
    }
    
    console.log('🎉 所有測試數據導入完成！');
    console.log('\n可以私訊的創作者：');
    testUsers.filter(user => user.userType === 'creator').forEach(creator => {
      console.log(`- ${creator.displayName} (${creator.skills.join(', ')})`);
    });
    
  } catch (error) {
    console.error('❌ 導入數據時發生錯誤:', error);
  }
};

// 如果直接執行此文件，則運行導入函數
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export { seedDatabase, testUsers, testProjects };
