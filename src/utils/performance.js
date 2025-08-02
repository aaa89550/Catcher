// 本地存儲快取管理器
class CacheManager {
  constructor() {
    this.memoryCache = new Map();
    this.localStoragePrefix = 'catcher_cache_';
  }

  // 生成快取鍵
  generateKey(type, params = {}) {
    const paramsStr = Object.keys(params).sort().map(key => `${key}:${params[key]}`).join('|');
    return `${type}_${paramsStr}`;
  }

  // 檢查快取是否有效
  isCacheValid(timestamp, duration = 5 * 60 * 1000) {
    return timestamp && (Date.now() - timestamp) < duration;
  }

  // 從內存快取獲取
  getFromMemory(key) {
    const cached = this.memoryCache.get(key);
    if (cached && this.isCacheValid(cached.timestamp, cached.duration)) {
      return cached.data;
    }
    this.memoryCache.delete(key);
    return null;
  }

  // 存儲到內存快取
  setToMemory(key, data, duration = 5 * 60 * 1000) {
    this.memoryCache.set(key, {
      data,
      timestamp: Date.now(),
      duration
    });
  }

  // 從本地存儲獲取
  getFromLocalStorage(key) {
    try {
      const cached = localStorage.getItem(this.localStoragePrefix + key);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (this.isCacheValid(parsed.timestamp, parsed.duration)) {
          return parsed.data;
        }
        localStorage.removeItem(this.localStoragePrefix + key);
      }
    } catch (error) {
      console.warn('讀取本地快取失敗:', error);
    }
    return null;
  }

  // 存儲到本地存儲
  setToLocalStorage(key, data, duration = 5 * 60 * 1000) {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
        duration
      };
      localStorage.setItem(this.localStoragePrefix + key, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('保存本地快取失敗:', error);
    }
  }

  // 獲取快取數據（優先從內存，其次本地存儲）
  get(key) {
    return this.getFromMemory(key) || this.getFromLocalStorage(key);
  }

  // 設置快取數據（同時存儲到內存和本地存儲）
  set(key, data, duration = 5 * 60 * 1000) {
    this.setToMemory(key, data, duration);
    this.setToLocalStorage(key, data, duration);
  }

  // 清除快取
  clear(pattern = null) {
    if (pattern) {
      // 清除特定模式的快取
      for (const key of this.memoryCache.keys()) {
        if (key.includes(pattern)) {
          this.memoryCache.delete(key);
        }
      }
      
      // 清除本地存儲中的匹配項
      try {
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && key.startsWith(this.localStoragePrefix) && key.includes(pattern)) {
            localStorage.removeItem(key);
          }
        }
      } catch (error) {
        console.warn('清除本地快取失敗:', error);
      }
    } else {
      // 清除所有快取
      this.memoryCache.clear();
      try {
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && key.startsWith(this.localStoragePrefix)) {
            localStorage.removeItem(key);
          }
        }
      } catch (error) {
        console.warn('清除本地快取失敗:', error);
      }
    }
  }

  // 獲取快取統計
  getStats() {
    const memorySize = this.memoryCache.size;
    let localStorageCount = 0;
    
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.localStoragePrefix)) {
          localStorageCount++;
        }
      }
    } catch (error) {
      console.warn('獲取快取統計失敗:', error);
    }

    return {
      memoryCache: memorySize,
      localStorage: localStorageCount
    };
  }
}

// 創建全局快取管理器實例
export const cacheManager = new CacheManager();

// 圖片預載入和優化
export class ImageOptimizer {
  static preloadImages(imageUrls) {
    return Promise.all(
      imageUrls.map(url => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(url);
          img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
          img.src = url;
        });
      })
    );
  }

  static optimizeImageUrl(url, width = 800, height = 600, quality = 80) {
    if (url.includes('unsplash.com')) {
      return `${url}&w=${width}&h=${height}&q=${quality}&fit=crop&crop=faces,focalpoint`;
    }
    return url;
  }

  static createPlaceholder(width = 400, height = 300, color = '#f3f4f6') {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${color}"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="sans-serif" font-size="16" fill="#9ca3af">載入中...</text>
      </svg>
    `)}`;
  }
}

// 性能監控
export class PerformanceMonitor {
  static measurements = new Map();

  static start(label) {
    this.measurements.set(label, performance.now());
  }

  static end(label) {
    const startTime = this.measurements.get(label);
    if (startTime) {
      const duration = performance.now() - startTime;
      console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
      this.measurements.delete(label);
      return duration;
    }
    return null;
  }

  static measure(label, fn) {
    return async (...args) => {
      this.start(label);
      try {
        const result = await fn(...args);
        this.end(label);
        return result;
      } catch (error) {
        this.end(label);
        throw error;
      }
    };
  }
}

export default { cacheManager, ImageOptimizer, PerformanceMonitor };
