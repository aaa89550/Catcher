import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { useAuth } from '../contexts/AuthContext';

const ServiceDetailPage = () => {
  const { category, serviceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [service, setService] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const categoryData = servicesData[decodeURIComponent(category)];
    if (categoryData) {
      const serviceData = categoryData.find(s => s.id === parseInt(serviceId));
      if (serviceData) {
        // 如果服務已經有媒體數據，直接使用；否則添加預設媒體
        const enhancedService = {
          ...serviceData,
          media: serviceData.media || [
            {
              type: 'image',
              url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
              thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=150&h=100&fit=crop',
              alt: '服務展示圖片',
              link: null
            }
          ],
          detailedDescription: serviceData.detailedDescription || `
            <h3>服務說明：</h3>
            <p>${serviceData.description}</p>
            
            <h3>服務內容：</h3>
            <ul>
              <li>專業服務提供</li>
              <li>高品質交付</li>
              <li>完整售後服務</li>
            </ul>
          `,
          seller: serviceData.seller && typeof serviceData.seller === 'object' 
            ? serviceData.seller 
            : {
                name: serviceData.seller || '專業服務者',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
                rating: serviceData.rating,
                reviews: serviceData.reviews,
                responseTime: '2小時內',
                completedProjects: Math.floor(Math.random() * 100) + 50,
                memberSince: '2021年',
                skills: serviceData.tags || [],
                bio: '專業服務提供者，致力於為客戶提供高品質的服務。'
              }
        };
        setService(enhancedService);
      }
    }
  }, [category, serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-primary-600">載入中...</p>
        </div>
      </div>
    );
  }

  const selectedMedia = service.media[selectedImageIndex];

  const handleMediaClick = (link) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* 導航麵包屑 */}
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
              to={`/services/${encodeURIComponent(category)}`} 
              className="hover:text-primary-800 transition-colors"
            >
              {decodeURIComponent(category)}
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-primary-800 font-medium">{service.title}</span>
          </div>
        </div>
      </nav>

      <div className="container-sm pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左側 - 媒體展示區 */}
          <div className="lg:col-span-2">
            {/* 主要圖片/影片 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
              <div className="relative aspect-video">
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.alt}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleMediaClick(selectedMedia.link)}
                />
                {selectedMedia.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <button 
                      onClick={() => handleMediaClick(selectedMedia.link)}
                      className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all"
                    >
                      <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                  </div>
                )}
                {selectedMedia.link && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                      點擊查看更多
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 縮圖選擇器 */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {service.media.map((media, index) => (
                <div key={index} className="relative flex-shrink-0">
                  <img
                    src={media.thumbnail}
                    alt={media.alt}
                    className={`w-20 h-14 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-primary-500 opacity-100'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                  {media.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 右側 - 服務資訊 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              {/* 服務名稱 */}
              <h1 className="text-2xl font-bold text-primary-800 mb-4">
                {service.title}
              </h1>

              {/* 標籤 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {service.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 評分 */}
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(service.rating)
                          ? 'text-warning-500'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-primary-600">
                  {service.rating} ({service.reviews} 評價)
                </span>
              </div>

              {/* 價格 */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-accent-600 mb-2">
                  NT$ {service.price.toLocaleString()}
                </div>
                <div className="text-sm text-primary-500">
                  預計完成時間：{service.deliveryTime}
                </div>
              </div>

              {/* 下單按鈕 */}
              <button className="w-full btn-primary mb-4">
                立即下單
              </button>

              <button 
                onClick={() => {
                  // 檢查用戶是否已登入
                  const isRealUser = user && !user.isAnonymous && !user.isTemporary && user.email;
                  if (!isRealUser) {
                    alert('請先登入以使用私訊功能');
                    navigate('/login');
                    return;
                  }
                  navigate(`/chat?creatorId=${service.seller.name.replace(/\s+/g, '-').toLowerCase()}&creatorName=${encodeURIComponent(service.seller.name)}`);
                }}
                className="w-full border border-primary-200 text-primary-600 py-3 rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                聯絡創作者
              </button>
            </div>
          </div>
        </div>

        {/* 服務詳細說明 */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 服務說明 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-xl font-bold text-primary-800 mb-6">服務說明</h2>
              <div 
                className="prose prose-primary max-w-none"
                dangerouslySetInnerHTML={{ __html: service.detailedDescription }}
              />
            </div>
          </div>

          {/* 創作者資訊 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-primary-800 mb-4">關於創作者</h3>
              
              <div className="flex items-center mb-4">
                <Link 
                  to={`/creator/${service.seller.name.replace(/\s+/g, '-').toLowerCase()}`}
                  className="flex items-center hover:opacity-80 transition-opacity"
                >
                  <img
                    src={service.seller.avatar}
                    alt={service.seller.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-primary-800 hover:text-accent-600 transition-colors">
                      {service.seller.name}
                    </h4>
                    <div className="flex items-center text-sm text-primary-600">
                      <svg className="w-4 h-4 text-warning-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {service.seller.rating} ({service.seller.reviews})
                    </div>
                  </div>
                </Link>
              </div>

              {/* 統計資訊 */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="text-center p-3 bg-cream-50 rounded-lg">
                  <div className="font-semibold text-primary-800">{service.seller.completedProjects}</div>
                  <div className="text-primary-600">完成項目</div>
                </div>
                <div className="text-center p-3 bg-cream-50 rounded-lg">
                  <div className="font-semibold text-primary-800">{service.seller.responseTime}</div>
                  <div className="text-primary-600">回應時間</div>
                </div>
              </div>

              {/* 技能標籤 */}
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-primary-700 mb-2">專業技能</h5>
                <div className="flex flex-wrap gap-2">
                  {service.seller.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* 簡介 */}
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-primary-700 mb-2">創作者簡介</h5>
                <p className="text-sm text-primary-600 leading-relaxed">
                  {service.seller.bio}
                </p>
              </div>

              {/* 加入時間 */}
              <div className="text-xs text-primary-500 mb-4">
                加入時間：{service.seller.memberSince}
              </div>

              {/* 查看完整檔案按鈕 */}
              <Link 
                to={`/creator/${service.seller.name.replace(/\s+/g, '-').toLowerCase()}`}
                className="block w-full bg-accent-500 hover:bg-accent-600 text-white text-center py-2 px-4 rounded-lg transition-colors font-medium"
              >
                查看完整檔案
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
