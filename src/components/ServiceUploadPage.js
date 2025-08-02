import React, { useState, useEffect } from 'react';
import { ref, push, get } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { realtimeDb, storage } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ServiceUploadPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [isCreator, setIsCreator] = useState(false);
  const [checkingCreator, setCheckingCreator] = useState(true);
  const [creatorData, setCreatorData] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detailedDescription: '',
    category: '平面設計',
    price: '',
    currency: 'TWD',
    deliveryDays: 7,
    revisions: 3,
    tags: '',
    requirements: '',
    features: '',
    featured: false,
    published: true // 預設為立即發布
  });
  
  const [coverImage, setCoverImage] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaLinks, setMediaLinks] = useState(['']);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const categories = [
    { value: '平面設計', label: '平面設計' },
    { value: '網頁設計', label: '網頁設計' },
    { value: '程式開發', label: '程式開發' },
    { value: '行銷企劃', label: '行銷企劃' },
    { value: '文案撰寫', label: '文案撰寫' },
    { value: '影音製作', label: '影音製作' },
    { value: '翻譯服務', label: '翻譯服務' },
    { value: '影音剪輯', label: '影音剪輯' },
    { value: '攝影服務', label: '攝影服務' }
  ];

  // 檢查是否為創作者
  useEffect(() => {
    const checkCreatorStatus = async () => {
      if (!user) {
        setCheckingCreator(false);
        return;
      }

      try {
        console.log('🔍 檢查創作者狀態');
        const creatorRef = ref(realtimeDb, `creators/${user.uid}`);
        const snapshot = await get(creatorRef);
        
        if (snapshot.exists()) {
          console.log('✅ 用戶是創作者');
          setIsCreator(true);
          setCreatorData(snapshot.val());
        } else {
          console.log('❌ 用戶不是創作者');
          setIsCreator(false);
        }
      } catch (error) {
        console.error('❌ 檢查創作者狀態失敗:', error);
        setIsCreator(false);
      } finally {
        setCheckingCreator(false);
      }
    };

    checkCreatorStatus();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setCoverImage(file);
    } else {
      alert('請選擇有效的圖片檔案');
    }
  };

  const handleMediaFilesChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      return file.type.startsWith('image/') || file.type.startsWith('video/');
    });
    
    if (validFiles.length + mediaFiles.length > 4) {
      alert('最多只能上傳 4 個媒體檔案');
      return;
    }
    
    setMediaFiles(prev => [...prev, ...validFiles].slice(0, 4));
  };

  const handleMediaLinkChange = (index, value) => {
    const newLinks = [...mediaLinks];
    newLinks[index] = value;
    setMediaLinks(newLinks);
  };

  const addMediaLink = () => {
    if (mediaLinks.length < 4) {
      setMediaLinks([...mediaLinks, '']);
    }
  };

  const removeMediaLink = (index) => {
    setMediaLinks(mediaLinks.filter((_, i) => i !== index));
  };

  const removeMediaFile = (index) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  const uploadFile = async (file, path) => {
    const fileRef = storageRef(storage, path);
    const snapshot = await uploadBytes(fileRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('請先登入才能發布服務');
      return;
    }

    if (!formData.title || !formData.description || !formData.price) {
      alert('請填寫所有必要欄位');
      return;
    }

    if (!coverImage) {
      alert('請上傳封面圖片');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // 上傳封面圖片
      setUploadProgress(20);
      console.log('開始上傳封面圖片...');
      const coverImageUrl = await uploadFile(
        coverImage, 
        `services/${user.uid}/${Date.now()}_cover_${coverImage.name}`
      );
      console.log('封面圖片上傳成功:', coverImageUrl);

      // 上傳媒體檔案
      setUploadProgress(40);
      console.log('開始上傳媒體檔案...');
      const mediaUrls = [];
      for (let i = 0; i < mediaFiles.length; i++) {
        const file = mediaFiles[i];
        console.log(`上傳媒體檔案 ${i + 1}/${mediaFiles.length}:`, file.name);
        const url = await uploadFile(
          file, 
          `services/${user.uid}/${Date.now()}_media_${i}_${file.name}`
        );
        mediaUrls.push(url);
        setUploadProgress(40 + (i + 1) * 20 / mediaFiles.length);
        console.log(`媒體檔案 ${i + 1} 上傳成功:`, url);
      }

      // 過濾有效的媒體連結
      const validLinks = mediaLinks.filter(link => link.trim() !== '');

      // 準備服務數據
      setUploadProgress(80);
      const serviceData = {
        ...formData,
        price: parseInt(formData.price),
        deliveryDays: parseInt(formData.deliveryDays),
        revisions: parseInt(formData.revisions),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        features: formData.features.split('\n').map(feature => feature.trim()).filter(feature => feature !== ''),
        requirements: formData.requirements.split('\n').map(req => req.trim()).filter(req => req !== ''),
        creatorId: user.uid,
        creatorName: creatorData?.displayName || user.displayName || user.email,
        creatorAvatar: creatorData?.avatar || user.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        // 使用創作者資料
        seller: {
          name: creatorData?.displayName || user.displayName || user.email,
          avatar: creatorData?.avatar || user.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          bio: creatorData?.bio || '專業服務提供者',
          skills: creatorData?.skills || [],
          rating: creatorData?.rating || 5.0,
          reviews: creatorData?.reviews || 0,
          completedProjects: creatorData?.completedProjects || 0,
          responseTime: creatorData?.responseTime || '24小時內',
          memberSince: creatorData?.memberSince || new Date().getFullYear().toString(),
          verified: creatorData?.verified || false,
          portfolio: creatorData?.portfolio || ''
        },
        images: [coverImageUrl, ...mediaUrls],
        mediaLinks: validLinks,
        rating: 0,
        reviewCount: 0,
        status: 'active',
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      // 儲存到 Realtime Database
      setUploadProgress(90);
      console.log('開始儲存到 Realtime Database...', serviceData);
      const servicesRef = ref(realtimeDb, 'services');
      const result = await push(servicesRef, serviceData);
      console.log('儲存到 Realtime Database 成功:', result.key);

      setUploadProgress(100);
      alert('服務發布成功！');
      navigate('/');
      
    } catch (error) {
      console.error('發布服務失敗:', error);
      console.error('錯誤詳情:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      
      let errorMessage = '發布服務失敗：';
      if (error.code === 'storage/unauthorized') {
        errorMessage += '文件上傳權限不足，請檢查 Firebase Storage 規則';
      } else if (error.code === 'permission-denied') {
        errorMessage += 'Realtime Database 權限不足，請檢查數據庫規則';
      } else if (error.code === 'network-request-failed') {
        errorMessage += '網絡連接失敗，請檢查網絡連接';
      } else {
        errorMessage += error.message || '未知錯誤';
      }
      
      alert(errorMessage);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">請先登入</h2>
          <p className="text-gray-600 mb-6">您需要登入才能發布服務</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
          >
            前往登入
          </button>
        </div>
      </div>
    );
  }

  if (checkingCreator) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">檢查創作者狀態中...</p>
        </div>
      </div>
    );
  }

  if (!isCreator) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-primary-700 mb-4">成為創作者</h2>
            <p className="text-gray-600 mb-6">
              您需要先成為創作者才能上架服務。完善您的創作者資料，開始提供專業服務。
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/become-creator')}
                className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                成為創作者
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full border border-primary-300 text-primary-700 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors"
              >
                返回首頁
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-primary-800 mb-8">發布新服務</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          {/* 基本資訊 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">基本資訊</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  服務標題 *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="輸入服務標題"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  服務類別 *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                服務描述 *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="簡短描述您的服務內容（顯示在列表中）"
                required
              />
            </div>

            {/* 詳細描述 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                詳細服務說明
              </label>
              <textarea
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="詳細說明服務內容、流程、交付物等..."
              />
            </div>

            {/* 服務特色 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                服務特色
              </label>
              <textarea
                name="features"
                value={formData.features}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="請用換行分隔特色，例如：&#10;- 100% 原創設計&#10;- 無限次修改&#10;- 快速交付"
              />
            </div>

            {/* 客戶需求 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                客戶需要提供的資料
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="請說明客戶需要提供什麼資料或資源，例如：&#10;- 公司Logo&#10;- 品牌色彩偏好&#10;- 參考網站"
              />
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                標籤 (用逗號分隔)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="例如：設計, UI/UX, 網頁"
              />
            </div>
          </div>

          {/* 價格和條件 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">價格和條件</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  價格 (TWD) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="1000"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  交付天數
                </label>
                <input
                  type="number"
                  name="deliveryDays"
                  value={formData.deliveryDays}
                  onChange={handleInputChange}
                  min="1"
                  max="30"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  修改次數
                </label>
                <input
                  type="number"
                  name="revisions"
                  value={formData.revisions}
                  onChange={handleInputChange}
                  min="0"
                  max="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* 媒體上傳 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">媒體檔案</h2>
            
            {/* 封面圖片 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                封面圖片 *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              {coverImage && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(coverImage)}
                    alt="封面預覽"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
            
            {/* 其他媒體檔案 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                其他媒體檔案 (最多 4 個)
              </label>
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleMediaFilesChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {mediaFiles.length > 0 && (
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                  {mediaFiles.map((file, index) => (
                    <div key={index} className="relative">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`媒體 ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      ) : (
                        <video
                          src={URL.createObjectURL(file)}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => removeMediaFile(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* 媒體連結 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                媒體連結 (YouTube, Vimeo 等)
              </label>
              {mediaLinks.map((link, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => handleMediaLinkChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                  <button
                    type="button"
                    onClick={() => removeMediaLink(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    移除
                  </button>
                </div>
              ))}
              {mediaLinks.length < 4 && (
                <button
                  type="button"
                  onClick={addMediaLink}
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  + 添加連結
                </button>
              )}
            </div>
          </div>

          {/* 發布設定 */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">發布設定</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                  設為精選服務
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="published" className="ml-2 text-sm text-gray-700">
                  立即發布 (取消勾選將儲存為草稿)
                </label>
              </div>
            </div>
          </div>

          {/* 提交按鈕 */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? `上傳中... ${uploadProgress}%` : '發布服務'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceUploadPage;
