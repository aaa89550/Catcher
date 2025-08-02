import React from 'react';
import { initializeAllRealtimeData, initializeSimpleData } from '../firebase/realtimeInit';
import { ref, set } from 'firebase/database';
import { realtimeDb } from '../firebase/config';

const InitDataButton = () => {
  const handleInit = async () => {
    try {
      console.log('開始完整初始化數據...');
      const result = await initializeAllRealtimeData();
      if (result) {
        alert('數據初始化成功！請重新載入頁面查看精選服務。');
        window.location.reload();
      } else {
        alert('數據初始化失敗，請檢查控制台錯誤訊息。');
      }
    } catch (error) {
      console.error('初始化錯誤:', error);
      alert(`數據初始化失敗：${error.message}`);
    }
  };

  const handleSimpleInit = async () => {
    console.log('🎯 InitDataButton: 開始簡化初始化數據...');
    
    try {
      console.log('📞 呼叫 initializeSimpleData...');
      const result = await initializeSimpleData();
      console.log('📊 initializeSimpleData 返回結果:', result);
      
      if (result) {
        console.log('🎉 簡化數據初始化成功！');
        alert('簡化數據初始化成功！請重新載入頁面查看。');
        window.location.reload();
      } else {
        console.log('😞 簡化數據初始化返回 false');
        alert('簡化數據初始化失敗，請檢查控制台錯誤訊息。');
      }
    } catch (error) {
      console.log('💥 InitDataButton: 捕獲到錯誤');
      console.error('錯誤詳情:', error);
      console.error('錯誤名稱:', error?.name);
      console.error('錯誤信息:', error?.message);
      console.error('錯誤代碼:', error?.code);
      
      alert(`簡化數據初始化失敗：${error?.message || error?.code || '未知錯誤'}`);
    }
  };

  const handleSimpleTest = async () => {
    console.log('🔧 開始執行簡單數據庫測試...');
    
    try {
      // 檢查 Firebase 配置
      console.log('🔍 檢查 Firebase 配置:');
      console.log('realtimeDb:', realtimeDb);
      console.log('realtimeDb 類型:', typeof realtimeDb);
      
      console.log('📝 準備測試數據...');
      const testData = {
        message: 'Hello from InitDataButton!',
        timestamp: Date.now(),
        test: true
      };
      console.log('測試數據:', testData);
      
      console.log('🔗 創建 Firebase 引用...');
      const testRef = ref(realtimeDb, 'test/simple');
      console.log('Firebase 引用:', testRef);
      console.log('引用路徑:', testRef.toString());
      
      console.log('💾 執行 set 操作...');
      const result = await set(testRef, testData);
      console.log('Set 操作結果:', result);
      
      console.log('✅ 簡單測試成功！');
      alert('簡單測試成功！數據庫連接正常。');
    } catch (error) {
      console.log('❌ 簡單測試失敗');
      console.error('錯誤詳情:', error);
      console.error('錯誤名稱:', error?.name);
      console.error('錯誤信息:', error?.message);
      console.error('錯誤代碼:', error?.code);
      console.error('錯誤堆疊:', error?.stack);
      
      alert(`簡單測試失敗：${error?.message || error?.code || '未知錯誤'}`);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <button
        onClick={handleSimpleInit}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors text-sm"
      >
        簡化初始化
      </button>
      <button
        onClick={handleInit}
        className="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors text-sm"
      >
        完整初始化
      </button>
      <button
        onClick={handleSimpleTest}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors text-sm"
      >
        測試連接
      </button>
    </div>
  );
};

export default InitDataButton;
