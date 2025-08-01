import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';

const CreatorProfilePage = () => {
  const { creatorId } = useParams();
  const [creator, setCreator] = useState(null);
  const [creatorServices, setCreatorServices] = useState([]);
  const [activeTab, setActiveTab] = useState('portfolio');

  useEffect(() => {
    // 從所有服務中找到該創作者的資料和服務
    let foundCreator = null;
    let services = [];

    Object.entries(servicesData).forEach(([category, categoryServices]) => {
      categoryServices.forEach(service => {
        if (service.seller && typeof service.seller === 'object' && 
            service.seller.name.replace(/\s+/g, '-').toLowerCase() === creatorId) {
          if (!foundCreator) {
            foundCreator = {
              ...service.seller,
              category: category
            };
          }
          services.push({
            ...service,
            category: category
          });
        }
      });
    });

    setCreator(foundCreator);
    setCreatorServices(services);
  }, [creatorId]);

  if (!creator) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-800 mb-4">創作者不存在</h2>
          <Link to="/" className="text-accent-600 hover:text-accent-800">
            回到首頁
          </Link>
        </div>
      </div>
    );
  }

  // 模擬作品集數據（基於創作者的技能和服務）
  const portfolioItems = [
    {
      id: 1,
      title: '品牌識別系統設計',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      description: '為科技新創公司設計的完整品牌識別系統',
      category: '品牌設計'
    },
    {
      id: 2,
      title: '電商網站界面設計',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
      description: '現代化的電商平台界面設計，提升用戶體驗',
      category: '網頁設計'
    },
    {
      id: 3,
      title: '行銷宣傳海報',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop',
      description: '創意活動宣傳海報設計',
      category: '平面設計'
    },
    {
      id: 4,
      title: '手機APP界面設計',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      description: '簡潔直觀的手機應用程式界面設計',
      category: 'UI設計'
    },
    {
      id: 5,
      title: '企業形象影片',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop',
      description: '專業企業形象宣傳影片製作',
      category: '影音製作'
    },
    {
      id: 6,
      title: '產品包裝設計',
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=300&fit=crop',
      description: '創新產品包裝設計，提升商品價值',
      category: '包裝設計'
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50">
      {/* 頁面導航 */}
      <nav className="py-4">
        <div className="container-sm">
          <div className="flex items-center space-x-2 text-sm text-primary-600">
            <Link to="/" className="hover:text-primary-800 transition-colors">
              首頁
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-primary-800 font-medium">創作者檔案</span>
          </div>
        </div>
      </nav>

      <div className="container-sm pb-16">
        {/* 創作者資訊卡片 */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-48 bg-gradient-to-r from-primary-500 to-accent-500">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>
          
          <div className="relative px-8 pb-8">
            {/* 頭像 */}
            <div className="absolute -top-16 left-8">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                <img 
                  src={creator.avatar} 
                  alt={creator.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* 創作者資訊 */}
            <div className="pt-20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-3xl font-bold text-primary-800 mb-2">{creator.name}</h1>
                  <p className="text-primary-600 mb-3">{creator.bio}</p>
                  
                  {/* 技能標籤 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {creator.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* 統計資訊 */}
                <div className="flex gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-800">{creator.rating}</div>
                    <div className="text-sm text-primary-600">評分</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-800">{creator.reviews}</div>
                    <div className="text-sm text-primary-600">評價</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-800">{creator.completedProjects}</div>
                    <div className="text-sm text-primary-600">完成案件</div>
                  </div>
                </div>
              </div>
              
              {/* 額外資訊 */}
              <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-primary-100">
                <div className="flex items-center text-primary-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  回應時間：{creator.responseTime}
                </div>
                <div className="flex items-center text-primary-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  加入時間：{creator.memberSince}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 分頁標籤 */}
        <div className="flex mb-8">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-6 py-3 font-medium rounded-t-lg transition-colors ${
              activeTab === 'portfolio' 
                ? 'bg-white text-primary-800 border-b-2 border-accent-500' 
                : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
            }`}
          >
            作品集
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-6 py-3 font-medium rounded-t-lg transition-colors ${
              activeTab === 'services' 
                ? 'bg-white text-primary-800 border-b-2 border-accent-500' 
                : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
            }`}
          >
            上架服務
          </button>
        </div>

        {/* 內容區域 */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {activeTab === 'portfolio' ? (
            /* 作品集 */
            <div>
              <h2 className="text-2xl font-bold text-primary-800 mb-6">作品集</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="font-semibold text-primary-800 mb-2">{item.title}</h3>
                    <p className="text-primary-600 text-sm mb-2">{item.description}</p>
                    <span className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* 上架服務 */
            <div>
              <h2 className="text-2xl font-bold text-primary-800 mb-6">目前上架服務</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creatorServices.map((service) => (
                  <Link
                    key={service.id}
                    to={`/services/${encodeURIComponent(service.category)}/${service.id}`}
                    className="bg-white border border-primary-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 cursor-pointer block"
                  >
                    {/* 服務圖片 */}
                    <div className="w-full h-32 bg-primary-50 rounded-lg mb-3 overflow-hidden">
                      {service.image ? (
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      ) : service.media && service.media.length > 0 ? (
                        <img 
                          src={service.media[0].thumbnail || service.media[0].url} 
                          alt={service.media[0].alt || service.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* 服務資訊 */}
                    <h3 className="font-semibold text-primary-800 mb-2 line-clamp-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-primary-600 mb-3 line-clamp-2">
                      {service.description}
                    </p>
                    
                    {/* 分類標籤 */}
                    <div className="mb-3">
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                        {service.category}
                      </span>
                    </div>
                    
                    {/* 價格與評分 */}
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-bold text-accent-600">
                        NT$ {service.price.toLocaleString()}
                      </div>
                      <div className="flex items-center text-sm text-primary-600">
                        <svg className="w-4 h-4 text-warning-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {service.rating}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {creatorServices.length === 0 && (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-primary-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-primary-600">目前沒有上架的服務</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatorProfilePage;
