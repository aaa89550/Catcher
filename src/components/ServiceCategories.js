import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCategories = () => {
  const categories = [
    {
      id: 1,
      title: '平面設計',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      description: 'LOGO、海報設計'
    },
    {
      id: 2,
      title: '網頁設計',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: '客製化網站設計'
    },
    {
      id: 3,
      title: '程式開發',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      description: '軟體應用開發'
    },
    {
      id: 4,
      title: '行銷企劃',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      description: 'SEO、社群行銷'
    },
    {
      id: 5,
      title: '文案撰寫',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      description: '廣告文案、內容創作'
    },
    {
      id: 6,
      title: '影音製作',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      description: '影片製作、剪輯'
    },
    {
      id: 9,
      title: '翻譯服務',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      description: '多語言翻譯'
    },
    {
      id: 7,
      title: '影音剪輯',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      description: '影片製作、剪輯'
    },
    {
      id: 8,
      title: '攝影服務',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      description: '商業攝影、活動紀錄'
    },
  ];

  return (
    <section className="py-12 bg-cream-50">
      <div className="container-sm">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-primary-800 mb-3">
            服務類型
          </h2>
          <p className="text-primary-600 text-sm">
            探索各種專業服務類別
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6 justify-items-center max-w-4xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/services/${encodeURIComponent(category.title)}`}
              className="service-card-mobile group flex flex-col items-center text-center p-3 md:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-[120px] md:max-w-none"
            >
              <div className="text-primary-600 mb-2 group-hover:text-primary-700 transition-all duration-300 flex-shrink-0">
                <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                  {React.cloneElement(category.icon, {
                    className: "w-5 h-5 md:w-8 md:h-8"
                  })}
                </div>
              </div>
              <h3 className="text-xs md:text-sm font-medium text-gray-800 mb-1 leading-tight">
                {category.title}
              </h3>
              <p className="text-[10px] md:text-xs text-gray-600 leading-tight hidden md:block">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
