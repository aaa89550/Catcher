import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { realtimeDb } from '../firebase/config';
import { ref, push, onValue, off, query, orderByChild, limitToLast, serverTimestamp, set } from 'firebase/database';

const ChatPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Firebase listeners
  const conversationsRef = useRef(null);
  const messagesRef = useRef(null);

  // 從 URL 參數獲取聊天對象資訊
  const creatorId = searchParams.get('creatorId');
  const creatorName = searchParams.get('creatorName');

  // 檢查用戶是否為真實登入用戶
  const isRealUser = user && !user.isAnonymous && !user.isTemporary && user.email;

  // 檢查登入狀態，如果未登入則重定向到登入頁面
  useEffect(() => {
    if (!loading && !isRealUser) {
      alert('請先登入以使用私訊功能');
      navigate('/login');
      return;
    }
  }, [loading, isRealUser, navigate]);

  // 生成聊天室ID的函數
  const generateChatId = (userId1, userId2) => {
    return [userId1, userId2].sort().join('_');
  };

  // 滾動到最新訊息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 載入對話列表
  const loadConversations = useCallback(() => {
    if (!isRealUser) return;

    const userConversationsRef = ref(realtimeDb, `users/${user.uid}/conversations`);
    
    const unsubscribe = onValue(userConversationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const conversationsList = Object.entries(data).map(([id, conv]) => ({
          id,
          ...conv,
        })).sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
        
        setConversations(conversationsList);
        
        // 如果有指定的創作者，自動選擇或創建對話
        if (creatorId && creatorName) {
          const existingConv = conversationsList.find(
            conv => conv.participantId === creatorId
          );
          
          if (existingConv) {
            setSelectedConversation(existingConv);
          } else {
            // 創建新對話
            createNewConversation(creatorId, creatorName);
          }
        }
      } else if (creatorId && creatorName) {
        // 如果沒有任何對話但有指定創作者，創建新對話
        createNewConversation(creatorId, creatorName);
      }
      setIsLoading(false);
    }, (error) => {
      console.error('載入對話列表失敗:', error);
      setIsLoading(false);
    });

    conversationsRef.current = unsubscribe;
  }, [isRealUser, user.uid, creatorId, creatorName]);

  // 創建新對話
  const createNewConversation = async (participantId, participantName) => {
    if (!isRealUser) return;

    const chatId = generateChatId(user.uid, participantId);
    const conversationData = {
      id: chatId,
      participantId,
      participantName,
      participantAvatar: '/api/placeholder/40/40',
      lastMessage: '',
      lastMessageTime: new Date().toISOString(),
      unreadCount: 0
    };

    // 為兩個用戶都添加對話記錄
    const updates = {};
    updates[`users/${user.uid}/conversations/${chatId}`] = conversationData;
    updates[`users/${participantId}/conversations/${chatId}`] = {
      ...conversationData,
      participantId: user.uid,
      participantName: user.displayName || user.email || '用戶',
    };

    try {
      await set(ref(realtimeDb, `users/${user.uid}/conversations/${chatId}`), conversationData);
      await set(ref(realtimeDb, `users/${participantId}/conversations/${chatId}`), {
        ...conversationData,
        participantId: user.uid,
        participantName: user.displayName || user.email || '用戶',
      });
      setSelectedConversation(conversationData);
    } catch (error) {
      console.error('創建對話失敗:', error);
    }
  };

  // 載入選中對話的訊息
  const loadMessages = (conversationId) => {
    if (!conversationId) return;

    // 清除之前的監聽器
    if (messagesRef.current) {
      try {
        off(messagesRef.current);
      } catch (error) {
        console.log('移除監聽器時發生錯誤:', error);
      }
      messagesRef.current = null;
    }

    const chatMessagesRef = ref(realtimeDb, `chats/${conversationId}/messages`);
    const messagesQuery = query(chatMessagesRef, orderByChild('timestamp'), limitToLast(50));

    const unsubscribe = onValue(messagesQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesList = Object.entries(data).map(([id, message]) => ({
          id,
          ...message,
          timestamp: new Date(message.timestamp)
        })).sort((a, b) => a.timestamp - b.timestamp);
        
        setMessages(messagesList);
      } else {
        setMessages([]);
      }
    }, (error) => {
      console.error('載入訊息失敗:', error);
      setMessages([]);
    });

    messagesRef.current = unsubscribe;
  };

  // 發送訊息
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !isRealUser) return;

    const messageData = {
      senderId: user.uid,
      senderName: user.displayName || user.email || '我',
      content: newMessage.trim(),
      timestamp: serverTimestamp(),
      isRead: false
    };

    try {
      // 發送訊息到聊天室
      const chatMessagesRef = ref(realtimeDb, `chats/${selectedConversation.id}/messages`);
      await push(chatMessagesRef, messageData);

      // 更新對話的最後訊息
      const conversationUpdate = {
        lastMessage: newMessage.trim(),
        lastMessageTime: new Date().toISOString(),
      };

      // 更新發送者的對話記錄
      await set(ref(realtimeDb, `users/${user.uid}/conversations/${selectedConversation.id}`), {
        ...selectedConversation,
        ...conversationUpdate
      });

      // 更新接收者的對話記錄（增加未讀數）
      const receiverConvRef = ref(realtimeDb, `users/${selectedConversation.participantId}/conversations/${selectedConversation.id}`);
      await set(receiverConvRef, {
        ...selectedConversation,
        participantId: user.uid,
        participantName: user.displayName || user.email || '用戶',
        lastMessage: newMessage.trim(),
        lastMessageTime: new Date().toISOString(),
        unreadCount: (selectedConversation.unreadCount || 0) + 1
      });

      setNewMessage('');
    } catch (error) {
      console.error('發送訊息失敗:', error);
      alert('發送訊息失敗，請稍後再試');
    }
  };

  // 載入對話和設置監聽器
  useEffect(() => {
    if (!isRealUser) return;
    
    loadConversations();
    
    // 清理函數
    return () => {
      if (conversationsRef.current) {
        try {
          off(conversationsRef.current);
        } catch (error) {
          console.log('移除對話監聽器時發生錯誤:', error);
        }
        conversationsRef.current = null;
      }
      if (messagesRef.current) {
        try {
          off(messagesRef.current);
        } catch (error) {
          console.log('移除訊息監聽器時發生錯誤:', error);
        }
        messagesRef.current = null;
      }
    };
  }, [isRealUser, creatorId, creatorName, loadConversations]);

  // 當選中對話改變時載入訊息
  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id);
      
      // 標記訊息為已讀
      if (selectedConversation.unreadCount > 0) {
        set(ref(realtimeDb, `users/${user.uid}/conversations/${selectedConversation.id}/unreadCount`), 0)
          .catch(error => console.error('標記已讀失敗:', error));
      }
    }
    
    return () => {
      if (messagesRef.current) {
        try {
          off(messagesRef.current);
        } catch (error) {
          console.log('移除訊息監聽器時發生錯誤:', error);
        }
        messagesRef.current = null;
      }
    };
  }, [selectedConversation, user?.uid]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 處理對話選擇
  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">檢查登入狀態中...</p>
        </div>
      </div>
    );
  }

  // 如果用戶未登入，顯示提示（這個理論上不會顯示，因為會重定向）
  if (!isRealUser) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">請先登入以使用私訊功能</p>
          <button
            onClick={() => navigate('/login')}
            className="btn-primary"
          >
            前往登入
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">載入聊天記錄中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 chat-mobile">
      <div className="max-w-6xl mx-auto py-4 md:py-8 px-4">
        {/* 頁面標題 */}
        <div className="mb-4 md:mb-6 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">私訊</h1>
          <button
            onClick={() => navigate('/')}
            className="text-green-600 hover:text-green-500 text-sm md:text-base"
          >
            返回首頁
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: 'calc(100vh - 180px)', minHeight: '500px' }}>
          <div className="flex h-full">
            {/* 對話列表 - 手機版隱藏或抽屜式 */}
            <div className={`${selectedConversation ? 'hidden md:block' : 'block'} w-full md:w-1/3 border-r border-gray-200 flex flex-col chat-sidebar-mobile`}>
              <div className="p-3 md:p-4 border-b border-gray-200">
                <h2 className="text-base md:text-lg font-semibold text-gray-900">對話</h2>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <p className="text-sm md:text-base">尚無對話記錄</p>
                  </div>
                ) : (
                  conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => handleConversationSelect(conversation)}
                      className={`p-3 md:p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 touch-feedback ${
                        selectedConversation?.id === conversation.id ? 'bg-green-50' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <img
                          src={conversation.participantAvatar}
                          alt={conversation.participantName}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm md:text-base font-medium text-gray-900 truncate">
                              {conversation.participantName}
                            </p>
                            <p className="text-xs text-gray-500 flex-shrink-0 ml-2">
                              {conversation.lastMessageTime}
                            </p>
                          </div>
                          <p className="text-xs md:text-sm text-gray-500 truncate">
                            {conversation.lastMessage}
                          </p>
                        </div>
                        {conversation.unreadCount > 0 && (
                          <div className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 聊天區域 - 手機版全屏 */}
            <div className={`${selectedConversation ? 'flex' : 'hidden md:flex'} flex-1 flex-col chat-main-mobile`}>
              {selectedConversation ? (
                <>
                  {/* 聊天標題 - 手機版添加返回按鈕 */}
                  <div className="p-3 md:p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center">
                      <button
                        onClick={() => setSelectedConversation(null)}
                        className="md:hidden mr-3 p-1 text-gray-500 hover:text-gray-700"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <img
                        src={selectedConversation.participantAvatar}
                        alt={selectedConversation.participantName}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-3"
                      />
                      <h3 className="text-base md:text-lg font-medium text-gray-900">
                        {selectedConversation.participantName}
                      </h3>
                    </div>
                  </div>

                  {/* 訊息列表 - 手機版優化 */}
                  <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 chat-messages-mobile">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.senderId === user?.uid ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`message-bubble ${
                            message.senderId === user?.uid ? 'sent' : 'received'
                          }`}
                        >
                          <p className="text-sm md:text-base">{message.content}</p>
                          <p
                            className={`text-xs mt-1 opacity-75`}
                          >
                            {message.timestamp instanceof Date 
                              ? message.timestamp.toLocaleTimeString('zh-TW', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })
                              : new Date(message.timestamp).toLocaleTimeString('zh-TW', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })
                            }
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* 訊息輸入區 - 手機版優化 */}
                  <div className="chat-input-mobile p-3 md:p-4 border-t border-gray-200 bg-white">
                    <div className="flex space-x-2">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="輸入訊息..."
                        className="input-mobile flex-1 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        rows="1"
                        style={{ fontSize: '16px' }} // 防止 iOS 縮放
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className={`btn-mobile px-4 py-2 rounded-lg font-medium transition-colors ${
                          newMessage.trim()
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        發送
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center p-4">
                  <div className="text-center text-gray-500">
                    <div className="mb-4">
                      <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-base md:text-lg mb-2">選擇一個對話開始聊天</p>
                    <p className="text-sm text-gray-400">或點擊創作者頁面的「私訊創作者」按鈕開始新對話</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
