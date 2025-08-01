// 各分類的服務數據
export const servicesData = {
  '平面設計': [
    {
      id: 1,
      title: '企業品牌LOGO設計',
      description: '提供完整的品牌識別系統設計，包含LOGO、名片、信紙等基礎應用',
      price: 8000,
      rating: 4.8,
      reviews: 156,
      deliveryTime: '7天',
      tags: ['LOGO設計', '品牌識別', '包含原始檔'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=150&h=100&fit=crop',
          alt: 'LOGO設計作品展示',
          link: 'https://dribbble.com/shots/logo-design'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1549082984-1323b94df9a6?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1549082984-1323b94df9a6?w=150&h=100&fit=crop',
          alt: '品牌識別系統',
          link: 'https://behance.net/gallery/brand-identity'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=150&h=100&fit=crop',
          alt: '名片設計範例',
          link: 'https://pinterest.com/pin/business-card-design'
        }
      ],
      detailedDescription: `
        <h3>服務內容包含：</h3>
        <ul>
          <li>專業LOGO設計 (3-5個初稿)</li>
          <li>完整品牌色彩規範</li>
          <li>字體搭配建議</li>
          <li>名片設計模板</li>
          <li>信紙設計模板</li>
          <li>社群媒體頭像設計</li>
        </ul>
        
        <h3>設計流程：</h3>
        <ol>
          <li>需求溝通與品牌定位討論 (1-2天)</li>
          <li>概念發想與初稿設計 (2-3天)</li>
          <li>客戶回饋與修改調整 (1-2天)</li>
          <li>最終完稿與檔案交付 (1天)</li>
        </ol>
        
        <h3>交付檔案：</h3>
        <ul>
          <li>AI/EPS向量檔案 (可無限放大)</li>
          <li>PNG透明背景檔</li>
          <li>JPG高解析度檔案</li>
          <li>品牌色彩色碼表</li>
          <li>使用規範說明書</li>
        </ul>
      `,
      seller: {
        name: '設計師小王',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
        rating: 4.8,
        reviews: 156,
        responseTime: '1小時內',
        completedProjects: 89,
        memberSince: '2022年3月',
        skills: ['LOGO設計', '品牌識別', 'UI設計', '包裝設計'],
        bio: '擁有5年以上品牌設計經驗，專精於企業識別系統設計。曾服務過多家知名企業，包括科技公司、餐飲品牌、時尚品牌等。注重品牌故事的視覺化呈現，善於將抽象概念轉化為具體的設計元素。',
        contact: {
          email: 'designer.wang@email.com',
          phone: '0912-345-678',
          website: 'https://portfolio.wang-design.com',
          line: '@wangdesign',
          instagram: '@wang_designer'
        }
      }
    },
    {
      id: 2,
      title: '精美海報設計製作',
      description: '專業海報設計，適用於活動宣傳、商品推廣等用途',
      price: 3500,
      rating: 4.9,
      reviews: 89,
      deliveryTime: '3天',
      tags: ['海報設計', '印刷品', '急件'],
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=300&h=200&fit=crop',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=150&h=100&fit=crop',
          alt: '活動海報設計',
          link: 'https://dribbble.com/shots/poster-design'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=150&h=100&fit=crop',
          alt: '音樂會海報',
          link: 'https://behance.net/gallery/music-poster'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1561070791-36a0d2ef8bd2?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1561070791-36a0d2ef8bd2?w=150&h=100&fit=crop',
          alt: '商業海報展示',
          link: 'https://pinterest.com/pin/poster-design'
        }
      ],
      detailedDescription: `
        <h3>海報設計服務：</h3>
        <ul>
          <li>活動宣傳海報設計</li>
          <li>商品推廣海報</li>
          <li>展覽宣傳設計</li>
          <li>音樂會/演唱會海報</li>
          <li>企業形象海報</li>
        </ul>
        
        <h3>設計特色：</h3>
        <ul>
          <li>視覺衝擊力強</li>
          <li>資訊層次清晰</li>
          <li>符合印刷規範</li>
          <li>多種尺寸適配</li>
        </ul>
      `,
      seller: {
        name: '創意工作室',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        rating: 4.9,
        reviews: 89,
        responseTime: '2小時內',
        completedProjects: 156,
        memberSince: '2021年8月',
        skills: ['海報設計', '視覺設計', '印刷設計', '插畫'],
        bio: '專業視覺設計團隊，擅長各類海報與宣傳物設計。注重視覺衝擊力與資訊傳達的平衡，為客戶打造令人印象深刻的宣傳作品。',
        contact: {
          email: 'creative.studio@email.com',
          phone: '02-2345-6789',
          website: 'https://creative-studio.tw',
          line: '@creativestudio',
          instagram: '@creative_studio_tw'
        }
      }
    },
    {
      id: 3,
      title: '商品包裝設計',
      description: '創新包裝設計，提升產品價值與市場競爭力',
      price: 12000,
      rating: 4.7,
      reviews: 234,
      deliveryTime: '10天',
      tags: ['包裝設計', '商用授權', '修改次數多'],
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=300&h=200&fit=crop',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=150&h=100&fit=crop',
          alt: '產品包裝設計',
          link: 'https://packageinspirations.com'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=150&h=100&fit=crop',
          alt: '食品包裝案例',
          link: 'https://thedieline.com'
        }
      ],
      detailedDescription: `
        <h3>包裝設計範圍：</h3>
        <ul>
          <li>食品包裝設計</li>
          <li>化妝品包裝</li>
          <li>電子產品包裝</li>
          <li>禮品包裝設計</li>
        </ul>
        
        <h3>設計考量：</h3>
        <ul>
          <li>材質與工藝選擇</li>
          <li>成本控制建議</li>
          <li>市場競爭分析</li>
          <li>環保材質應用</li>
        </ul>
      `,
      seller: {
        name: '包裝達人',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b734?w=80&h=80&fit=crop&crop=face',
        rating: 4.7,
        reviews: 234,
        responseTime: '3小時內',
        completedProjects: 67,
        memberSince: '2020年12月',
        skills: ['包裝設計', '產品設計', '3D建模', '印刷工藝'],
        bio: '專精於產品包裝設計，擁有豐富的包裝工藝與材質知識。致力於為產品創造獨特的視覺身份，提升品牌價值與市場競爭力。',
        contact: {
          email: 'package.master@email.com',
          phone: '0955-123-456',
          website: 'https://package-design.studio',
          line: '@packagemaster',
          instagram: '@package_design_studio'
        }
      }
    },
    {
      id: 4,
      title: '手繪風格插畫設計',
      description: '客製化插畫設計，適用於書籍、網站、宣傳等多種用途',
      price: 5500,
      rating: 4.6,
      reviews: 67,
      deliveryTime: '5天',
      tags: ['插畫', '包含原始檔'],
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=150&h=100&fit=crop',
          alt: '手繪插畫作品',
          link: 'https://dribbble.com/shots/illustration'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=150&h=100&fit=crop',
          alt: '繪畫工具與作品',
          link: 'https://behance.net/gallery/illustration'
        }
      ],
      detailedDescription: `
        <h3>插畫類型：</h3>
        <ul>
          <li>書籍插畫</li>
          <li>網站插圖</li>
          <li>角色設計</li>
          <li>場景插畫</li>
          <li>商業插圖</li>
        </ul>
        
        <h3>風格特色：</h3>
        <ul>
          <li>手繪質感</li>
          <li>溫暖色調</li>
          <li>細膩筆觸</li>
          <li>故事性強</li>
        </ul>
      `,
      seller: {
        name: '插畫師小美',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
        rating: 4.6,
        reviews: 67,
        responseTime: '4小時內',
        completedProjects: 123,
        memberSince: '2021年5月',
        skills: ['手繪插畫', '數位插畫', '角色設計', '故事板'],
        bio: '專業插畫師，擅長手繪風格插畫創作。作品充滿溫暖與故事性，適合各種商業與藝術用途。注重與客戶的溝通，確保作品符合需求。',
        contact: {
          email: 'meimei.illustration@email.com',
          phone: '0988-567-890',
          website: 'https://meimei-illustration.com',
          line: '@meimeiart',
          instagram: '@meimei_illustration'
        }
      }
    },
    {
      id: 5,
      title: 'DM傳單設計',
      description: '吸睛的DM設計，有效傳達訊息並提升宣傳效果',
      price: 2500,
      rating: 4.5,
      reviews: 123,
      deliveryTime: '2天',
      tags: ['DM設計', '傳單設計', '急件'],
      image: 'https://images.unsplash.com/photo-1541414779316-956a5084c0d4?w=300&h=200&fit=crop',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=150&h=100&fit=crop',
          alt: 'DM傳單設計',
          link: 'https://canva.com/templates/flyers'
        }
      ],
      detailedDescription: `
        <h3>DM設計服務：</h3>
        <ul>
          <li>促銷活動DM</li>
          <li>餐廳菜單設計</li>
          <li>店面宣傳單</li>
          <li>服務介紹摺頁</li>
        </ul>
      `,
      seller: {
        name: '廣告小組',
        avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face',
        rating: 4.5,
        reviews: 123,
        responseTime: '1小時內',
        completedProjects: 234,
        memberSince: '2022年1月',
        skills: ['DM設計', '廣告設計', '印刷設計', '版面設計'],
        bio: '專業廣告設計團隊，專精於各類宣傳物設計。快速回應，高效製作，為客戶提供最具宣傳效果的設計方案。',
        contact: {
          email: 'ad.team@email.com',
          phone: '02-8888-9999',
          website: 'https://ad-design-team.com',
          line: '@adteam',
          instagram: '@ad_design_group'
        }
      }
    },
    {
      id: 6,
      title: '企業型錄設計',
      description: '專業型錄設計，完整呈現企業形象與產品資訊',
      price: 15000,
      rating: 4.8,
      reviews: 45,
      deliveryTime: '14天',
      tags: ['型錄設計', '印刷品', '商用授權'],
      image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=300&h=200&fit=crop',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=150&h=100&fit=crop',
          alt: '企業型錄設計',
          link: 'https://dribbble.com/shots/catalog-design'
        }
      ],
      detailedDescription: `
        <h3>型錄設計內容：</h3>
        <ul>
          <li>企業形象展示</li>
          <li>產品目錄設計</li>
          <li>服務介紹版面</li>
          <li>聯絡資訊整合</li>
        </ul>
      `,
      seller: {
        name: '企業設計團隊',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
        rating: 4.8,
        reviews: 45,
        responseTime: '6小時內',
        completedProjects: 78,
        memberSince: '2020年6月',
        skills: ['型錄設計', '企業形象', '版面設計', '印刷規劃'],
        bio: '專業企業設計團隊，擅長大型型錄與企業刊物設計。注重資訊架構與視覺層次，為企業打造專業形象。',
        contact: {
          email: 'corporate.design@email.com',
          phone: '02-7777-8888',
          website: 'https://corporate-design.pro',
          line: '@corpdesign',
          instagram: '@corporate_design_team'
        }
      }
    }
  ],
  
  '網頁設計': [
    {
      id: 7,
      title: '響應式企業官網設計',
      description: '現代化企業官網設計，支援桌面、平板、手機完美顯示',
      price: 25000,
      rating: 4.9,
      reviews: 78,
      deliveryTime: '21天',
      tags: ['響應式設計', '企業官網', '包含原始檔'],
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&h=200&fit=crop',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=150&h=100&fit=crop',
          alt: '響應式網站設計',
          link: 'https://dribbble.com/shots/web-design'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=150&h=100&fit=crop',
          alt: '企業網站案例',
          link: 'https://awwwards.com'
        },
        {
          type: 'video',
          url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=150&h=100&fit=crop',
          alt: '網站互動效果展示',
          link: 'https://youtube.com/watch?v=responsive-design'
        }
      ],
      detailedDescription: `
        <h3>網站設計服務：</h3>
        <ul>
          <li>響應式網頁設計</li>
          <li>使用者體驗設計 (UX)</li>
          <li>使用者介面設計 (UI)</li>
          <li>網站架構規劃</li>
          <li>SEO優化建議</li>
          <li>網站效能優化</li>
        </ul>
        
        <h3>技術特色：</h3>
        <ul>
          <li>HTML5/CSS3/JavaScript</li>
          <li>Bootstrap框架</li>
          <li>跨瀏覽器相容</li>
          <li>快速載入設計</li>
          <li>搜索引擎友善</li>
        </ul>
        
        <h3>交付內容：</h3>
        <ul>
          <li>完整網站設計檔</li>
          <li>響應式測試報告</li>
          <li>使用說明文件</li>
          <li>後台管理培訓</li>
        </ul>
      `,
      seller: {
        name: 'WebDesign Pro',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face',
        rating: 4.9,
        reviews: 78,
        responseTime: '2小時內',
        completedProjects: 145,
        memberSince: '2019年9月',
        skills: ['響應式設計', 'UI/UX', 'JavaScript', 'SEO優化'],
        bio: '專業網頁設計師，擁有豐富的企業網站設計經驗。專精於響應式設計與使用者體驗優化，致力於創造美觀且實用的網站。',
        contact: {
          email: 'webdesign.pro@email.com',
          phone: '0977-333-444',
          website: 'https://webdesign-pro.tw',
          line: '@webdesignpro',
          instagram: '@webdesign_pro_tw'
        }
      }
    },
    {
      id: 8,
      title: 'Landing Page 設計',
      description: '高轉換率的產品著陸頁設計，專注於使用者體驗',
      price: 8000,
      rating: 4.7,
      reviews: 134,
      deliveryTime: '7天',
      tags: ['Landing Page', '高轉換率', '急件'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&h=100&fit=crop',
          alt: 'Landing Page設計',
          link: 'https://landingfolio.com'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=150&h=100&fit=crop',
          alt: '轉換率分析',
          link: 'https://unbounce.com/landing-page-examples'
        }
      ],
      detailedDescription: `
        <h3>Landing Page 特色：</h3>
        <ul>
          <li>高轉換率設計</li>
          <li>A/B測試支援</li>
          <li>行動呼籲優化</li>
          <li>表單設計優化</li>
          <li>載入速度優化</li>
        </ul>
        
        <h3>分析工具整合：</h3>
        <ul>
          <li>Google Analytics</li>
          <li>Facebook Pixel</li>
          <li>熱點分析工具</li>
          <li>轉換追蹤設定</li>
        </ul>
      `,
      seller: {
        name: 'UX設計師',
        avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=80&h=80&fit=crop&crop=face',
        rating: 4.7,
        reviews: 134,
        responseTime: '1小時內',
        completedProjects: 89,
        memberSince: '2021年2月',
        skills: ['UX設計', '轉換率優化', 'A/B測試', '數據分析'],
        bio: '專精於轉換率優化的UX設計師，透過數據分析與使用者行為研究，設計出高轉換率的Landing Page。',
        contact: {
          email: 'ux.designer@email.com',
          phone: '0966-777-888',
          website: 'https://ux-optimization.com',
          line: '@uxdesigner',
          instagram: '@ux_designer_tw'
        }
      }
    },
    {
      id: 9,
      title: 'E-commerce 購物網站',
      description: '完整的電商網站設計，包含購物車、結帳流程',
      price: 45000,
      rating: 4.8,
      reviews: 56,
      deliveryTime: '30天',
      tags: ['電商網站', '購物車', '商用授權'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=150&h=100&fit=crop',
          alt: '電商網站設計',
          link: 'https://shopify.com/examples'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=150&h=100&fit=crop',
          alt: '購物車流程',
          link: 'https://baymard.com/checkout-usability'
        }
      ],
      detailedDescription: `
        <h3>電商功能：</h3>
        <ul>
          <li>商品目錄管理</li>
          <li>購物車系統</li>
          <li>安全結帳流程</li>
          <li>會員系統</li>
          <li>訂單管理</li>
          <li>庫存管理</li>
        </ul>
        
        <h3>金流整合：</h3>
        <ul>
          <li>信用卡支付</li>
          <li>第三方支付</li>
          <li>貨到付款</li>
          <li>分期付款</li>
        </ul>
      `,
      seller: {
        name: '電商專家團隊',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face',
        rating: 4.8,
        reviews: 56,
        responseTime: '4小時內',
        completedProjects: 34,
        memberSince: '2020年3月',
        skills: ['電商開發', '金流整合', '後台系統', '資料庫設計'],
        bio: '專業電商開發團隊，擁有豐富的線上購物網站開發經驗。從前台設計到後台管理，提供完整的電商解決方案。',
        contact: {
          email: 'ecommerce.team@email.com',
          phone: '02-5555-6666',
          website: 'https://ecommerce-experts.com',
          line: '@ecommerceteam',
          instagram: '@ecommerce_experts_tw'
        }
      }
    },
    {
      id: 10,
      title: 'WordPress 主題客製化',
      description: '專業WordPress主題客製化，符合品牌形象',
      price: 12000,
      rating: 4.6,
      reviews: 89,
      deliveryTime: '14天',
      tags: ['WordPress', '主題客製', '修改次數多'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop',
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&h=100&fit=crop',
          alt: 'WordPress主題設計',
          link: 'https://themeforest.net'
        }
      ],
      detailedDescription: `
        <h3>WordPress服務：</h3>
        <ul>
          <li>主題客製化設計</li>
          <li>外掛功能開發</li>
          <li>網站效能優化</li>
          <li>安全性設定</li>
          <li>SEO設定優化</li>
        </ul>
      `,
      seller: {
        name: 'WP專家',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
        rating: 4.6,
        reviews: 89,
        responseTime: '3小時內',
        completedProjects: 167,
        memberSince: '2019年7月',
        skills: ['WordPress', 'PHP', '主題開發', '外掛開發'],
        bio: 'WordPress專家，專精於主題客製化與外掛開發。擁有豐富的WordPress網站建置經驗，提供專業的技術支援。',
        contact: {
          email: 'wp.expert@email.com',
          phone: '0933-444-555',
          website: 'https://wp-expert.tw',
          line: '@wpexpert',
          instagram: '@wp_expert_tw'
        }
      }
    }
  ],

  '程式開發': [
    {
      id: 11,
      title: 'React 前端開發',
      description: '使用React框架開發現代化的前端應用程式',
      price: 35000,
      rating: 4.9,
      reviews: 67,
      deliveryTime: '21天',
      tags: ['React', '前端開發', '包含原始檔'],
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop',
      seller: {
        name: '前端工程師 David',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
        rating: 4.9,
        reviews: 67,
        responseTime: '4小時內',
        completedProjects: 134,
        memberSince: '2019年5月',
        skills: ['React', 'JavaScript', 'TypeScript', 'Next.js', '前端架構'],
        bio: '資深前端工程師，擁有6年React開發經驗。專精於現代化前端架構設計，曾參與多個大型專案開發，注重程式碼品質與使用者體驗。',
        contact: {
          email: 'david.frontend@email.com',
          phone: '0987-654-321',
          website: 'https://david-frontend.dev',
          line: '@daviddev',
          instagram: '@david_codes'
        }
      },
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=150&h=100&fit=crop',
          alt: 'React應用程式開發',
          link: 'https://github.com/david-frontend'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=150&h=100&fit=crop',
          alt: '前端架構設計',
          link: 'https://codepen.io/david-frontend'
        }
      ],
      detailedDescription: `
        <h3>服務內容包含：</h3>
        <ul>
          <li>React應用程式開發</li>
          <li>響應式網頁設計</li>
          <li>前端架構規劃</li>
          <li>程式碼品質優化</li>
          <li>效能調優</li>
          <li>部署與維護指導</li>
        </ul>
        
        <h3>技術特色：</h3>
        <ol>
          <li>使用最新React框架與Hook</li>
          <li>TypeScript靜態型別檢查</li>
          <li>組件化開發模式</li>
          <li>響應式設計</li>
          <li>SEO友善設計</li>
        </ol>
      `
    },
    {
      id: 12,
      title: 'Node.js 後端API開發',
      description: '建立穩定高效的後端API服務，支援RESTful架構',
      price: 28000,
      rating: 4.8,
      reviews: 45,
      deliveryTime: '18天',
      tags: ['Node.js', 'API開發', '資料庫設計'],
      image: null
    },
    {
      id: 13,
      title: 'APP程式開發',
      description: 'iOS/Android雙平台原生APP開發',
      price: 80000,
      rating: 4.7,
      reviews: 34,
      deliveryTime: '45天',
      tags: ['APP開發', '雙平台', '商用授權'],
      image: null
    },
    {
      id: 14,
      title: '網站效能優化',
      description: '提升網站載入速度，改善使用者體驗',
      price: 15000,
      rating: 4.6,
      reviews: 78,
      deliveryTime: '10天',
      tags: ['效能優化', '速度提升', '急件'],
      image: null
    }
  ],

  '行銷企劃': [
    {
      id: 15,
      title: '數位行銷策略規劃',
      description: '完整的數位行銷策略制定，包含SEO、社群、廣告投放',
      price: 20000,
      rating: 4.8,
      reviews: 92,
      deliveryTime: '14天',
      tags: ['行銷策略', 'SEO', '社群經營'],
      image: null
    },
    {
      id: 16,
      title: '社群媒體經營企劃',
      description: 'Facebook、Instagram等社群平台經營策略',
      price: 12000,
      rating: 4.7,
      reviews: 156,
      deliveryTime: '7天',
      tags: ['社群經營', 'Facebook', 'Instagram'],
      image: null
    },
    {
      id: 17,
      title: 'Google Ads 廣告投放',
      description: '專業Google廣告投放策略，提升ROI',
      price: 8000,
      rating: 4.9,
      reviews: 67,
      deliveryTime: '5天',
      tags: ['Google Ads', '廣告投放', '高ROI'],
      image: null
    },
    {
      id: 18,
      title: '品牌行銷企劃書',
      description: '完整的品牌行銷企劃書撰寫，從定位到執行',
      price: 25000,
      rating: 4.6,
      reviews: 45,
      deliveryTime: '21天',
      tags: ['品牌企劃', '市場分析', '執行策略'],
      image: null
    }
  ],

  '文案撰寫': [
    {
      id: 19,
      title: '銷售文案撰寫',
      description: '高轉換率的銷售文案，提升產品銷售力',
      price: 5000,
      rating: 4.8,
      reviews: 123,
      deliveryTime: '3天',
      tags: ['銷售文案', '高轉換', '急件'],
      image: null
    },
    {
      id: 20,
      title: 'SEO文章撰寫',
      description: '符合SEO規範的優質文章內容撰寫',
      price: 3000,
      rating: 4.7,
      reviews: 89,
      deliveryTime: '5天',
      tags: ['SEO文章', '關鍵字優化', '包含原始檔'],
      image: null
    },
    {
      id: 21,
      title: '品牌故事撰寫',
      description: '打造感人的品牌故事，建立情感連結',
      price: 8000,
      rating: 4.9,
      reviews: 67,
      deliveryTime: '7天',
      tags: ['品牌故事', '情感連結', '修改次數多'],
      image: null
    },
    {
      id: 22,
      title: '產品描述文案',
      description: '吸引人的產品描述文案，提升購買意願',
      price: 2500,
      rating: 4.6,
      reviews: 145,
      deliveryTime: '2天',
      tags: ['產品文案', '購買誘導', '急件'],
      image: null
    }
  ],

  '影音製作': [
    {
      id: 1,
      title: '企業形象影片製作',
      price: 35000,
      rating: 4.9,
      reviews: 45,
      description: '專業企業形象影片製作，從腳本撰寫到後製完成一條龍服務',
      tags: ['企業影片', '腳本撰寫', '專業攝影', '後製剪輯'],
      seller: {
        name: '影音工作室 Alex',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        rating: 4.9,
        reviews: 45,
        responseTime: '6小時內',
        completedProjects: 78,
        memberSince: '2020年',
        skills: ['影片製作', '腳本撰寫', '後製剪輯', '動畫製作'],
        bio: '專業影音製作團隊，擁有8年企業影片製作經驗。曾為多家上市公司製作形象影片，擅長將企業理念轉化為動人的視覺故事。',
        contact: {
          email: 'alex.videostudio@email.com',
          phone: '0922-888-999',
          website: 'https://alex-video-studio.com',
          line: '@alexvideo',
          instagram: '@alex_video_studio'
        }
      },
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=150&h=100&fit=crop',
          alt: '企業影片製作現場',
          link: 'https://unsplash.com/@tvick'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=150&h=100&fit=crop',
          alt: '專業攝影設備',
          link: 'https://unsplash.com/@jakobowens1'
        },
        {
          type: 'video',
          url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=150&h=100&fit=crop',
          alt: '影片後製工作',
          link: 'https://unsplash.com/@ale_s_bianchi'
        }
      ],
      detailedDescription: `
        <h3>服務內容包含：</h3>
        <ul>
          <li>前期企劃與腳本撰寫</li>
          <li>專業攝影團隊拍攝</li>
          <li>後製剪輯與特效製作</li>
          <li>配音與音效設計</li>
          <li>字幕製作</li>
          <li>多種格式檔案交付</li>
        </ul>
        
        <h3>製作流程：</h3>
        <ol>
          <li>需求討論與企劃構思 (3-5天)</li>
          <li>腳本撰寫與分鏡設計 (3-5天)</li>
          <li>實地拍攝作業 (1-3天)</li>
          <li>後製剪輯與特效製作 (7-10天)</li>
          <li>配音配樂與最終完稿 (2-3天)</li>
        </ol>
        
        <h3>交付內容：</h3>
        <ul>
          <li>4K高畫質影片檔案</li>
          <li>社群媒體適用版本</li>
          <li>字幕檔案 (中英對照)</li>
          <li>拍攝花絮影片</li>
          <li>專案素材檔案</li>
        </ul>
      `
    },
    {
      id: 2,
      title: '商品攝影與修圖',
      price: 8000,
      rating: 4.7,
      reviews: 89,
      description: '專業商品攝影服務，提供精美的商品照片用於電商平台',
      tags: ['商品攝影', '修圖', '電商', '去背'],
      seller: {
        name: '攝影師 Bella',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b494?w=80&h=80&fit=crop&crop=face',
        rating: 4.7,
        reviews: 89,
        responseTime: '4小時內',
        completedProjects: 156,
        memberSince: '2019年',
        skills: ['商品攝影', '修圖後製', '燈光設計', '色彩調整'],
        bio: '專業商品攝影師，專精於電商產品拍攝。擅長運用燈光與構圖突出商品特色，提升商品銷售力。'
      },
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=100&fit=crop',
          alt: '商品攝影工作室',
          link: 'https://unsplash.com/@nordwood'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=150&h=100&fit=crop',
          alt: '精美商品照片範例',
          link: 'https://unsplash.com/@shaikhulud'
        }
      ],
      detailedDescription: `
        <h3>攝影服務包含：</h3>
        <ul>
          <li>專業商品攝影 (10-30張)</li>
          <li>多角度拍攝</li>
          <li>細節特寫</li>
          <li>情境式拍攝</li>
          <li>去背處理</li>
          <li>色彩校正與修圖</li>
        </ul>
        
        <h3>適用商品類型：</h3>
        <ul>
          <li>服飾配件</li>
          <li>3C電子產品</li>
          <li>美妝保養品</li>
          <li>生活用品</li>
          <li>食品飲料</li>
          <li>手工藝品</li>
        </ul>
      `
    },
    {
      id: 3,
      title: 'YouTube頻道影片剪輯',
      price: 5000,
      rating: 4.6,
      reviews: 67,
      description: 'YouTube影片專業剪輯服務，讓你的頻道內容更加精彩',
      tags: ['YouTube', '影片剪輯', '字幕', '縮圖設計'],
      seller: {
        name: '剪輯師 Kevin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
        rating: 4.6,
        reviews: 67,
        responseTime: '12小時內',
        completedProjects: 234,
        memberSince: '2021年',
        skills: ['影片剪輯', '字幕製作', '音效處理', '縮圖設計'],
        bio: 'YouTube影片剪輯專家，熟悉各種類型頻道的剪輯風格。能夠根據頻道特色調整剪輯節奏，提升觀看體驗。'
      },
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=150&h=100&fit=crop',
          alt: '影片剪輯工作畫面',
          link: 'https://unsplash.com/@jakobowens1'
        }
      ],
      detailedDescription: `
        <h3>剪輯服務包含：</h3>
        <ul>
          <li>影片剪輯與節奏調整</li>
          <li>轉場特效製作</li>
          <li>字幕製作與同步</li>
          <li>背景音樂與音效</li>
          <li>色彩調色</li>
          <li>縮圖設計 (3款選擇)</li>
        </ul>
      `
    }
  ],

  '商業諮詢': [
    {
      id: 1,
      title: '企業數位轉型顧問',
      price: 50000,
      rating: 4.8,
      reviews: 32,
      description: '協助企業進行數位轉型，提升營運效率與競爭力',
      tags: ['數位轉型', '流程優化', '策略規劃', '技術導入'],
      seller: {
        name: '顧問 Michael',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face',
        rating: 4.8,
        reviews: 32,
        responseTime: '24小時內',
        completedProjects: 45,
        memberSince: '2018年',
        skills: ['數位策略', '流程改善', '變革管理', '技術評估'],
        bio: '資深企業顧問，擁有15年管理諮詢經驗。專精於協助傳統企業進行數位轉型，曾服務過多家知名企業。'
      },
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=150&h=100&fit=crop',
          alt: '商業策略討論',
          link: 'https://unsplash.com/@scott_graham'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=100&fit=crop',
          alt: '團隊協作會議',
          link: 'https://unsplash.com/@cowomen'
        }
      ],
      detailedDescription: `
        <h3>顧問服務內容：</h3>
        <ul>
          <li>企業現況評估與診斷</li>
          <li>數位轉型策略規劃</li>
          <li>流程重新設計</li>
          <li>技術解決方案建議</li>
          <li>變革管理指導</li>
          <li>員工培訓規劃</li>
        </ul>
        
        <h3>服務流程：</h3>
        <ol>
          <li>初步諮詢與需求分析 (1週)</li>
          <li>企業現況深度診斷 (2週)</li>
          <li>策略方案設計 (2週)</li>
          <li>實施計畫制定 (1週)</li>
          <li>執行指導與追蹤 (持續)</li>
        </ol>
      `
    },
    {
      id: 2,
      title: '新創公司商業計畫書',
      price: 25000,
      rating: 4.7,
      reviews: 28,
      description: '專業商業計畫書撰寫，協助新創公司獲得投資',
      tags: ['商業計畫書', '新創', '投資簡報', '財務規劃'],
      seller: {
        name: '創業顧問 Sarah',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
        rating: 4.7,
        reviews: 28,
        responseTime: '12小時內',
        completedProjects: 67,
        memberSince: '2019年',
        skills: ['商業規劃', '財務分析', '市場研究', 'Pitch設計'],
        bio: '新創生態圈資深顧問，曾協助多家新創公司成功獲得天使輪與A輪投資。擅長商業模式設計與投資人溝通。'
      },
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=100&fit=crop',
          alt: '商業提案簡報',
          link: 'https://unsplash.com/@felipepelaquim'
        }
      ],
      detailedDescription: `
        <h3>商業計畫書內容：</h3>
        <ul>
          <li>執行摘要</li>
          <li>市場分析與競爭對手研究</li>
          <li>商業模式設計</li>
          <li>行銷策略規劃</li>
          <li>營運計畫</li>
          <li>財務預測與資金需求</li>
          <li>風險評估</li>
          <li>投資人簡報檔</li>
        </ul>
      `
    },
    {
      id: 3,
      title: '品牌策略規劃',
      price: 18000,
      rating: 4.9,
      reviews: 41,
      description: '完整品牌策略規劃，建立獨特的品牌定位與形象',
      tags: ['品牌策略', '品牌定位', '行銷規劃', '品牌形象'],
      seller: {
        name: '品牌顧問 David',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
        rating: 4.9,
        reviews: 41,
        responseTime: '8小時內',
        completedProjects: 89,
        memberSince: '2020年',
        skills: ['品牌策略', '市場定位', '消費者洞察', '品牌管理'],
        bio: '品牌策略專家，協助企業建立強勢品牌。擅長從消費者洞察出發，打造具有差異化競爭優勢的品牌策略。'
      },
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=150&h=100&fit=crop',
          alt: '品牌策略規劃',
          link: 'https://unsplash.com/@brunovdkraan'
        }
      ],
      detailedDescription: `
        <h3>品牌策略服務：</h3>
        <ul>
          <li>品牌現況診斷</li>
          <li>目標客群分析</li>
          <li>競爭環境研究</li>
          <li>品牌定位設計</li>
          <li>品牌個性與調性</li>
          <li>品牌溝通策略</li>
          <li>品牌執行指南</li>
        </ul>
      `
    }
  ],

  '教育培訓': [
    {
      id: 1,
      title: '企業數位行銷培訓',
      price: 25000,
      rating: 4.8,
      reviews: 56,
      description: '全方位數位行銷培訓課程，從基礎到進階實戰技巧',
      tags: ['數位行銷', '企業培訓', 'SEO', '社群經營'],
      seller: {
        name: '行銷講師 Lisa',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b494?w=80&h=80&fit=crop&crop=face',
        rating: 4.8,
        reviews: 56,
        responseTime: '6小時內',
        completedProjects: 89,
        memberSince: '2020年',
        skills: ['數位行銷', 'Google Ads', '社群媒體', 'SEO'],
        bio: '資深數位行銷專家，擁有10年行銷實戰經驗。曾協助多家企業建立完整的數位行銷體系，提升品牌知名度與銷售業績。'
      },
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=100&fit=crop',
          alt: '企業培訓現場',
          link: 'https://unsplash.com/@cowomen'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=150&h=100&fit=crop',
          alt: '教學材料準備',
          link: 'https://unsplash.com/@homajob'
        }
      ],
      detailedDescription: `
        <h3>培訓課程內容：</h3>
        <ul>
          <li>數位行銷策略規劃</li>
          <li>Google Ads 廣告投放</li>
          <li>Facebook & Instagram 行銷</li>
          <li>SEO 搜尋引擎優化</li>
          <li>內容行銷策略</li>
          <li>數據分析與成效追蹤</li>
        </ul>
        
        <h3>培訓方式：</h3>
        <ul>
          <li>實體課程 + 線上輔導</li>
          <li>小班制教學 (8-12人)</li>
          <li>實作演練與案例分析</li>
          <li>課後作業與個別指導</li>
        </ul>
      `
    },
    {
      id: 2,
      title: 'Python程式設計課程',
      price: 15000,
      rating: 4.9,
      reviews: 78,
      description: '從零基礎到實戰應用的Python程式設計完整課程',
      tags: ['Python', '程式設計', '資料分析', '機器學習'],
      seller: {
        name: '程式講師 Alex',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
        rating: 4.9,
        reviews: 78,
        responseTime: '4小時內',
        completedProjects: 134,
        memberSince: '2019年',
        skills: ['Python', 'JavaScript', '資料科學', '機器學習'],
        bio: '資深軟體工程師，專精於Python開發與教學。曾在科技公司擔任技術主管，現專注於程式教育推廣。'
      },
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=100&fit=crop',
          alt: '程式設計教學',
          link: 'https://unsplash.com/@ffstop'
        }
      ],
      detailedDescription: `
        <h3>課程大綱：</h3>
        <ul>
          <li>Python基礎語法</li>
          <li>資料結構與演算法</li>
          <li>網頁爬蟲實作</li>
          <li>資料分析與視覺化</li>
          <li>機器學習入門</li>
          <li>專案實作</li>
        </ul>
      `
    },
    {
      id: 3,
      title: '英語商務簡報技巧',
      price: 8000,
      rating: 4.7,
      reviews: 45,
      description: '提升英語商務簡報能力，增強國際商務溝通技巧',
      tags: ['英語簡報', '商務溝通', '簡報技巧', '英語表達'],
      seller: {
        name: '英語講師 Emily',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
        rating: 4.7,
        reviews: 45,
        responseTime: '2小時內',
        completedProjects: 123,
        memberSince: '2021年',
        skills: ['商務英語', '簡報技巧', '跨文化溝通', '英語教學'],
        bio: '國際商務英語專家，擁有豐富的跨國企業培訓經驗。專精於商務溝通與簡報技巧訓練。'
      },
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=100&fit=crop',
          alt: '商務簡報培訓',
          link: 'https://unsplash.com/@austindistel'
        }
      ],
      detailedDescription: `
        <h3>培訓重點：</h3>
        <ul>
          <li>簡報結構設計</li>
          <li>英語表達技巧</li>
          <li>肢體語言運用</li>
          <li>Q&A應答技巧</li>
          <li>文化差異理解</li>
        </ul>
      `
    }
  ],

  '翻譯服務': [
    {
      id: 1,
      title: '專業英中翻譯',
      price: 8000,
      rating: 4.9,
      reviews: 123,
      description: '高品質英中文翻譯服務，專業術語準確，語言流暢自然',
      tags: ['英中翻譯', '商業文件', '學術翻譯', '技術文件'],
      seller: {
        name: '翻譯師 Jennifer',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b494?w=80&h=80&fit=crop&crop=face',
        rating: 4.9,
        reviews: 123,
        responseTime: '2小時內',
        completedProjects: 267,
        memberSince: '2018年',
        skills: ['英中翻譯', '商業翻譯', '技術翻譯', '校對'],
        bio: '資深英中翻譯師，擁有碩士學位與10年翻譯經驗。專精商業、技術、學術領域翻譯，品質精準。'
      },
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=150&h=100&fit=crop',
          alt: '翻譯工作環境',
          link: 'https://unsplash.com/@edulauton'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=100&fit=crop',
          alt: '多語言字典',
          link: 'https://unsplash.com/@webaroo'
        }
      ],
      detailedDescription: `
        <h3>翻譯服務包含：</h3>
        <ul>
          <li>英文翻中文 (正體/簡體)</li>
          <li>中文翻英文</li>
          <li>專業術語處理</li>
          <li>格式排版調整</li>
          <li>一次免費修改</li>
          <li>24小時內交付</li>
        </ul>
        
        <h3>專精領域：</h3>
        <ul>
          <li>商業合約文件</li>
          <li>技術說明書</li>
          <li>學術論文</li>
          <li>行銷文案</li>
          <li>網站內容</li>
        </ul>
      `
    },
    {
      id: 2,
      title: '日文商務翻譯',
      price: 10000,
      rating: 4.8,
      reviews: 67,
      description: '專業日中翻譯服務，熟悉日本商務文化與敬語使用',
      tags: ['日中翻譯', '商務敬語', '合約翻譯', '會議資料'],
      seller: {
        name: '日語翻譯師 Yuki',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
        rating: 4.8,
        reviews: 67,
        responseTime: '4小時內',
        completedProjects: 156,
        memberSince: '2019年',
        skills: ['日中翻譯', '商務日語', '敬語應用', '文化諮詢'],
        bio: '日語系畢業，曾在日商企業工作5年。深度理解日本商務文化，翻譯準確且符合當地語言習慣。'
      },
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=150&h=100&fit=crop',
          alt: '日語學習環境',
          link: 'https://unsplash.com/@jareddrice'
        }
      ],
      detailedDescription: `
        <h3>日語翻譯專長：</h3>
        <ul>
          <li>商務會議資料</li>
          <li>合約協議書</li>
          <li>產品說明書</li>
          <li>行銷宣傳文案</li>
          <li>技術文件</li>
        </ul>
      `
    },
    {
      id: 3,
      title: '即時視訊口譯',
      price: 5000,
      rating: 4.7,
      reviews: 89,
      description: '線上視訊會議即時口譯服務，支援多種語言',
      tags: ['即時口譯', '視訊會議', '多語言', '商務溝通'],
      seller: {
        name: '口譯師 Michael',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
        rating: 4.7,
        reviews: 89,
        responseTime: '1小時內',
        completedProjects: 234,
        memberSince: '2020年',
        skills: ['同步口譯', '商務溝通', '會議主持', '多語切換'],
        bio: '專業同步口譯師，擁有豐富的國際會議口譯經驗。反應快速，語言切換流暢，專業可靠。'
      },
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=600&h=400&fit=crop',
          thumbnail: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=150&h=100&fit=crop',
          alt: '視訊會議口譯',
          link: 'https://unsplash.com/@comparefibre'
        }
      ],
      detailedDescription: `
        <h3>口譯服務特色：</h3>
        <ul>
          <li>即時同步翻譯</li>
          <li>支援Zoom、Teams等平台</li>
          <li>提前會議資料準備</li>
          <li>專業術語預習</li>
          <li>會議紀錄整理</li>
        </ul>
      `
    }
  ]
};

// 各分類的標籤
export const categoryTags = {
  '平面設計': [
    'LOGO設計', '名片設計', '海報設計', '包裝設計', '插畫', 
    '品牌識別', '印刷品', 'DM設計', '傳單設計', '型錄設計',
    '急件', '修改次數多', '包含原始檔', '商用授權'
  ],
  '網頁設計': [
    '響應式設計', 'Landing Page', '企業官網', '電商網站', 'WordPress',
    '使用者體驗', 'UI設計', '前端開發', '後台管理', '手機版',
    '急件', '修改次數多', '包含原始檔', '商用授權'
  ],
  '程式開發': [
    'React', 'Vue.js', 'Node.js', 'Python', 'Java',
    'APP開發', 'API開發', '資料庫設計', '系統整合', '效能優化',
    '急件', '修改次數多', '包含原始檔', '商用授權'
  ],
  '行銷企劃': [
    'SEO', '社群經營', 'Google Ads', '內容行銷', '品牌策略',
    '市場分析', '競爭分析', '廣告投放', 'Facebook', 'Instagram',
    '急件', '修改次數多', '包含原始檔', '商用授權'
  ],
  '文案撰寫': [
    '銷售文案', 'SEO文章', '品牌故事', '產品文案', '新聞稿',
    '社群文案', '廣告文案', '部落格文章', '電子報', '關鍵字優化',
    '急件', '修改次數多', '包含原始檔', '商用授權'
  ],
  '影音製作': [
    '企業影片', '產品短片', '動畫製作', '影片剪輯', '後製特效',
    '2D動畫', '3D動畫', '配音服務', '音效製作', '直播服務',
    '急件', '修改次數多', '包含原始檔', '商用授權'
  ],
  '商業諮詢': [
    '創業顧問', '財務規劃', '市場分析', '營運優化', '策略規劃',
    '投資建議', '風險評估', '流程改善', '組織管理', '數位轉型',
    '急件', '修改次數多', '包含原始檔', '商用授權'
  ],
  '教育培訓': [
    '課程設計', '企業內訓', '一對一教學', '線上課程', '教材製作',
    '簡報技巧', '溝通技巧', '領導力培訓', '數位技能', '語言學習',
    '急件', '修改次數多', '包含原始檔', '商用授權'
  ],
  '翻譯服務': [
    '中英翻譯', '日文翻譯', '韓文翻譯', '即時口譯', '文件翻譯',
    '網站翻譯', '法律翻譯', '技術翻譯', '商業翻譯', '學術翻譯',
    '急件', '修改次數多', '包含原始檔', '商用授權'
  ]
};
