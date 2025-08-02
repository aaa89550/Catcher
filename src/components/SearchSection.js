import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  // 可選標籤
  const availableTags = [
    '設計', '開發', '文案', '行銷', '翻譯', '影音',
    '攝影', '插畫', 'UI/UX', '社群', '品牌'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    
    // 構建搜尋參數
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));
    
    // 導航到搜尋結果頁
    navigate(`/search?${params.toString()}`);
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearTags = () => {
    setSelectedTags([]);
  };

  return (
    <section className="bg-amber-50 py-12 md:py-16">
      <div className="container-xs px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-primary-800 mb-4 md:mb-5">
          尋找最適合的專業服務
        </h2>
        <p className="text-primary-600 mb-6 md:mb-8 text-sm md:text-base">
          連接優秀的專業人才，實現您的專案夢想
        </p>
        
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8">
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
          
          {/* 標籤選擇區域 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-primary-600">選擇標籤（最多3個）：</span>
              {selectedTags.length > 0 && (
                <button
                  type="button"
                  onClick={clearTags}
                  className="text-xs text-primary-500 hover:text-primary-700 transition-colors"
                >
                  清除所有
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1 md:gap-2 justify-center search-tags-mobile">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  disabled={!selectedTags.includes(tag) && selectedTags.length >= 3}
                  className={`px-2 md:px-3 py-1 text-[10px] md:text-xs rounded-full border transition-all duration-200 ${
                    selectedTags.includes(tag)
                      ? 'bg-accent-500 text-white border-accent-500 shadow-sm'
                      : selectedTags.length >= 3
                      ? 'bg-primary-400 text-primary-200 border-primary-400 cursor-not-allowed opacity-50'
                      : 'bg-primary-400 text-primary-100 border-primary-300 hover:bg-accent-500 hover:text-white hover:border-accent-500'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            
            {/* 已選標籤顯示 */}
            {selectedTags.length > 0 && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs text-primary-600">已選擇：</span>
                <div className="flex gap-1">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-accent-600 text-white rounded-full flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className="ml-1 text-accent-200 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchSection;
