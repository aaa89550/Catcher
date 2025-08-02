// 統一的服務分類配置
// 這個檔案確保所有組件使用相同的分類名稱

export const CATEGORIES = [
  '平面設計',
  '網頁設計',
  '程式開發',
  '行銷企劃',
  '文案撰寫',
  '影音製作',
  '翻譯服務',
  '影音剪輯',
  '攝影服務'
];

// 分類對應的封面圖片
export const CATEGORY_COVERS = {
  '平面設計': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=300&fit=crop',
  '網頁設計': 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=300&fit=crop',
  '程式開發': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=300&fit=crop',
  '行銷企劃': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=300&fit=crop',
  '文案撰寫': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=300&fit=crop',
  '影音製作': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=300&fit=crop',
  '翻譯服務': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=300&fit=crop',
  '影音剪輯': 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=300&fit=crop',
  '攝影服務': 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&h=300&fit=crop'
};

// 分類的描述
export const CATEGORY_DESCRIPTIONS = {
  '平面設計': '包含Logo設計、品牌識別、海報、名片等視覺設計服務',
  '網頁設計': '響應式網站設計、UI/UX設計、網站開發等服務',
  '程式開發': '軟體開發、應用程式、系統建置等技術服務',
  '行銷企劃': '市場策略、社群經營、廣告企劃等行銷服務',
  '文案撰寫': '廣告文案、網站內容、文章撰寫等文字創作',
  '影音製作': '影片拍攝、動畫製作、音樂創作等多媒體服務',
  '翻譯服務': '多國語言翻譯、本土化、口譯等語言服務',
  '影音剪輯': '影片後製、特效製作、調色等剪輯服務',
  '攝影服務': '商業攝影、人像攝影、活動記錄等攝影服務'
};

// 檢查分類是否有效
export const isValidCategory = (category) => {
  return CATEGORIES.includes(category);
};

// 獲取分類的顯示名稱（向後兼容舊的英文分類值）
export const getCategoryDisplayName = (category) => {
  // 新的中文分類直接返回
  if (CATEGORIES.includes(category)) {
    return category;
  }
  
  // 舊的英文分類對應到新的中文分類（向後兼容）
  const legacyMapping = {
    'design': '平面設計',
    'web-design': '網頁設計',
    'development': '程式開發',
    'marketing': '行銷企劃',
    'writing': '文案撰寫',
    'video': '影音製作',
    'translation': '翻譯服務',
    'video-editing': '影音剪輯',
    'photography': '攝影服務'
  };
  
  return legacyMapping[category] || category;
};
