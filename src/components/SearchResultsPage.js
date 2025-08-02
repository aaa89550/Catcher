import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchServices } from '../firebase/firestore';

const SearchResultsPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState('all');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 可選標籤
  const availableTags = [
    '設計', '開發', '文案', '行銷', '翻譯', '影音',
    '攝影', '插畫', 'UI/UX', 'SEO', '社群', '品牌'
  ];

  // 從 URL 參數獲取搜尋條件
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const term = params.get('q') || '';
    const tags = params.get('tags') ? params.get('tags').split(',') : [];
    
    setSearchTerm(term);
    setSelectedTags(tags);
  }, [location]);

  // 執行搜尋
  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const results = await searchServices(searchTerm, selectedTags, {
          priceRange,
          sortBy
        });
        setSearchResults(results);
      } catch (err) {
        setError('搜尋失敗，請稍後再試');
        console.error('搜尋失敗:', err);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [searchTerm, selectedTags, sortBy, priceRange]);

  // 重新搜尋
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchServices(searchTerm, selectedTags, {
        priceRange,
        sortBy
      });
      setSearchResults(results);
    } catch (err) {
      setError('搜尋失敗，請稍後再試');
      console.error('搜尋失敗:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 搜尋欄位 */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="container-sm px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* 搜尋輸入框 */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="搜尋服務..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={handleSearch}
                className="ml-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                搜尋
              </button>
            </div>

            {/* 快速篩選 */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              >
                <option value="relevance">相關性</option>
                <option value="price-low">價格低到高</option>
                <option value="price-high">價格高到低</option>
                <option value="rating">評分高到低</option>
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              >
                <option value="all">所有價格</option>
                <option value="low">$10,000以下</option>
                <option value="mid">$10,000-$20,000</option>
                <option value="high">$20,000以上</option>
              </select>
            </div>
          </div>

          {/* 標籤過濾 */}
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  disabled={!selectedTags.includes(tag) && selectedTags.length >= 3}
                  className={`px-3 py-1 text-xs rounded-full border transition-all duration-200 ${
                    selectedTags.includes(tag)
                      ? 'bg-primary-600 text-white border-primary-600'
                      : selectedTags.length >= 3
                      ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-primary-50 hover:border-primary-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 搜尋結果 */}
      <section className="container-sm px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            搜尋結果 ({searchResults.length})
          </h1>
          
          {(searchTerm || selectedTags.length > 0) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTags([]);
                handleSearch();
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              清除篩選
            </button>
          )}
        </div>

        {/* 載入狀態 */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <span className="ml-3 text-gray-600">搜尋中...</span>
          </div>
        )}

        {/* 錯誤狀態 */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">搜尋出現問題</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={handleSearch}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              重新搜尋
            </button>
          </div>
        )}

        {/* 結果列表 */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={item.images?.[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                  <p className="text-sm text-gray-500 mb-3">by {item.creatorName}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-primary-600">
                      {item.currency === 'TWD' ? 'NT$ ' : '$'}{item.price?.toLocaleString()}
                    </span>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                      <span className="text-xs text-gray-400 ml-1">({item.reviewCount})</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {item.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 無結果提示 */}
        {!loading && !error && searchResults.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">找不到相關服務</h3>
            <p className="text-gray-500 mb-4">請嘗試調整搜尋條件或標籤</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTags([]);
                setPriceRange('all');
                setSortBy('relevance');
                handleSearch();
              }}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              重設所有篩選
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchResultsPage;
