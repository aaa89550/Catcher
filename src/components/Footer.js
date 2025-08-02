import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary-800 text-white">
      <div className="container-sm py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* 筆墨紙硯工作室資訊 */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-3">筆墨紙硯工作室</h3>
            <p className="text-primary-200 mb-3 text-sm">
              專注於文創設計與數位服務的專業工作室，致力於為客戶提供最優質的創意解決方案。
            </p>
            <div className="space-y-1 text-primary-200 text-sm">
              <p>📍 地址：台北市中正區重慶南路一段XX號</p>
              <p>📞 電話：02-XXXX-XXXX</p>
              <p>📧 信箱：contact@inkstudio.tw</p>
            </div>
          </div>

          {/* 服務項目 */}
          <div>
            <h4 className="text-base font-semibold mb-3">服務項目</h4>
            <ul className="space-y-1 text-primary-200 text-sm">
              <li>品牌設計</li>
              <li>網站開發</li>
              <li>文案撰寫</li>
              <li>數位行銷</li>
              <li>印刷設計</li>
            </ul>
          </div>

          {/* 聯絡資訊 */}
          <div>
            <h4 className="text-base font-semibold mb-3">關注我們</h4>
            <div className="space-y-1">
              <button className="flex items-center text-primary-200 hover:text-white transition-colors text-sm">
                📘 Facebook
              </button>
              <button className="flex items-center text-primary-200 hover:text-white transition-colors text-sm">
                📷 Instagram  
              </button>
              <button className="flex items-center text-primary-200 hover:text-white transition-colors text-sm">
                💼 LinkedIn
              </button>
              <button className="flex items-center text-primary-200 hover:text-white transition-colors text-sm">
                🐦 Twitter
              </button>
            </div>
          </div>
        </div>

        <hr className="border-primary-700 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-primary-300 text-xs">
            © 2025 筆墨紙硯工作室 版權所有
          </div>
          <div className="flex space-x-4 text-xs text-primary-300 mt-2 md:mt-0">
            <button className="hover:text-white transition-colors">隱私政策</button>
            <button className="hover:text-white transition-colors">服務條款</button>
            <button className="hover:text-white transition-colors">聯絡我們</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
