# Firebase 規則配置指南

## 服務發布失敗的常見解決方案

### 1. Realtime Database 規則

在 Firebase Console > Realtime Database > 規則 中，應該設置如下規則：

```json
{
  "rules": {
    "services": {
      ".read": true,
      ".write": "auth != null",
      "$serviceId": {
        ".validate": "newData.hasChildren(['title', 'description', 'category', 'price', 'creatorId']) && newData.child('creatorId').val() == auth.uid"
      }
    },
    "creators": {
      ".read": true,
      ".write": "auth != null",
      "$creatorId": {
        ".validate": "$creatorId == auth.uid"
      }
    },
    "test": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

### 2. Storage 規則

在 Firebase Console > Storage > 規則 中，應該設置如下規則：

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /services/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 3. 檢查步驟

1. 確認用戶已正確登錄
2. 訪問 `/firebase-test` 頁面進行連接測試
3. 檢查瀏覽器開發者工具的 Console 查看錯誤信息
4. 確認 Firebase 項目配置正確

### 4. 臨時調試規則（僅用於開發）

如果需要快速測試，可以暫時使用寬鬆規則：

**Realtime Database:**
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**Storage:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

### 5. 調試步驟

如果初始化仍然失敗，請按以下順序檢查：

#### 步驟 1: 檢查 Firebase 項目設置
1. 確認在 Firebase Console 中已啟用 Realtime Database
2. 確認數據庫區域設置正確（asia-southeast1）
3. 確認網絡規則允許寫入

#### 步驟 2: 檢查用戶登錄狀態
```javascript
// 在瀏覽器控制台執行
firebase.auth().currentUser
```

#### 步驟 3: 手動測試數據庫連接
```javascript
// 在瀏覽器控制台執行
import { getDatabase, ref, set } from 'firebase/database';
const db = getDatabase();
set(ref(db, 'test'), { hello: 'world' });
```

#### 步驟 4: 檢查網絡請求
1. 打開開發者工具 > Network 標籤
2. 執行初始化操作
3. 查看是否有失敗的網絡請求
4. 檢查 HTTP 狀態碼和響應內容

⚠️ **警告：** 寬鬆規則僅適用於開發環境，生產環境必須使用嚴格的權限控制！

### 6. 最寬鬆的測試規則

如果以上都無效，請嘗試最寬鬆的 Realtime Database 規則：

```json
{
  "rules": {
    ".read": true,
    ".write": true,
    ".validate": true
  }
}
```
