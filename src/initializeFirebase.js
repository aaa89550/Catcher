import { initializeServices, initializeCreators, initializeReviews } from './firebase/initData.js';

const runInitialization = async () => {
  try {
    console.log('開始初始化 Firebase 數據...');
    
    console.log('1. 初始化服務數據...');
    await initializeServices();
    console.log('✓ 服務數據初始化完成');
    
    console.log('2. 初始化創作者數據...');
    await initializeCreators();
    console.log('✓ 創作者數據初始化完成');
    
    console.log('3. 初始化評價數據...');
    await initializeReviews();
    console.log('✓ 評價數據初始化完成');
    
    console.log('🎉 所有數據初始化完成！');
  } catch (error) {
    console.error('❌ 初始化失敗:', error);
  }
};

runInitialization();
