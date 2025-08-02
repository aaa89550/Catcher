import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { realtimeDb } from '../firebase/config';

const FeaturedServices = () => {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const servicesRef = ref(realtimeDb, 'services');
    
    const unsubscribe = onValue(servicesRef, (snapshot) => {
      try {
        setLoading(true);
        const data = snapshot.val();
        if (data) {
          // 轉換為陣列並過濾出精選服務
          const servicesArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          
          const featured = servicesArray
            .filter(service => {
              const isPublished = service.published !== false;
              const isFeatured = service.featured === true;
              console.log(`🔍 服務 ${service.title}: published=${service.published}, featured=${service.featured}, 符合條件=${isPublished && isFeatured}`);
              return isPublished && isFeatured;
            })
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 6);
          
          console.log(`✅ FeaturedServices: 找到 ${featured.length} 個精選服務`);
          setFeaturedServices(featured);
        } else {
          setFeaturedServices([]);
        }
        setError(null);
      } catch (err) {
        console.error('載入精選服務失敗:', err);
        setError('載入服務失敗');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-8 md:py-10 bg-white">
      <div className="container-sm">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-primary-800 mb-2">
            精選服務
          </h2>
          <p className="text-base md:text-lg text-primary-600">
            熱門推薦的高品質服務
          </p>
        </div>

        {/* 載入中狀態 */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">載入精選服務中...</p>
          </div>
        )}

        {/* 錯誤狀態 */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
            >
              重試
            </button>
          </div>
        )}

        {/* 沒有服務時的狀態 */}
        {!loading && !error && featuredServices.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">目前沒有精選服務</p>
            <p className="text-sm text-gray-500">請點擊下方按鈕初始化數據</p>
          </div>
        )}

        {/* 水平滾動容器 */}
        {!loading && !error && featuredServices.length > 0 && (
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {featuredServices.map((service) => (
              <Link
                key={service.id}
                to={`/services/${encodeURIComponent(service.category || 'general')}/${service.id}`}
                className="flex-none w-52 bg-white border border-primary-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 cursor-pointer snap-start block no-underline"
              >
                {/* 圖片區域 */}
                <div className="w-full h-32 bg-primary-50 rounded-lg mb-3 overflow-hidden">
                  {service.images && service.images.length > 0 ? (
                    <img 
                      src={service.images[0]} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* 服務名稱 */}
                <h3 className="text-base font-semibold text-primary-800 mb-2 line-clamp-2">
                  {service.title}
                </h3>
                
                {/* 創作者 */}
                <p className="text-sm text-gray-600 mb-1">by {service.creatorName}</p>
                
                {/* 評分 */}
                <div className="flex items-center mb-2">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-sm text-gray-600 ml-1">{service.rating}</span>
                  <span className="text-xs text-gray-400 ml-1">({service.reviewCount})</span>
                </div>
                
                {/* 價格 */}
                <div className="text-lg font-bold text-accent-600">
                  {service.currency === 'TWD' ? 'NT$ ' : '$'}{service.price?.toLocaleString()}
                </div>
              </Link>
            ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedServices;
