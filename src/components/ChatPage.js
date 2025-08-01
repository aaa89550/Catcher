import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ChatPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    // 只有在用戶已登入時才載入聊天記錄
    if (!isRealUser) return;
    
    // 模擬載入聊天記錄
    const loadConversations = async () => {
      setIsLoading(true);
      try {
        // 這裡將來會串接真實的聊天服務
        const mockConversations = [
          {
            id: '1',
            participantName: '設計師小王',
            participantAvatar: '/api/placeholder/40/40',
            lastMessage: '您好，關於您的設計需求...',
            lastMessageTime: '14:30',
            unreadCount: 2
          },
          {
            id: '2',
            participantName: '攝影師小李',
            participantAvatar: '/api/placeholder/40/40',
            lastMessage: '拍攝時間確認一下',
            lastMessageTime: '13:45',
            unreadCount: 0
          }
        ];

        // 如果有指定聊天對象，創建新對話
        if (creatorId && creatorName) {
          const existingConversation = mockConversations.find(
            conv => conv.participantName === creatorName
          );
          
          if (!existingConversation) {
            const newConversation = {
              id: `new_${creatorId}`,
              participantName: creatorName,
              participantAvatar: '/api/placeholder/40/40',
              lastMessage: '開始新對話',
              lastMessageTime: '剛剛',
              unreadCount: 0
            };
            mockConversations.unshift(newConversation);
            setSelectedConversation(newConversation);
          } else {
            setSelectedConversation(existingConversation);
          }
        }

        setConversations(mockConversations);
        
        // 載入選中對話的訊息
        if (selectedConversation || (creatorId && creatorName)) {
          const mockMessages = [
            {
              id: '1',
              senderId: 'other',
              senderName: creatorName || '設計師小王',
              content: '您好！有什麼可以幫助您的嗎？',
              timestamp: new Date(Date.now() - 3600000),
              isRead: true
            }
          ];
          setMessages(mockMessages);
        }
        
      } catch (error) {
        console.error('載入聊天記錄失敗:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, [creatorId, creatorName, selectedConversation, isRealUser]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message = {
      id: Date.now().toString(),
      senderId: 'me',
      senderName: '我',
      content: newMessage.trim(),
      timestamp: new Date(),
      isRead: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // 這裡將來會發送到真實的聊天服務
    try {
      // await sendMessage(selectedConversation.id, message);
    } catch (error) {
      console.error('發送訊息失敗:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 如果正在載入認證狀態，顯示載入畫面
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
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* 頁面標題 */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">私訊</h1>
          <button
            onClick={() => navigate('/')}
            className="text-green-600 hover:text-green-500"
          >
            返回首頁
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: '600px' }}>
          <div className="flex h-full">
            {/* 對話列表 */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">對話</h2>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <p>尚無對話記錄</p>
                  </div>
                ) : (
                  conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                        selectedConversation?.id === conversation.id ? 'bg-green-50' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <img
                          src={conversation.participantAvatar}
                          alt={conversation.participantName}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {conversation.participantName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {conversation.lastMessageTime}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {conversation.lastMessage}
                          </p>
                        </div>
                        {conversation.unreadCount > 0 && (
                          <div className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 聊天區域 */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* 聊天標題 */}
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center">
                      <img
                        src={selectedConversation.participantAvatar}
                        alt={selectedConversation.participantName}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <h3 className="text-lg font-medium text-gray-900">
                        {selectedConversation.participantName}
                      </h3>
                    </div>
                  </div>

                  {/* 訊息列表 */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.senderId === 'me' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderId === 'me'
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.senderId === 'me' ? 'text-green-100' : 'text-gray-500'
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString('zh-TW', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 訊息輸入區 */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="輸入訊息..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        rows="1"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className={`px-4 py-2 rounded-md font-medium ${
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
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <p className="text-lg mb-2">選擇一個對話開始聊天</p>
                    <p className="text-sm">或點擊創作者頁面的「私訊創作者」按鈕開始新對話</p>
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
