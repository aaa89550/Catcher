import React from 'react';

const MobileDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 手機版展示區域 */}
      <div className="bg-white shadow-sm p-4 mb-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">📱 手機版優化功能</h2>
        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="p-3 bg-blue-50 rounded-lg">
            <span className="font-medium text-blue-800">✅ 響應式導航：</span>
            <span className="text-blue-600"> 漢堡選單 + 抽屜式側欄</span>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <span className="font-medium text-green-800">✅ LOGO 路徑修復：</span>
            <span className="text-green-600"> 多重後備機制確保顯示</span>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <span className="font-medium text-purple-800">✅ 觸控優化：</span>
            <span className="text-purple-600"> 44px 最小觸控區域</span>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <span className="font-medium text-orange-800">✅ 手機版樣式：</span>
            <span className="text-orange-600"> 專用 mobile.css 文件</span>
          </div>
        </div>
      </div>

      {/* 手機版卡片展示 */}
      <div className="container-mobile px-4">
        <div className="creator-grid-mobile space-y-4">
          <div className="creator-card-mobile">
            <div className="avatar w-16 h-16 bg-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="content">
              <h3 className="font-bold text-gray-800 mb-1">設計師 Alice</h3>
              <p className="text-gray-600 text-sm mb-2">專業 UI/UX 設計師</p>
              <div className="tags flex flex-wrap gap-1 justify-center">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">UI設計</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">UX設計</span>
              </div>
            </div>
            <div className="actions mt-4 space-y-2">
              <button className="btn-mobile w-full bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                查看作品集
              </button>
              <button className="btn-mobile w-full border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                發送訊息
              </button>
            </div>
          </div>

          <div className="creator-card-mobile">
            <div className="avatar w-16 h-16 bg-green-500 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div className="content">
              <h3 className="font-bold text-gray-800 mb-1">工程師 Bob</h3>
              <p className="text-gray-600 text-sm mb-2">全端開發專家</p>
              <div className="tags flex flex-wrap gap-1 justify-center">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">React</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Node.js</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">MongoDB</span>
              </div>
            </div>
            <div className="actions mt-4 space-y-2">
              <button className="btn-mobile w-full bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                查看作品集
              </button>
              <button className="btn-mobile w-full border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                發送訊息
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 訊息氣泡展示 */}
      <div className="container-mobile px-4 mt-6">
        <h3 className="font-bold text-gray-800 mb-3">💬 聊天介面展示</h3>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="space-y-3">
            <div className="flex justify-start">
              <div className="message-bubble received">
                您好！我對您的設計服務很有興趣
              </div>
            </div>
            <div className="flex justify-end">
              <div className="message-bubble sent">
                謝謝您的詢問！我很樂意為您服務，請問您的專案需求是什麼呢？
              </div>
            </div>
            <div className="flex justify-start">
              <div className="message-bubble received">
                我需要設計一個電商網站的 UI
              </div>
            </div>
          </div>
          
          <div className="chat-input-mobile mt-4 pt-3 border-t border-gray-200">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="輸入訊息..." 
                className="input-mobile flex-1 border border-gray-300 rounded-lg px-3 py-2"
              />
              <button className="btn-mobile px-4 py-2 bg-primary-600 text-white rounded-lg">
                發送
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 表單展示 */}
      <div className="container-mobile px-4 mt-6 mb-8">
        <h3 className="font-bold text-gray-800 mb-3">📝 表單優化展示</h3>
        <div className="form-mobile bg-white rounded-lg shadow-sm">
          <div className="field-group">
            <label htmlFor="demo-name">姓名</label>
            <input 
              id="demo-name"
              type="text" 
              placeholder="請輸入您的姓名"
              className="focus-mobile"
            />
          </div>
          <div className="field-group">
            <label htmlFor="demo-email">電子郵件</label>
            <input 
              id="demo-email"
              type="email" 
              placeholder="your@email.com"
              className="focus-mobile"
            />
          </div>
          <div className="field-group">
            <label htmlFor="demo-message">訊息</label>
            <textarea 
              id="demo-message"
              placeholder="請輸入您的訊息..."
              rows="3"
              className="focus-mobile"
            ></textarea>
          </div>
          <button className="btn-mobile w-full bg-primary-600 text-white rounded-lg">
            提交表單
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileDemo;
