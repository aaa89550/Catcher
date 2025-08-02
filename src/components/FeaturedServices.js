import React, { useState, useEffect } from 'react';
import { getFeaturedServices } from '../firebase/firestore';

// 預設精選服務數據（作為後備）
const defaultServices = [
  {
    id: 'default-1',
    title: '專業網頁設計服務',
    description: '提供響應式網頁設計，包含 UI/UX 設計',
    price: 25000,
    rating: 4.8,
    reviewCount: 24,
    creatorName: '設計師小王',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop']
  },
  {
    id: 'default-2',
    title: '品牌Logo設計',
    description: '專業品牌識別設計，包含Logo、名片設計',
    price: 8000,
    rating: 4.9,
    reviewCount: 32,
    creatorName: '創意工作室',
    creatorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b632?w=150&h=150&fit=crop&crop=face',
    images: ['https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop']
  }
];

const FeaturedServices = () => {
  const [featuredServices, setFeaturedServices] = useState(defaultServices); // 設置預設值
  const [loading, setLoading] = useState(false); // 改為 false，立即顯示預設內容
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFeaturedServices = async () => {
      try {
        const services = await getFeaturedServices();
        if (services && services.length > 0) {
          setFeaturedServices(services); // 只有在有數據時才更新
        }
      } catch (err) {
        setError('載入精選服務失敗');
        console.error('載入精選服務失敗:', err);
        // 保留預設服務，不設置錯誤狀態
      }
      // 移除 loading 狀態設置，因為我們已經有預設內容
    };

    loadFeaturedServices();
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

        {/* 水平滾動容器 */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="flex-none w-52 bg-white border border-primary-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 cursor-pointer snap-start"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
