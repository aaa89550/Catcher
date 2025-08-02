import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ref, push, set } from 'firebase/database';
import { realtimeDb } from '../firebase/config';

const FirebaseTestPage = () => {
  const { user } = useAuth();
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testDatabaseConnection = async () => {
    setLoading(true);
    setTestResult('測試中...');
    
    try {
      if (!user) {
        setTestResult('❌ 用戶未登錄');
        return;
      }

      // 測試寫入權限
      const testRef = ref(realtimeDb, `test/${user.uid}`);
      await set(testRef, {
        message: 'Hello Firebase!',
        timestamp: Date.now(),
        user: user.uid
      });

      setTestResult('✅ Firebase Realtime Database 連接成功！用戶可以正常寫入數據。');
      
    } catch (error) {
      console.error('Firebase 測試失敗:', error);
      setTestResult(`❌ Firebase 測試失敗: ${error.code} - ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testServiceCreation = async () => {
    setLoading(true);
    setTestResult('測試服務創建...');
    
    try {
      if (!user) {
        setTestResult('❌ 用戶未登錄');
        return;
      }

      const testService = {
        title: '測試服務',
        description: '這是一個測試服務',
        category: 'test',
        price: 1000,
        currency: 'TWD',
        creatorId: user.uid,
        creatorName: user.displayName || user.email,
        creatorAvatar: user.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        tags: ['測試'],
        images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'],
        rating: 0,
        reviewCount: 0,
        featured: false,
        published: true,
        deliveryDays: 7,
        revisions: 3,
        status: 'active',
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      const servicesRef = ref(realtimeDb, 'services');
      const result = await push(servicesRef, testService);
      
      setTestResult(`✅ 測試服務創建成功！服務 ID: ${result.key}`);
      
    } catch (error) {
      console.error('服務創建測試失敗:', error);
      setTestResult(`❌ 服務創建測試失敗: ${error.code} - ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Firebase 連接測試</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">用戶狀態</h2>
          {user ? (
            <div className="text-green-600">
              <p>✅ 用戶已登錄</p>
              <p>UID: {user.uid}</p>
              <p>Email: {user.email}</p>
              <p>名稱: {user.displayName || '未設置'}</p>
            </div>
          ) : (
            <p className="text-red-600">❌ 用戶未登錄</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Firebase 測試</h2>
          
          <div className="space-y-4">
            <button
              onClick={testDatabaseConnection}
              disabled={loading || !user}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              測試 Realtime Database 連接
            </button>
            
            <button
              onClick={testServiceCreation}
              disabled={loading || !user}
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
            >
              測試服務創建
            </button>
          </div>
          
          {testResult && (
            <div className="mt-4 p-4 bg-gray-100 rounded border">
              <h3 className="font-semibold mb-2">測試結果：</h3>
              <p className="whitespace-pre-wrap">{testResult}</p>
            </div>
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Firebase 規則檢查</h3>
          <p className="text-yellow-700 text-sm">
            如果測試失敗，請檢查 Firebase Console 中的：
            <br />1. Realtime Database 規則 (database/rules)
            <br />2. Storage 規則 (storage/rules)
            <br />3. 確保已啟用 Authentication
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirebaseTestPage;
