import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
  getDocs
} from 'firebase/firestore';
import { db } from '../firebase/config';

// 私訊資料結構
// conversations: 對話列表
// - id: 對話ID
// - participants: [用戶ID陣列]
// - lastMessage: 最後一則訊息
// - lastMessageTime: 最後訊息時間
// - unreadCount: 未讀數量 (按用戶分)

// messages: 訊息內容
// - id: 訊息ID  
// - conversationId: 對話ID
// - senderId: 發送者ID
// - senderName: 發送者名稱
// - senderAvatar: 發送者頭像
// - content: 訊息內容
// - timestamp: 發送時間
// - read: 是否已讀

class ChatService {
  
  // 創建或獲取對話
  async getOrCreateConversation(currentUserId, targetUserId, targetUserName, targetUserAvatar) {
    try {
      // 檢查是否已存在對話
      const conversationsRef = collection(db, 'conversations');
      const q = query(
        conversationsRef,
        where('participants', 'array-contains', currentUserId)
      );
      
      const snapshot = await getDocs(q);
      let existingConversation = null;
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.participants.includes(targetUserId)) {
          existingConversation = { id: doc.id, ...data };
        }
      });

      if (existingConversation) {
        return existingConversation;
      }

      // 創建新對話
      const newConversation = {
        participants: [currentUserId, targetUserId],
        participantDetails: {
          [currentUserId]: {
            name: '我', // 這裡可以從用戶資料獲取
            avatar: ''
          },
          [targetUserId]: {
            name: targetUserName,
            avatar: targetUserAvatar
          }
        },
        lastMessage: '',
        lastMessageTime: serverTimestamp(),
        unreadCount: {
          [currentUserId]: 0,
          [targetUserId]: 0
        },
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(conversationsRef, newConversation);
      return { id: docRef.id, ...newConversation };
      
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  }

  // 發送訊息
  async sendMessage(conversationId, senderId, senderName, senderAvatar, content) {
    try {
      // 添加訊息到 messages 集合
      const messagesRef = collection(db, 'messages');
      const messageData = {
        conversationId,
        senderId,
        senderName,
        senderAvatar,
        content,
        timestamp: serverTimestamp(),
        read: false
      };

      await addDoc(messagesRef, messageData);

      // 更新對話的最後訊息
      const conversationRef = doc(db, 'conversations', conversationId);
      const conversationSnap = await getDoc(conversationRef);
      
      if (conversationSnap.exists()) {
        const conversationData = conversationSnap.data();
        const unreadCount = { ...conversationData.unreadCount };
        
        // 為對方增加未讀數量
        conversationData.participants.forEach(participantId => {
          if (participantId !== senderId) {
            unreadCount[participantId] = (unreadCount[participantId] || 0) + 1;
          }
        });

        await updateDoc(conversationRef, {
          lastMessage: content,
          lastMessageTime: serverTimestamp(),
          unreadCount
        });
      }

      return messageData;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // 獲取對話列表 (實時監聽)
  subscribeToConversations(userId, callback) {
    const conversationsRef = collection(db, 'conversations');
    const q = query(
      conversationsRef,
      where('participants', 'array-contains', userId),
      orderBy('lastMessageTime', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const conversations = [];
      snapshot.forEach((doc) => {
        conversations.push({ id: doc.id, ...doc.data() });
      });
      callback(conversations);
    });
  }

  // 獲取對話中的訊息 (實時監聽)
  subscribeToMessages(conversationId, callback) {
    const messagesRef = collection(db, 'messages');
    const q = query(
      messagesRef,
      where('conversationId', '==', conversationId),
      orderBy('timestamp', 'asc')
    );

    return onSnapshot(q, (snapshot) => {
      const messages = [];
      snapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      callback(messages);
    });
  }

  // 標記訊息為已讀
  async markAsRead(conversationId, userId) {
    try {
      const conversationRef = doc(db, 'conversations', conversationId);
      const conversationSnap = await getDoc(conversationRef);
      
      if (conversationSnap.exists()) {
        const conversationData = conversationSnap.data();
        const unreadCount = { ...conversationData.unreadCount };
        unreadCount[userId] = 0;

        await updateDoc(conversationRef, { unreadCount });
      }
    } catch (error) {
      console.error('Error marking as read:', error);
      throw error;
    }
  }
}

const chatService = new ChatService();
export default chatService;
