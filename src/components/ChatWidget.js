import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import chatService from '../services/chatService';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentConversation, setCurrentConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, loading: authLoading } = useAuth();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 監聽開始聊天事件
  useEffect(() => {
    const handleStartChat = (event) => {
      console.log('收到開始聊天事件:', event.detail);
      const eventData = event.detail;
      
      // 支援多種資料格式
      const targetUserId = eventData.targetUserId || eventData.creatorId;
      const targetUserName = eventData.targetUserName || eventData.creatorName;
      
      console.log('解析後的目標用戶:', { targetUserId, targetUserName });
      
      if (targetUserId && targetUserName) {
        startNewConversation(targetUserId, targetUserName);
      } else {
        console.error('無效的聊天目標資料:', eventData);
        setError('無法識別聊天目標');
      }
    };

    window.addEventListener('startChat', handleStartChat);
    return () => window.removeEventListener('startChat', handleStartChat);
  }, [user]);

  const startNewConversation = async (targetUserId, targetUserName) => {
    console.log('開始新對話:', { targetUserId, targetUserName, currentUser: user });
    
    if (authLoading) {
      console.log('認證仍在載入中，請等待...');
      setError('正在載入用戶資訊...');
      return;
    }

    let currentUser = user;
    
    // 如果沒有登入用戶，創建臨時用戶
    if (!currentUser) {
      console.log('沒有登入用戶，創建臨時用戶');
      currentUser = {
        uid: 'temp_' + Date.now(),
        displayName: '訪客用戶',
        isAnonymous: true,
        isTemp: true
      };
    }

    try {
      setIsLoading(true);
      setError('');
      
      // 查找或創建對話
      const conversationId = await chatService.getOrCreateConversation(
        currentUser.uid,
        targetUserId
      );
      
      console.log('對話ID:', conversationId);
      
      setCurrentConversation({
        id: conversationId,
        targetUserId,
        targetUserName,
        currentUser
      });
      
      // 載入歷史訊息
      const unsubscribe = chatService.subscribeToMessages(conversationId, (messagesData) => {
        console.log('收到訊息更新:', messagesData);
        setMessages(messagesData);
      });

      // 開啟聊天視窗
      setIsOpen(true);
      setIsLoading(false);

      // 清理函數會在組件卸載或對話變更時執行
      return unsubscribe;
      
    } catch (err) {
      console.error('開始對話時發生錯誤:', err);
      setError('無法開始對話，請稍後再試');
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentConversation || isLoading) return;

    const messageText = newMessage.trim();
    setNewMessage('');
    setIsLoading(true);

    try {
      await chatService.sendMessage(
        currentConversation.id,
        currentConversation.currentUser.uid,
        currentConversation.currentUser.displayName || '匿名用戶',
        messageText
      );
      setError('');
    } catch (err) {
      console.error('發送訊息失敗:', err);
      setError('發送失敗，請稍後再試');
      setNewMessage(messageText); // 恢復訊息內容
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setCurrentConversation(null);
    setMessages([]);
    setError('');
  };

  return (
    <>
      {/* 聊天氣泡按鈕 */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-colors"
            title="開啟聊天"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.347-.306c-.584.296-1.925.864-3.653 1.027-.066.006-.133.009-.2.009-.185 0-.366-.037-.537-.107-.254-.105-.463-.314-.547-.592-.033-.109-.016-.224.043-.318.064-.101.171-.17.292-.188.058-.009.117-.014.176-.014.146 0 .294.015.44.041.313.055.624.1.935.1.185 0 .37-.015.554-.045A8 8 0 113 12z" />
            </svg>
          </button>
        </div>
      )}

      {/* 聊天視窗 */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-xl flex flex-col z-50">
          {/* 標題列 */}
          <div className="bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">
              {currentConversation ? `與 ${currentConversation.targetUserName} 聊天` : '聊天'}
            </h3>
            <button
              onClick={closeChat}
              className="text-white hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* 錯誤訊息 */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 text-sm">
              {error}
            </div>
          )}

          {/* 載入中 */}
          {isLoading && !currentConversation && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-gray-500">正在載入...</div>
            </div>
          )}

          {/* 訊息區域 */}
          {currentConversation && (
            <>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {messages.length === 0 ? (
                  <div className="text-gray-500 text-center text-sm">開始對話吧！</div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === currentConversation.currentUser.uid
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                          message.senderId === currentConversation.currentUser.uid
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        <div className="font-medium text-xs mb-1">
                          {message.senderName}
                        </div>
                        <div>{message.text}</div>
                        <div className="text-xs opacity-75 mt-1">
                          {message.timestamp?.toDate?.()?.toLocaleTimeString() ||
                            new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* 輸入區域 */}
              <div className="border-t border-gray-200 p-3">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="輸入訊息..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim() || isLoading}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? '...' : '發送'}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* 未開始對話時的默認內容 */}
          {!currentConversation && !isLoading && (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center text-gray-500">
                <div className="text-lg mb-2">💬</div>
                <div className="text-sm">點擊聯絡或私訊按鈕開始對話</div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;
