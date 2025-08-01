import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { useAuth } from '../contexts/AuthContext';

const CreatorPage = () => {
  const { creatorId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [creator, setCreator] = useState(null);
  const [creatorServices, setCreatorServices] = useState([]);
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio' or 'services'

  useEffect(() => {
    // 搜尋所有分類中的服務，找到匹配的創作者
    let foundCreator = null;
    let services = [];
    
    for (const [categoryName, categoryServices] of Object.entries(servicesData)) {
      for (const service of categoryServices) {
        if (service.seller && typeof service.seller === 'object') {
          const sellerName = service.seller.name.replace(/\s+/g, '-').toLowerCase();
          const decodedCreatorId = decodeURIComponent(creatorId).toLowerCase();
          if (sellerName === decodedCreatorId || service.seller.name.toLowerCase() === decodedCreatorId) {
            if (!foundCreator) {
              foundCreator = {
                ...service.seller,
                category: categoryName
              };
            }
            services.push({
              ...service,
              category: categoryName
            });
          }
        }
      }
    }
    
    setCreator(foundCreator);
    setCreatorServices(services);
  }, [creatorId]);

  if (!creator) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-800 mb-4">創作者不存在</h2>
          <Link to="/" className="text-primary-600 hover:text-primary-800">
            返回首頁
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* 階層式導航麵包屑 */}
      <nav className="py-4">
        <div className="container-sm">
          <div className="flex items-center space-x-2 text-sm text-primary-600">
            <Link to="/" className="hover:text-primary-800 transition-colors">
              首頁
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link 
              to={`/services/${encodeURIComponent(creator.category)}`} 
              className="hover:text-primary-800 transition-colors"
            >
              {creator.category}
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-primary-800 font-medium">{creator.name}</span>
          </div>
        </div>
      </nav>

      <div className="container-sm py-8">
        {/* 創作者頭像和簡介 */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* 頭像 */}
            <div className="flex-shrink-0">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary-100"
              />
            </div>
            
            {/* 基本資訊 */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-primary-800">{creator.name}</h1>
                <button
                  onClick={() => {
                    // 檢查用戶是否已登入
                    const isRealUser = user && !user.isAnonymous && !user.isTemporary && user.email;
                    if (!isRealUser) {
                      alert('請先登入以使用私訊功能');
                      navigate('/login');
                      return;
                    }
                    navigate(`/chat?creatorId=${creator.name.replace(/\s+/g, '-').toLowerCase()}&creatorName=${encodeURIComponent(creator.name)}`);
                  }}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center text-sm"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  私訊創作者
                </button>
              </div>
              
              {/* 統計資訊 */}
              <div className="flex flex-wrap gap-6 mb-4">
                <div className="flex items-center text-sm text-primary-600">
                  <svg className="w-4 h-4 text-warning-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">{creator.rating}</span>
                  <span className="ml-1">({creator.reviews} 評價)</span>
                </div>
                
                <div className="flex items-center text-sm text-primary-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>回應時間：{creator.responseTime}</span>
                </div>
                
                <div className="flex items-center text-sm text-primary-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{creator.completedProjects} 個完成專案</span>
                </div>
                
                <div className="flex items-center text-sm text-primary-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>加入時間：{creator.memberSince}</span>
                </div>
              </div>
              
              {/* 專業技能標籤 */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-primary-700 mb-2">專業技能</h3>
                <div className="flex flex-wrap gap-2">
                  {creator.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 text-xs bg-accent-100 text-accent-700 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* 個人簡介 */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-primary-700 mb-2">個人簡介</h3>
                <p className="text-primary-600 leading-relaxed">{creator.bio}</p>
              </div>

              {/* 聯絡方式 */}
              {creator.contact && (
                <div>
                  <h3 className="text-sm font-medium text-primary-700 mb-3">聯絡方式</h3>
                  <div className="flex flex-wrap gap-4">
                    {creator.contact.email && (
                      <a 
                        href={`mailto:${creator.contact.email}`}
                        className="flex items-center text-sm text-primary-600 hover:text-primary-800 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {creator.contact.email}
                      </a>
                    )}
                    
                    {creator.contact.phone && (
                      <a 
                        href={`tel:${creator.contact.phone}`}
                        className="flex items-center text-sm text-primary-600 hover:text-primary-800 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {creator.contact.phone}
                      </a>
                    )}
                    
                    {creator.contact.website && (
                      <a 
                        href={creator.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-primary-600 hover:text-primary-800 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                        </svg>
                        作品官網
                      </a>
                    )}
                    
                    {creator.contact.line && (
                      <div className="flex items-center text-sm text-primary-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12.293.572S.586 4.943.586 10.314c0 4.811 4.15 8.818 9.717 9.598.4.09.946.258 1.084.594.123.306.081.787.04 1.096l-.172 1.088c-.061.33-.33 1.295 1.1.707 1.443-.594 7.777-4.676 10.62-8.016C22.922 15.493 24 12.993 24 10.314" />
                        </svg>
                        {creator.contact.line}
                      </div>
                    )}
                    
                    {creator.contact.instagram && (
                      <a 
                        href={`https://instagram.com/${creator.contact.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-primary-600 hover:text-primary-800 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C8.396 0 7.989.013 7.041.072 6.094.13 5.52.33 5.036.624a3.88 3.88 0 0 0-1.407.923A3.88 3.88 0 0 0 2.706 2.95C2.41 3.436 2.21 4.009 2.152 4.958 2.094 5.906 2.08 6.314 2.08 9.935s.013 4.029.072 4.976c.058.95.258 1.524.551 2.009.307.527.717.936 1.244 1.244.485.293 1.059.493 2.008.551.947.059 1.355.072 4.976.072s4.029-.013 4.976-.072c.95-.058 1.524-.258 2.009-.551.527-.308.936-.717 1.244-1.244.293-.484.493-1.059.551-2.008.059-.947.072-1.355.072-4.976s-.013-4.029-.072-4.976c-.058-.95-.258-1.524-.551-2.009a3.881 3.881 0 0 0-1.244-1.244C18.566.408 17.991.208 17.041.15 16.094.092 15.686.08 12.017.08z M12.017 2.15c3.564 0 3.987.012 5.39.071.3.007.611.028.909.088.5.098.954.317 1.3.663.247.247.466.701.564 1.201.061.3.082.611.088.909.058 1.403.07 1.826.07 5.39s-.012 3.987-.07 5.39c-.007.3-.028.611-.088.909-.098.5-.317.954-.564 1.201-.246.246-.7.465-1.2.563-.298.061-.609.082-.909.088-1.403.058-1.826.07-5.39.07s-3.987-.012-5.39-.07c-.3-.007-.611-.028-.909-.088-.5-.098-.954-.317-1.2-.563a3.236 3.236 0 0 1-.664-1.201c-.061-.3-.082-.611-.088-.909-.058-1.403-.07-1.826-.07-5.39s.012-3.987.07-5.39c.007-.3.028-.611.088-.909.098-.5.317-.954.664-1.2.246-.247.7-.466 1.2-.564.298-.061.609-.082.909-.088 1.403-.058 1.826-.07 5.39-.07z"/>
                        </svg>
                        {creator.contact.instagram}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 標籤切換導航 */}
        <div className="bg-white rounded-2xl shadow-sm mb-8">
          <div className="border-b border-primary-100">
            <nav className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'portfolio'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-primary-500 hover:text-primary-700 hover:border-primary-300'
                }`}
              >
                作品集
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'services'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-primary-500 hover:text-primary-700 hover:border-primary-300'
                }`}
              >
                上架服務
              </button>
            </nav>
          </div>

          <div className="p-8">
            {/* 作品集內容 */}
            {activeTab === 'portfolio' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {creatorServices.flatMap(service => 
                    service.media ? service.media.slice(0, 6) : []
                  ).map((mediaItem, index) => (
                    <div key={index} className="group cursor-pointer" onClick={() => mediaItem.link && window.open(mediaItem.link, '_blank')}>
                      <div className="aspect-video bg-primary-50 rounded-lg overflow-hidden">
                        <img
                          src={mediaItem.url}
                          alt={mediaItem.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-sm text-primary-600 mt-2">{mediaItem.alt}</p>
                    </div>
                  ))}
                </div>
                {creatorServices.flatMap(service => service.media || []).length === 0 && (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-primary-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-primary-500">暫無作品展示</p>
                  </div>
                )}
              </div>
            )}

            {/* 上架服務內容 */}
            {activeTab === 'services' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {creatorServices.map((service) => (
                    <Link
                      key={`${service.category}-${service.id}`}
                      to={`/services/${encodeURIComponent(service.category)}/${service.id}`}
                      className="bg-primary-50 border border-primary-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 block"
                    >
                      {/* 服務圖片 */}
                      <div className="w-full h-32 bg-white rounded-lg mb-4 overflow-hidden">
                        {service.image ? (
                          <img 
                            src={service.image} 
                            alt={service.title}
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
                      
                      <h3 className="text-lg font-semibold text-primary-800 mb-2 line-clamp-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-primary-600 mb-3 line-clamp-2">
                        {service.description}
                      </p>
                      
                      {/* 分類標籤 */}
                      <div className="mb-3">
                        <span className="px-2 py-1 text-xs bg-accent-100 text-accent-700 rounded-full">
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
                    <p className="text-primary-500">暫無上架服務</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorPage;
