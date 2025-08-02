import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ref, set } from 'firebase/database';
import { realtimeDb } from '../firebase/config';

const BecomeCreatorPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    skills: '',
    experience: '',
    portfolio: '',
    responseTime: '24小時內',
    specialties: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('請先登入');
      return;
    }

    setLoading(true);
    try {
      console.log('🎯 開始創建創作者資料');
      
      const creatorData = {
        userId: user.uid,
        displayName: formData.displayName || user.displayName || '創作者',
        email: user.email,
        bio: formData.bio,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
        experience: formData.experience,
        portfolio: formData.portfolio,
        responseTime: formData.responseTime,
        specialties: formData.specialties.split(',').map(spec => spec.trim()).filter(spec => spec),
        rating: 5.0,
        reviews: 0,
        completedProjects: 0,
        memberSince: new Date().getFullYear().toString(),
        avatar: user.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        verified: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      // 保存到 Realtime Database
      await set(ref(realtimeDb, `creators/${user.uid}`), creatorData);
      
      console.log('✅ 創作者資料創建成功');
      alert('恭喜！您已成功成為創作者，現在可以上架服務了！');
      navigate('/upload-service');
      
    } catch (error) {
      console.error('❌ 創建創作者資料失敗:', error);
      alert('創建失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-700 mb-4">請先登入</h2>
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

  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-700 mb-2">成為創作者</h1>
            <p className="text-primary-600">完善您的資料，開始提供專業服務</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 顯示名稱 */}
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                顯示名稱 *
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                required
                placeholder="您的專業名稱"
                className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* 個人簡介 */}
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                個人簡介 *
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="介紹您的專業背景和經驗..."
                className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* 專業技能 */}
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                專業技能 *
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                required
                placeholder="請用逗號分隔，例如：網頁設計, UI/UX, 平面設計"
                className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* 工作經驗 */}
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                工作經驗
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                rows={3}
                placeholder="描述您的相關工作經驗..."
                className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* 作品集連結 */}
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                作品集連結
              </label>
              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleInputChange}
                placeholder="https://yourportfolio.com"
                className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* 回應時間 */}
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                預期回應時間
              </label>
              <select
                name="responseTime"
                value={formData.responseTime}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="1小時內">1小時內</option>
                <option value="3小時內">3小時內</option>
                <option value="6小時內">6小時內</option>
                <option value="12小時內">12小時內</option>
                <option value="24小時內">24小時內</option>
                <option value="2天內">2天內</option>
              </select>
            </div>

            {/* 專業領域 */}
            <div>
              <label className="block text-sm font-medium text-primary-700 mb-2">
                專業領域
              </label>
              <input
                type="text"
                name="specialties"
                value={formData.specialties}
                onChange={handleInputChange}
                placeholder="請用逗號分隔，例如：電商設計, 品牌識別, 響應式網站"
                className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* 提交按鈕 */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 px-6 py-3 border border-primary-300 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {loading ? '創建中...' : '成為創作者'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeCreatorPage;
