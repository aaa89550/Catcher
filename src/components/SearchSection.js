import React, { useState } from 'react';

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('搜尋:', searchTerm);
  };

  return (
    <section className="bg-gradient-to-r from-primary-500 to-secondary-500 py-8 md:py-16">
      <div className="container-xs px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
          找到最適合的專業服務
        </h1>
        <p className="text-primary-100 mb-4 md:mb-6 text-sm md:text-base">
          連接優秀的專業人才，實現您的專案夢想
        </p>
        
        <form onSubmit={handleSearch} className="max-w-xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="搜尋服務（例如：網頁設計、文案撰寫、翻譯...）"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 input-mobile px-4 py-3 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-300 text-sm md:text-base"
            />
            <button
              type="submit"
              className="btn-mobile btn-accent px-6 py-3 font-medium rounded-md text-white hover:bg-accent-600 transition-colors"
            >
              搜尋
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchSection;
