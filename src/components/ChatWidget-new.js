import React, { useState, useEffect, useRef } from 'react';
import { chatService } from '../services/chatService';
import { useAuth } from '../contexts/AuthContext';

const ChatWidget = () => {
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // 滾動到最底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 載入對話列表
  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = chatService.subscribeToConversations(
      user.uid,
      setConversations
    );

    return unsubscribe;
  }, [user?.uid]);

  // 載入選中對話的訊息
  useEffect(() => {
    if (!activeConversation || !user?.uid) return;

    const unsubscribe = chatService.subscribeToMessages(
      activeConversation.id,
      setMessages
    );

    // 標記為已讀
    chatService.markAsRead(activeConversation.id, user.uid);

    return unsubscribe;
  }, [activeConversation, user?.uid]);

  // 監聽開始新對話事件
  useEffect(() => {
    const handleStartChat = async (event) => {
      const { creatorId, creatorName, creatorAvatar } = event.detail;
      
      if (!user?.uid) return;

      try {
        const conversation = await chatService.getOrCreateConversation(
          user.uid,
          user.displayName || '用戶',
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
          creatorId,
          creatorName,
          creatorAvatar
        );

        setActiveConversation(conversation);
        setIsOpen(true);
      } catch (error) {
        console.error('開始對話失敗:', error);
      }
    };

    window.addEventListener('startChat', handleStartChat);
    return () => window.removeEventListener('startChat', handleStartChat);
  }, [user]);

  // 發送訊息
  const sendMessage = async () => {
    if (!newMessage.trim() || !activeConversation || !user?.uid) return;

    try {
      await chatService.sendMessage(
        activeConversation.id,
        user.uid,
        newMessage.trim()
      );
      setNewMessage('');
      chatInputRef.current?.focus();
    } catch (error) {
      console.error('發送訊息失敗:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 獲取對話對象名稱
  const getOtherParticipantName = (conversation) => {
    const otherParticipantId = conversation.participants.find(id => id !== user?.uid);
    return conversation.participantNames?.[otherParticipantId] || '未知用戶';
  };

  // 獲取未讀訊息數量
  const getUnreadCount = (conversation) => {
    return conversation.unreadCount?.[user?.uid] || 0;
  };

  // 如果用戶尚未載入，顯示載入狀態
  if (loading) {
    return null;
  }

  return (
    <>
      {/* 聊天按鈕 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 z-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {conversations.some(conv => getUnreadCount(conv) > 0) && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {conversations.reduce((total, conv) => total + getUnreadCount(conv), 0)}
            </div>
          )}
        </button>
      )}

      {/* 聊天視窗 */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-xl z-50 flex flex-col">
          {/* 標題列 */}
          <div className="bg-primary-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">
              {activeConversation ? getOtherParticipantName(activeConversation) : '聊天'}
            </h3>
            <div className="flex space-x-2">
              {activeConversation && (
                <button
                  onClick={() => setActiveConversation(null)}
                  className="text-primary-100 hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-primary-100 hover:text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {!activeConversation ? (
            /* 對話列表 */
            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-sm">沒有對話記錄</p>
                  <p className="text-xs text-gray-400 mt-1">點擊創作者頁面的「私訊創作者」開始對話</p>
                </div>
              ) : (
                conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setActiveConversation(conversation)}
                    className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={conversation.participantAvatars?.[conversation.participants.find(id => id !== user?.uid)] || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium text-sm">{getOtherParticipantName(conversation)}</div>
                        <div className="text-xs text-gray-500 truncate max-w-32">
                          {conversation.lastMessage || '開始對話'}
                        </div>
                      </div>
                    </div>
                    {getUnreadCount(conversation) > 0 && (
                      <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {getUnreadCount(conversation)}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          ) : (
            /* 聊天介面 */
            <>
              {/* 訊息區域 */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs flex ${message.senderId === user?.uid ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                      <img
                        src={message.senderId === user?.uid 
                          ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
                          : activeConversation.participantAvatars?.[message.senderId] || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
                        }
                        alt=""
                        className="w-6 h-6 rounded-full"
                      />
                      <div>
                        <div
                          className={`px-3 py-2 rounded-lg text-sm ${
                            message.senderId === user?.uid
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          {message.content}
                        </div>
                        <div className={`text-xs mt-1 ${
                          message.senderId === user?.uid ? 'text-primary-100' : 'text-gray-500'
                        }`}>
                          {new Date(message.timestamp?.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* 輸入區域 */}
              <div className="p-3 border-t border-gray-100">
                <div className="flex space-x-2">
                  <input
                    ref={chatInputRef}
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="輸入訊息..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 text-sm"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;
