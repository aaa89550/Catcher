import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServicesByCategory, getAllServices } from '../firebase/firestore';

const ServiceCategoryPage = () => {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(decodeURIComponent(category || '平面設計'));
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false); // 手機版篩選器狀態
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false); // 改為 false，立即顯示頁面
  const [error, setError] = useState(null);
  const [availableTags, setAvailableTags] = useState([]);

  // 當 URL 參數改變時更新選中的分類
  useEffect(() => {
    if (category) {
      setSelectedCategory(decodeURIComponent(category));
    }
  }, [category]);

  // 獲取服務數據
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true); // 設置載入狀態，但不阻塞頁面
        setError(null);
        
        let categoryServices = [];
        if (selectedCategory === '全部') {
          categoryServices = await getAllServices();
        } else {
          categoryServices = await getServicesByCategory(selectedCategory);
        }
        
        // 只有在有數據時才更新，否則保持現有狀態
        if (categoryServices && categoryServices.length > 0) {
          setServices(categoryServices);
          
          // 提取可用標籤
          const tags = new Set();
          categoryServices.forEach(service => {
            service.tags?.forEach(tag => tags.add(tag));
          });
          setAvailableTags(Array.from(tags));
        } else {
          // 如果沒有數據，設置空陣列但不顯示錯誤
          setServices([]);
          setAvailableTags([]);
        }
        
      } catch (err) {
        console.error('載入服務失敗:', err);
        setError('載入服務失敗');
        // 保持現有數據，不清空
      } finally {
        setLoading(false); // 完成載入
      }
    };

    loadServices();
  }, [selectedCategory]);

  // 服務分類
  const categories = [
    '平面設計',
    '網頁設計',
    '程式開發',
    '行銷企劃',
    '文案撰寫',
    '影音製作',
    '翻譯服務',
    '影音剪輯',
    '攝影服務',
  ];

  // 分類封面圖片對應
  const categoryCovers = {
    '平面設計': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=300&fit=crop',
    '網頁設計': 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=300&fit=crop',
    '程式開發': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=300&fit=crop',
    '行銷企劃': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=300&fit=crop',
    '文案撰寫': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=300&fit=crop',
    '影音製作': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=300&fit=crop',
    '商業諮詢': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=300&fit=crop',
    '教育培訓': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=300&fit=crop',
    '翻譯服務': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=300&fit=crop'
  };

  // 篩選器組件
  const FilterContent = ({ isMobile = false }) => (
    <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
      {isMobile && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">篩選服務</h3>
          <button
            onClick={() => setMobileFilterOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* 搜尋框 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-primary-700 mb-2">
          搜尋服務
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="輸入關鍵字搜尋..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent input-mobile"
          />
          <svg className="absolute left-3 top-2.5 h-5 w-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* 服務分類 */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-primary-700 mb-3">服務分類</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/services/${encodeURIComponent(cat)}`}
              onClick={() => isMobile && setMobileFilterOpen(false)}
              className={`block w-full text-left px-3 py-2 rounded-lg transition-colors touch-feedback ${
                selectedCategory === cat
                  ? 'bg-primary-100 text-primary-800 font-medium'
                  : 'text-primary-600 hover:bg-primary-50'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* 價格篩選 */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-primary-700 mb-3">價格範圍</h3>
        <div className="space-y-4">
          {/* 價格顯示 */}
          <div className="flex justify-between text-sm text-primary-600">
            <span>NT$ {priceRange[0].toLocaleString()}</span>
            <span>NT$ {priceRange[1].toLocaleString()}</span>
          </div>
          
          {/* 雙軸拉條 */}
          <div className="relative">
            {/* 軌道 */}
            <div className="h-2 bg-primary-100 rounded-full"></div>
            
            {/* 選中範圍 */}
            <div 
              className="absolute h-2 bg-primary-500 rounded-full top-0"
              style={{
                left: `${(priceRange[0] / 200000) * 100}%`,
                width: `${((priceRange[1] - priceRange[0]) / 200000) * 100}%`
              }}
            ></div>
            
            {/* 最小值拉條 */}
            <input
              type="range"
              min="0"
              max="200000"
              step="1000"
              value={priceRange[0]}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value <= priceRange[1]) {
                  setPriceRange([value, priceRange[1]]);
                }
              }}
              className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer top-0 slider-thumb"
            />
            
            {/* 最大值拉條 */}
            <input
              type="range"
              min="0"
              max="200000"
              step="1000"
              value={priceRange[1]}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= priceRange[0]) {
                  setPriceRange([priceRange[0], value]);
                }
              }}
              className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer top-0 slider-thumb"
            />
          </div>
          
          {/* 預設選項 */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: '5000以下', range: [0, 5000] },
              { label: '5000-20000', range: [5000, 20000] },
              { label: '20000-50000', range: [20000, 50000] },
              { label: '50000以上', range: [50000, 200000] }
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => setPriceRange(preset.range)}
                className="px-3 py-1 text-xs border border-primary-200 rounded-full hover:bg-primary-50 transition-colors btn-mobile"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 標籤篩選 */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-primary-700 mb-3">
          服務標籤 ({selectedTags.length}/3)
        </h3>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              disabled={!selectedTags.includes(tag) && selectedTags.length >= 3}
              className={`px-3 py-1 text-xs rounded-full transition-colors btn-mobile ${
                selectedTags.includes(tag)
                  ? 'bg-accent-100 text-accent-800 border border-accent-200'
                  : 'bg-white border border-primary-200 text-primary-600 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        {selectedTags.length > 0 && (
          <button
            onClick={() => setSelectedTags([])}
            className="mt-2 text-xs text-accent-600 hover:text-accent-800"
          >
            清除所有標籤
          </button>
        )}
      </div>

      {isMobile && (
        <div className="mt-6">
          <button
            onClick={() => setMobileFilterOpen(false)}
            className="w-full btn-mobile bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            查看 {filteredServices.length} 個結果
          </button>
        </div>
      )}
    </div>
  );

  // 標籤選擇處理
  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // 篩選服務
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = service.price >= priceRange[0] && service.price <= priceRange[1];
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => service.tags.includes(tag));
    
    return matchesSearch && matchesPrice && matchesTags;
  });

  return (
    <div className="min-h-screen bg-cream-50">
      {/* 分類封面 Banner */}
      <div 
        className="relative h-48 md:h-64 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${categoryCovers[selectedCategory]})`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">{selectedCategory}</h1>
            <p className="text-sm md:text-lg text-gray-100">
              {selectedCategory === '平面設計' && '專業設計服務，讓您的品牌形象更加出色'}
              {selectedCategory === '網頁設計' && '現代化網頁設計，提升您的線上形象'}
              {selectedCategory === '程式開發' && '專業程式開發，打造高效能的數位解決方案'}
              {selectedCategory === '行銷企劃' && '全方位行銷策略，助您拓展業務版圖'}
              {selectedCategory === '文案撰寫' && '創意文案撰寫，用文字打動您的客戶'}
              {selectedCategory === '影音製作' && '專業影音製作，傳達您的品牌故事'}
              {selectedCategory === '商業諮詢' && '專業商業顧問，協助您做出最佳決策'}
              {selectedCategory === '教育培訓' && '專業教育培訓，提升您的技能與競爭力'}
              {selectedCategory === '翻譯服務' && '精準翻譯服務，跨越語言障礙'}
            </p>
          </div>
        </div>
      </div>

      {/* 頁面導航 */}
      <nav className="py-3 md:py-4">
        <div className="container-sm px-4">
          <div className="flex items-center space-x-2 text-sm text-primary-600">
            <Link to="/" className="hover:text-primary-800 transition-colors">
              首頁
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-primary-800 font-medium">{selectedCategory}</span>
          </div>
        </div>
      </nav>

      <div className="px-4">
        <div className="flex gap-0 md:gap-8 pb-8">
          {/* 桌面版左側邊欄 */}
          <aside className="hidden md:block w-64 bg-white rounded-xl shadow-sm h-fit ml-0 md:ml-16">
            <FilterContent />
          </aside>

          {/* 主要內容 */}
          <main className="flex-1 max-w-none md:max-w-6xl mr-0 md:mr-8">
            {/* 手機版篩選按鈕與統計 */}
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <div className="flex items-center gap-3">
                {/* 手機版篩選按鈕 */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="md:hidden btn-mobile px-3 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                  篩選
                </button>
                <div className="flex items-center gap-2">
                  <p className="text-primary-600 text-sm md:text-base">
                    找到 {filteredServices.length} 個{selectedCategory}服務
                  </p>
                  {loading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                  )}
                </div>
              </div>
              
              {/* 檢視模式切換 */}
              <div className="flex bg-primary-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('card')}
                  className={`px-2 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-colors ${
                    viewMode === 'card'
                      ? 'bg-white text-primary-800 shadow-sm'
                      : 'text-primary-600 hover:text-primary-800'
                  }`}
                >
                  <svg className="w-3 h-3 md:w-4 md:h-4 inline mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  卡片
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-2 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-primary-800 shadow-sm'
                      : 'text-primary-600 hover:text-primary-800'
                  }`}
                >
                  <svg className="w-3 h-3 md:w-4 md:h-4 inline mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  列表
                </button>
              </div>
            </div>

            {/* 服務列表 */}
            {viewMode === 'card' ? (
              // 卡片模式 - 手機版優化
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                {filteredServices.map((service) => (
                  <Link
                    key={service.id}
                    to={`/services/${encodeURIComponent(selectedCategory)}/${service.id}`}
                    className="creator-card-mobile bg-white border border-primary-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 md:p-4 cursor-pointer block"
                  >
                    {/* 圖片區域 */}
                    <div className="w-full h-24 md:h-28 bg-primary-50 rounded-lg mb-3 overflow-hidden">
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
                          <svg className="w-6 h-6 md:w-8 md:h-8 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* 服務資訊 */}
                    <h3 className="text-xs md:text-sm font-semibold text-primary-800 mb-2 line-clamp-2">
                      {service.title}
                    </h3>
                    <p className="text-[10px] md:text-xs text-primary-600 mb-2 line-clamp-2">
                      {service.description}
                    </p>
                    
                    {/* 標籤 */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {service.tags.slice(0, 1).map((tag) => (
                        <span key={tag} className="px-2 py-1 text-[10px] md:text-xs bg-accent-100 text-accent-700 rounded-full">
                          {tag}
                        </span>
                      ))}
                      {service.tags.length > 1 && (
                        <span className="px-2 py-1 text-[10px] md:text-xs bg-primary-100 text-primary-600 rounded-full">
                          +{service.tags.length - 1}
                        </span>
                      )}
                    </div>
                    
                    {/* 價格與評分 */}
                    <div className="flex justify-between items-center">
                      <div className="text-sm md:text-base font-bold text-accent-600">
                        NT$ {service.price.toLocaleString()}
                      </div>
                      <div className="flex items-center text-[10px] md:text-xs text-primary-600">
                        <svg className="w-3 h-3 text-warning-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {service.rating}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              // 列表模式 - 手機版優化
              <div className="space-y-3 md:space-y-4">
                {filteredServices.map((service) => (
                  <Link
                    key={service.id}
                    to={`/services/${encodeURIComponent(selectedCategory)}/${service.id}`}
                    className="bg-white border border-primary-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 md:p-6 cursor-pointer block"
                  >
                    <div className="flex gap-3 md:gap-6">
                      {/* 圖片 */}
                      <div className="w-20 h-16 md:w-32 md:h-24 bg-primary-50 rounded-lg flex-shrink-0 overflow-hidden">
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
                            <svg className="w-6 h-6 md:w-8 md:h-8 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      {/* 內容 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                          <h3 className="text-sm md:text-lg font-semibold text-primary-800 mb-1 md:mb-0">
                            {service.title}
                          </h3>
                          <div className="text-base md:text-xl font-bold text-accent-600 flex-shrink-0">
                            NT$ {service.price.toLocaleString()}
                          </div>
                        </div>
                        
                        <p className="text-xs md:text-sm text-primary-600 mb-2 md:mb-3 line-clamp-2">
                          {service.description}
                        </p>
                        
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div className="flex flex-wrap gap-1 md:gap-2">
                            {service.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="px-2 py-1 text-[10px] md:text-xs bg-accent-100 text-accent-700 rounded-full">
                                {tag}
                              </span>
                            ))}
                            {service.tags.length > 3 && (
                              <span className="px-2 py-1 text-[10px] md:text-xs bg-primary-100 text-primary-600 rounded-full">
                                +{service.tags.length - 3}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-[10px] md:text-xs text-primary-600">
                            <div className="flex items-center">
                              <svg className="w-3 h-3 md:w-4 md:h-4 text-warning-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              {service.rating} ({service.reviews})
                            </div>
                            <span className="hidden md:inline">{service.seller}</span>
                            <span className="hidden md:inline">{service.deliveryTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* 無結果提示 */}
            {filteredServices.length === 0 && (
              <div className="text-center py-8 md:py-12">
                <svg className="w-12 h-12 md:w-16 md:h-16 text-primary-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-base md:text-lg font-medium text-primary-700 mb-2">
                  {error ? '載入服務時發生錯誤' : '找不到符合條件的服務'}
                </h3>
                <p className="text-sm text-primary-500 mb-4">
                  {error ? error : '請嘗試調整搜尋條件或篩選器'}
                </p>
                {error && (
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    重新載入
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 手機版篩選抽屜 */}
      {mobileFilterOpen && (
        <>
          {/* 背景遮罩 */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 mobile-backdrop show"
            onClick={() => setMobileFilterOpen(false)}
          ></div>
          
          {/* 抽屜內容 */}
          <div className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 mobile-drawer open overflow-y-auto">
            <FilterContent isMobile={true} />
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceCategoryPage;
