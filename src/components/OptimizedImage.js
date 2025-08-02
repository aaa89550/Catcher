import React, { useState, useRef, useEffect } from 'react';
import { ImageOptimizer } from '../utils/performance';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width = 400, 
  height = 300, 
  quality = 80,
  lazy = true,
  placeholder = true,
  onLoad,
  onError,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // 懶加載觀察器
  useEffect(() => {
    if (!lazy || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [lazy, isInView]);

  // 優化圖片 URL
  const optimizedSrc = src ? ImageOptimizer.optimizeImageUrl(src, width, height, quality) : '';
  
  // 生成佔位符
  const placeholderSrc = placeholder ? ImageOptimizer.createPlaceholder(width, height) : '';

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setError(true);
    if (onError) onError();
  };

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight: height }}
      {...props}
    >
      {/* 佔位符 */}
      {placeholder && !isLoaded && !error && (
        <img
          src={placeholderSrc}
          alt="載入中..."
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      
      {/* 載入指示器 */}
      {!isLoaded && !error && isInView && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* 主圖片 */}
      {isInView && !error && (
        <img
          src={optimizedSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`
            w-full h-full object-cover transition-opacity duration-300
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          loading={lazy ? 'lazy' : 'eager'}
        />
      )}

      {/* 錯誤狀態 */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="ml-2 text-sm">圖片載入失敗</span>
        </div>
      )}

      {/* 載入完成遮罩效果 */}
      {isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </div>
  );
};

export default OptimizedImage;
