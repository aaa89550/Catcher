import React from 'react';

const FeaturedServices = () => {
  const featuredServices = [
    {
      id: 1,
      title: '企業網站設計開發',
      price: 'NT$ 25,000',
      image: null // 空白圖片，之後可以放真實圖片
    },
    {
      id: 2,
      title: '品牌LOGO設計',
      price: 'NT$ 8,000',
      image: null
    },
    {
      id: 3,
      title: '行銷文案撰寫',
      price: 'NT$ 3,500',
      image: null
    },
    {
      id: 4,
      title: '手機APP開發',
      price: 'NT$ 80,000',
      image: null
    },
    {
      id: 5,
      title: 'UI/UX設計',
      price: 'NT$ 15,000',
      image: null
    },
    {
      id: 6,
      title: '電商平台建置',
      price: 'NT$ 35,000',
      image: null
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-sm">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-800 mb-4">
            精選服務
          </h2>
          <p className="text-lg text-primary-600">
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
                {/* 圖片區域 (空白) */}
                <div className="w-full h-32 bg-primary-50 rounded-lg mb-3 flex items-center justify-center">
                  <svg className="w-10 h-10 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                
                {/* 服務名稱 */}
                <h3 className="text-base font-semibold text-primary-800 mb-2 line-clamp-2">
                  {service.title}
                </h3>
                
                {/* 價格 */}
                <div className="text-lg font-bold text-accent-600">
                  {service.price}
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
