# Catcher 接案平台

一個使用 React 和 Tailwind CSS 建立的接案平台網站。

## 功能特色

- 響應式設計，支援各種裝置
- 現代化的使用者介面
- 服務搜尋功能
- 九宮格服務分類展示
- 精選服務推薦
- 筆墨紙硯工作室資訊

## 技術堆疊

- React 18
- Tailwind CSS 3
- PostCSS
- Autoprefixer

## 安裝與設置

### 1. 安裝 Node.js

請先到 [Node.js 官網](https://nodejs.org/) 下載並安裝 Node.js（建議版本 16 或以上）

### 2. 安裝依賴包

```bash
npm install
```

### 3. 啟動開發伺服器

```bash
npm start
```

專案將在 `http://localhost:3000` 啟動

### 4. 建置生產版本

```bash
npm run build
```

## 網站結構

### Header
- 左上角：登入按鈕
- 右上角：Catcher LOGO

### Main Content
1. **搜尋區域**: 內部服務搜尋引擎
2. **服務分類**: 九宮格排列的服務類型
3. **精選服務**: 推薦的熱門服務

### Footer
- 筆墨紙硯工作室完整資訊
- 聯絡方式
- 社群媒體連結

## 資料夾結構

```
src/
├── components/
│   ├── Header.js          # 頁面標題列
│   ├── SearchSection.js   # 搜尋區域
│   ├── ServiceCategories.js # 服務分類
│   ├── FeaturedServices.js  # 精選服務
│   └── Footer.js          # 頁面底部
├── App.js                 # 主要應用程式組件
├── index.js              # 應用程式入口
└── index.css             # 全域樣式（包含 Tailwind CSS）
```

## 自訂設置

### 顏色主題
在 `tailwind.config.js` 中可以修改主要顏色：

```javascript
colors: {
  primary: {
    // 自訂主要顏色色階
  }
}
```

### 新增服務分類
在 `src/components/ServiceCategories.js` 的 `categories` 陣列中新增項目

### 新增精選服務
在 `src/components/FeaturedServices.js` 的 `featuredServices` 陣列中新增項目

## 開發注意事項

1. 確保安裝所有依賴包後再啟動開發伺服器
2. 修改樣式時使用 Tailwind CSS 的 utility classes
3. 組件都是功能組件，使用 React Hooks
4. 響應式設計已考慮手機、平板、桌面版本

## 部署

建議使用以下平台進行部署：
- Vercel
- Netlify  
- GitHub Pages

## 聯絡資訊

筆墨紙硯工作室
- 地址：台北市中正區重慶南路一段XX號
- 電話：02-XXXX-XXXX
- 信箱：contact@inkstudio.tw
