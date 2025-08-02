import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import ServiceCategories from './components/ServiceCategories';
import FeaturedServices from './components/FeaturedServices';
import Footer from './components/Footer';
import ServiceCategoryPage from './components/ServiceCategoryPage';
import ServiceDetailPage from './components/ServiceDetailPage';
import CreatorPage from './components/CreatorPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ChatPage from './components/ChatPage';
import SearchResultsPage from './components/SearchResultsPage';
import HeroBanner from './components/HeroBanner';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { initializeServices, initializeCreators, initializeReviews } from './firebase/initData';
import './styles/mobile.css';

// 首頁組件
const HomePage = () => (
  <main>
    <HeroBanner />
    <SearchSection />
    <ServiceCategories />
    <FeaturedServices />
  </main>
);

// 應用內容組件
const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-xl font-medium text-gray-700 mb-2">正在初始化應用程式</h2>
          <p className="text-gray-500">請稍候片刻...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/services/:category" element={<ServiceCategoryPage />} />
        <Route path="/services/:category/:serviceId" element={<ServiceDetailPage />} />
        <Route path="/creator/:creatorId" element={<CreatorPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

function App() {
  const basename = process.env.NODE_ENV === 'production' ? '/Catcher' : '';
  
  // 初始化 Firebase 數據（僅在開發環境執行一次）
  useEffect(() => {
    const initFirebaseData = async () => {
      // 檢查是否已經初始化過
      const initialized = localStorage.getItem('firebase_data_initialized');
      if (initialized) return;

      try {
        console.log('開始初始化 Firebase 數據...');
        
        await initializeServices();
        console.log('✓ 服務數據初始化完成');
        
        await initializeCreators();
        console.log('✓ 創作者數據初始化完成');
        
        await initializeReviews();
        console.log('✓ 評價數據初始化完成');
        
        localStorage.setItem('firebase_data_initialized', 'true');
        console.log('🎉 所有數據初始化完成！');
      } catch (error) {
        console.error('❌ 初始化失敗:', error);
      }
    };

    // 只在開發環境初始化
    if (process.env.NODE_ENV === 'development') {
      initFirebaseData();
    }
  }, []);
  
  return (
    <AuthProvider>
      <Router basename={basename}>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
