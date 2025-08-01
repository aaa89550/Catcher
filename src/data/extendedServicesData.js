// 程式開發分類的詳細數據
export const programmingServices = [
  {
    id: 11,
    title: 'React 前端開發',
    description: '使用React框架開發現代化的前端應用程式',
    price: 35000,
    rating: 4.9,
    reviews: 67,
    seller: '前端工程師Alex',
    deliveryTime: '21天',
    tags: ['React', '前端開發', '包含原始檔'],
    image: null,
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&h=100&fit=crop',
        alt: 'React開發環境',
        link: 'https://github.com/facebook/react'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=400&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=150&h=100&fit=crop',
        alt: '程式碼編寫',
        link: 'https://reactjs.org'
      },
      {
        type: 'video',
        url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=150&h=100&fit=crop',
        alt: 'React教學影片',
        link: 'https://youtube.com/watch?v=react-tutorial'
      }
    ],
    detailedDescription: `
      <h3>React開發服務：</h3>
      <ul>
        <li>單頁應用程式 (SPA) 開發</li>
        <li>組件化架構設計</li>
        <li>狀態管理 (Redux/Context)</li>
        <li>API整合與數據處理</li>
        <li>響應式介面開發</li>
        <li>效能優化與測試</li>
      </ul>
      
      <h3>技術棧：</h3>
      <ul>
        <li>React 18+ / Next.js</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>
        <li>React Router</li>
        <li>Axios / Fetch API</li>
        <li>Jest / React Testing Library</li>
      </ul>
      
      <h3>交付內容：</h3>
      <ul>
        <li>完整原始碼</li>
        <li>技術文件</li>
        <li>部署指南</li>
        <li>測試報告</li>
        <li>維護建議</li>
      </ul>
    `,
    seller: {
      name: '前端工程師Alex',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      rating: 4.9,
      reviews: 67,
      responseTime: '2小時內',
      completedProjects: 89,
      memberSince: '2020年8月',
      skills: ['React', 'TypeScript', 'Next.js', 'Node.js'],
      bio: '資深前端工程師，專精於React生態系統開發。擁有豐富的大型專案經驗，注重程式碼品質與使用者體驗。'
    }
  },
  {
    id: 12,
    title: 'Node.js 後端API開發',
    description: '建立穩定高效的後端API服務，支援RESTful架構',
    price: 28000,
    rating: 4.8,
    reviews: 45,
    seller: '後端專家John',
    deliveryTime: '18天',
    tags: ['Node.js', 'API開發', '資料庫設計'],
    image: null,
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=150&h=100&fit=crop',
        alt: '後端開發環境',
        link: 'https://nodejs.org'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=600&h=400&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=150&h=100&fit=crop',
        alt: 'API文件',
        link: 'https://swagger.io'
      }
    ],
    detailedDescription: `
      <h3>後端開發服務：</h3>
      <ul>
        <li>RESTful API設計與開發</li>
        <li>資料庫設計與優化</li>
        <li>身份驗證與授權</li>
        <li>第三方API整合</li>
        <li>伺服器部署與維護</li>
        <li>API文件撰寫</li>
      </ul>
      
      <h3>技術架構：</h3>
      <ul>
        <li>Node.js / Express.js</li>
        <li>MongoDB / PostgreSQL</li>
        <li>JWT認證</li>
        <li>Docker容器化</li>
        <li>AWS / Google Cloud</li>
        <li>Swagger API文件</li>
      </ul>
    `,
    seller: {
      name: '後端專家John',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      rating: 4.8,
      reviews: 45,
      responseTime: '3小時內',
      completedProjects: 123,
      memberSince: '2019年11月',
      skills: ['Node.js', 'MongoDB', 'AWS', 'Docker'],
      bio: '資深後端工程師，專精於高併發API開發與雲端架構設計。擁有豐富的企業級系統開發經驗。'
    }
  }
];

// 行銷企劃分類的詳細數據
export const marketingServices = [
  {
    id: 15,
    title: '數位行銷策略規劃',
    description: '完整的數位行銷策略制定，包含SEO、社群、廣告投放',
    price: 20000,
    rating: 4.8,
    reviews: 92,
    seller: '行銷策略師',
    deliveryTime: '14天',
    tags: ['行銷策略', 'SEO', '社群經營'],
    image: null,
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=100&fit=crop',
        alt: '數位行銷策略',
        link: 'https://blog.hubspot.com/marketing'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=100&fit=crop',
        alt: '數據分析圖表',
        link: 'https://analytics.google.com'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=150&h=100&fit=crop',
        alt: '社群媒體管理',
        link: 'https://buffer.com'
      }
    ],
    detailedDescription: `
      <h3>行銷策略規劃：</h3>
      <ul>
        <li>市場分析與競爭對手研究</li>
        <li>目標客群定位</li>
        <li>行銷漏斗設計</li>
        <li>多渠道整合策略</li>
        <li>預算分配建議</li>
        <li>效果追蹤機制</li>
      </ul>
      
      <h3>服務內容：</h3>
      <ul>
        <li>SEO關鍵字策略</li>
        <li>社群媒體經營計畫</li>
        <li>內容行銷規劃</li>
        <li>廣告投放策略</li>
        <li>Email行銷設計</li>
        <li>數據分析報告</li>
      </ul>
      
      <h3>交付文件：</h3>
      <ul>
        <li>完整行銷策略書</li>
        <li>執行時程表</li>
        <li>KPI設定建議</li>
        <li>工具使用指南</li>
        <li>後續追蹤機制</li>
      </ul>
    `,
    seller: {
      name: '行銷策略師',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b734?w=80&h=80&fit=crop&crop=face',
      rating: 4.8,
      reviews: 92,
      responseTime: '1小時內',
      completedProjects: 156,
      memberSince: '2018年6月',
      skills: ['數位行銷', 'SEO', '數據分析', '社群經營'],
      bio: '資深數位行銷專家，擁有多年品牌行銷經驗。專精於整合行銷策略規劃，協助企業提升線上曝光與轉換率。'
    }
  }
];

// 文案撰寫分類的詳細數據
export const copywritingServices = [
  {
    id: 19,
    title: '銷售文案撰寫',
    description: '高轉換率的銷售文案，提升產品銷售力',
    price: 5000,
    rating: 4.8,
    reviews: 123,
    seller: '文案達人',
    deliveryTime: '3天',
    tags: ['銷售文案', '高轉換', '急件'],
    image: null,
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=150&h=100&fit=crop',
        alt: '文案撰寫工作',
        link: 'https://copyblogger.com'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6f44d?w=600&h=400&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6f44d?w=150&h=100&fit=crop',
        alt: '創意寫作',
        link: 'https://contentmarketinginstitute.com'
      }
    ],
    detailedDescription: `
      <h3>銷售文案類型：</h3>
      <ul>
        <li>產品銷售頁文案</li>
        <li>電子郵件行銷文案</li>
        <li>社群媒體廣告文案</li>
        <li>產品描述文案</li>
        <li>新聞稿撰寫</li>
        <li>部落格文章</li>
      </ul>
      
      <h3>文案特色：</h3>
      <ul>
        <li>消費者心理洞察</li>
        <li>情感連結建立</li>
        <li>行動呼籲優化</li>
        <li>SEO關鍵字融入</li>
        <li>A/B測試建議</li>
      </ul>
    `,
    seller: {
      name: '文案達人',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      rating: 4.8,
      reviews: 123,
      responseTime: '30分鐘內',
      completedProjects: 234,
      memberSince: '2020年4月',
      skills: ['銷售文案', 'SEO寫作', '內容策略', '品牌文案'],
      bio: '專業文案寫手，擅長撰寫具有說服力的銷售文案。深諳消費者心理，能夠創作出高轉換率的行銷內容。'
    }
  }
];

export default {
  programmingServices,
  marketingServices,
  copywritingServices
};
