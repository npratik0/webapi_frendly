import axiosInstance from "./axios";

export interface Message {
  _id: string;
  conversationId: string;
  sender: {
    _id: string;
    username: string;
    fullName: string;
    profilePicture: string;
  };
  receiver: {
    _id: string;
    username: string;
    fullName: string;
    profilePicture: string;
  };
  content: string;
  messageType: "text" | "image" | "file";
  fileUrl?: string;
  isRead: boolean;
  isDelivered: boolean;
  createdAt: Date;
}

export interface Conversation {
  _id: string;
  participant: {
    _id: string;
    username: string;
    fullName: string;
    profilePicture: string;
  };
  lastMessage: {
    _id: string;
    content: string;
    sender: string;
    createdAt: Date;
    isRead: boolean;
  } | null;
  unreadCount: number;
  lastMessageTime: Date;
}

export const messageAPI = {
  getConversations: async () => {
    console.log("📡 Fetching conversations...");
    const response = await axiosInstance.get("/api/messages/conversations");
    console.log("✅ Conversations fetched:", response.data);
    return response.data;
  },

  getMessages: async (userId: string, page: number = 1) => {
    console.log(`📡 Fetching messages with user: ${userId}`);
    const response = await axiosInstance.get(
      `/api/messages/user/${userId}?page=${page}`
    );
    console.log("✅ Messages fetched:", response.data);
    return response.data;
  },

  sendMessage: async (data: {
    receiverId: string;
    content: string;
    messageType?: string;
    fileUrl?: string;
  }) => {
    console.log("📡 Sending message via HTTP:", data);
    const response = await axiosInstance.post("/api/messages", data);
    console.log("✅ Message sent via HTTP:", response.data);
    return response.data;
  },

  markAsRead: async (conversationId: string) => {
    console.log(`📡 Marking conversation as read: ${conversationId}`);
    const response = await axiosInstance.put(
      `/api/messages/${conversationId}/read`
    );
    console.log("✅ Marked as read:", response.data);
    return response.data;
  },

  deleteMessage: async (messageId: string) => {
    console.log(`📡 Deleting message: ${messageId}`);
    const response = await axiosInstance.delete(`/api/messages/${messageId}`);
    console.log("✅ Message deleted:", response.data);
    return response.data;
  },

  searchMessages: async (query: string) => {
    console.log(`📡 Searching messages: ${query}`);
    const response = await axiosInstance.get(
      `/api/messages/search?q=${query}`
    );
    console.log("✅ Search results:", response.data);
    return response.data;
  },
};