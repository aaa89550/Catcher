# Firebase Realtime Database 私訊功能整合

## 功能說明
已成功將 Firebase Realtime Database 整合到 ChatPage.js 中，實現以下功能：

### 核心功能
1. **即時對話列表** - 自動同步所有對話
2. **即時訊息** - 訊息即時傳送和接收  
3. **未讀計數** - 自動追蹤未讀訊息數量
4. **對話切換** - 正確切換不同聊天者
5. **自動滾動** - 新訊息自動滾動到底部

### 資料結構

#### 用戶對話列表
```
users/{userId}/conversations/{chatId}
├── id: "user1_user2"
├── participantId: "對方用戶ID"  
├── participantName: "對方姓名"
├── participantAvatar: "對方頭像URL"
├── lastMessage: "最後一則訊息"
├── lastMessageTime: "最後訊息時間"
└── unreadCount: 未讀數量
```

#### 聊天訊息
```
chats/{chatId}/messages/{messageId}
├── senderId: "發送者ID"
├── senderName: "發送者姓名" 
├── content: "訊息內容"
├── timestamp: "發送時間"
└── isRead: 是否已讀
```

### 主要功能實現

#### 1. 對話管理
- 自動生成唯一聊天室ID（兩個用戶ID排序後組合）
- 為雙方用戶建立對話記錄
- 即時同步對話列表

#### 2. 訊息傳送
- 訊息寫入 Firebase Realtime Database
- 自動更新對話的最後訊息
- 為接收方增加未讀計數

#### 3. 即時監聽
- 使用 Firebase onValue 監聽對話變化
- 使用 Firebase onValue 監聽訊息變化
- 自動清理監聽器避免記憶體洩漏

#### 4. 未讀處理
- 切換對話時自動標記為已讀
- 即時更新未讀計數顯示

### 使用方式

#### 開啟與特定用戶的對話
```javascript
// URL: /chat?creatorId=USER_ID&creatorName=USER_NAME
navigate('/chat?creatorId=12345&creatorName=設計師小王');
```

#### 發送訊息
1. 選擇對話
2. 輸入訊息內容
3. 按 Enter 或點擊發送按鈕

### 技術特點
- 即時雙向通訊
- 自動處理網路重連
- 優化的資料結構減少讀寫次數
- 自動清理監聽器防止記憶體洩漏
- 支援訊息時間戳記和已讀狀態

### 注意事項
1. 需要用戶登入才能使用私訊功能
2. 聊天室ID基於用戶ID生成，確保唯一性
3. 所有 Firebase 操作都有錯誤處理
4. 自動滾動到最新訊息

## 測試方式
1. 登入兩個不同帳號
2. 從創作者頁面點擊「私訊創作者」
3. 測試發送訊息和即時接收
4. 測試對話切換和未讀計數
