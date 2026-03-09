"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { messageAPI, Conversation, Message } from "@/lib/api/message";
import { userAPI, User } from "@/lib/api/user";
import { useSocket } from "@/context/SocketContext";
import {
  Send,
  Search,
  MoreVertical,
  ArrowLeft,
  Image as ImageIcon,
  Smile,
  Check,
  CheckCheck,
  Loader2,
  Phone,
  Video,
  Info,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";

export default function MessagesPage() {
  const router = useRouter();
  const { socket, isConnected } = useSocket();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Fix here

  useEffect(() => {
    fetchCurrentUser();
    fetchConversations();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (data: { message: Message }) => {
      const { message } = data;
      
      // Add message to the conversation
      if (
        selectedConversation &&
        (message.sender._id === selectedConversation.participant._id ||
          message.receiver._id === selectedConversation.participant._id)
      ) {
        setMessages((prev) => [...prev, message]);
        
        // Mark as read if conversation is open
        socket.emit("mark_as_read", {
          conversationId: message.conversationId,
        });
      }

      // Update conversations list
      fetchConversations();
    });

    socket.on("message_sent", (data: { message: Message }) => {
      // Message was successfully sent
      console.log("Message sent successfully");
    });

    socket.on("message_delivered", (data: { messageId: string }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === data.messageId ? { ...msg, isDelivered: true } : msg
        )
      );
    });

    socket.on("messages_read", (data: { conversationId: string }) => {
      if (
        selectedConversation &&
        selectedConversation._id === data.conversationId
      ) {
        setMessages((prev) =>
          prev.map((msg) => ({ ...msg, isRead: true }))
        );
      }
    });

    socket.on("user_typing", (data: { userId: string }) => {
      setTypingUsers((prev) => new Set(prev).add(data.userId));
    });

    socket.on("user_stopped_typing", (data: { userId: string }) => {
      setTypingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(data.userId);
        return newSet;
      });
    });

    return () => {
      socket.off("receive_message");
      socket.off("message_sent");
      socket.off("message_delivered");
      socket.off("messages_read");
      socket.off("user_typing");
      socket.off("user_stopped_typing");
    };
  }, [socket, selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const searchUsers = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await userAPI.searchUsers(searchQuery);
        if (response.success) {
          setSearchResults(response.data);
        }
      } catch (error: any) {
        console.error("Search failed:", error);
      }
    };

    const debounce = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const fetchCurrentUser = async () => {
    try {
      const response = await userAPI.getCurrentUser();
      if (response.success) {
        setCurrentUser(response.data);
      }
    } catch (error: any) {
      toast.error("Failed to fetch user data");
      router.push("/login");
    }
  };

  const fetchConversations = async () => {
    try {
      const response = await messageAPI.getConversations();
      if (response.success) {
        setConversations(response.data);
      }
    } catch (error: any) {
      toast.error("Failed to load conversations");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (userId: string) => {
    try {
      const response = await messageAPI.getMessages(userId);
      if (response.success) {
        setMessages(response.data);
      }
    } catch (error: any) {
      toast.error("Failed to load messages");
    }
  };

  const handleSelectConversation = async (conversation: Conversation) => {
    setSelectedConversation(conversation);
    await fetchMessages(conversation.participant._id);
    
    // Mark messages as read
    if (socket && conversation.unreadCount > 0) {
      socket.emit("mark_as_read", { conversationId: conversation._id });
    }
  };

  const handleStartNewChat = async (user: User) => {
    // Check if conversation already exists
    const existingConv = conversations.find(
      (c) => c.participant._id === user._id
    );

    if (existingConv) {
      handleSelectConversation(existingConv);
    } else {
      // Create a temporary conversation
      const newConv: Conversation = {
        _id: "",
        participant: {
          _id: user._id,
          username: user.username,
          fullName: user.fullName,
          profilePicture: user.profilePicture || "",
        },
        lastMessage: null,
        unreadCount: 0,
        lastMessageTime: new Date(),
      };
      setSelectedConversation(newConv);
      setMessages([]);
    }

    setShowSearch(false);
    setSearchQuery("");
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConversation || !socket) return;

    const tempMessage: Message = {
      _id: Date.now().toString(),
      conversationId: selectedConversation._id,
      sender: {
        _id: currentUser?._id || "",
        username: currentUser?.username || "",
        fullName: currentUser?.fullName || "",
        profilePicture: currentUser?.profilePicture || "",
      },
      receiver: selectedConversation.participant,
      content: messageText,
      messageType: "text",
      isRead: false,
      isDelivered: false,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, tempMessage]);
    const contentToSend = messageText;
    setMessageText("");
    setSending(true);

    socket.emit("send_message", {
      receiverId: selectedConversation.participant._id,
      content: contentToSend,
      messageType: "text",
    });

    // Stop typing indicator
    socket.emit("typing_stop", {
      receiverId: selectedConversation.participant._id,
    });

    setSending(false);
    fetchConversations();
  };

  const handleTyping = () => {
    if (!socket || !selectedConversation) return;

    socket.emit("typing_start", {
      receiverId: selectedConversation.participant._id,
    });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing_stop", {
        receiverId: selectedConversation.participant._id,
      });
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex">
      {/* Conversations List */}
      <div
        className={`${
          selectedConversation ? "hidden md:flex" : "flex"
        } w-full md:w-96 bg-white border-r border-gray-200 flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-gray-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        {/* Search Results */}
        {showSearch && searchResults.length > 0 && (
          <div className="flex-1 overflow-y-auto">
            {searchResults.map((user) => (
              <button
                key={user._id}
                onClick={() => handleStartNewChat(user)}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <img
                  src={
                    user.profilePicture ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
                  }
                  alt={user.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 text-left min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {user.fullName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    @{user.username}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Conversations */}
        {!showSearch && (
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Send className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  No messages yet
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Search for users to start a conversation
                </p>
                <button
                  onClick={() => setShowSearch(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Start Messaging
                </button>
              </div>
            ) : (
              conversations.map((conversation) => (
                <button
                  key={conversation._id}
                  onClick={() => handleSelectConversation(conversation)}
                  className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                    selectedConversation?._id === conversation._id
                      ? "bg-blue-50"
                      : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      src={
                        conversation.participant.profilePicture ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${conversation.participant.username}`
                      }
                      alt={conversation.participant.username}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    {conversation.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">
                          {conversation.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-sm truncate">
                        {conversation.participant.fullName}
                      </p>
                      {conversation.lastMessage && (
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(
                            new Date(conversation.lastMessage.createdAt),
                            { addSuffix: true }
                          )}
                        </p>
                      )}
                    </div>
                    {conversation.lastMessage && (
                      <p className="text-sm text-gray-500 truncate">
                        {conversation.lastMessage.sender === currentUser?._id
                          ? "You: "
                          : ""}
                        {conversation.lastMessage.content}
                      </p>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedConversation(null)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <img
                src={
                  selectedConversation.participant.profilePicture ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedConversation.participant.username}`
                }
                alt={selectedConversation.participant.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-sm">
                  {selectedConversation.participant.fullName}
                </p>
                <p className="text-xs text-gray-500">
                  {typingUsers.has(selectedConversation.participant._id)
                    ? "typing..."
                    : isConnected
                    ? "Active now"
                    : "Offline"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Video className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Info className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-gray-50 to-blue-50/20">
            {messages.map((message, index) => {
              const isOwn = message.sender._id === currentUser?._id;
              const showAvatar =
                index === messages.length - 1 ||
                messages[index + 1]?.sender._id !== message.sender._id;

              return (
                <div
                  key={message._id}
                  className={`flex items-end gap-2 ${
                    isOwn ? "flex-row-reverse" : ""
                  }`}
                >
                  {showAvatar && !isOwn && (
                    <img
                      src={
                        message.sender.profilePicture ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${message.sender.username}`
                      }
                      alt={message.sender.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  {!showAvatar && !isOwn && <div className="w-8" />}
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      isOwn
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        : "bg-white border border-gray-200 text-gray-900"
                    }`}
                  >
                    <p className="text-sm break-words">{message.content}</p>
                    <div
                      className={`flex items-center gap-1 mt-1 text-xs ${
                        isOwn ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      <span>
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {isOwn && (
                        <>
                          {message.isRead ? (
                            <CheckCheck className="w-3 h-3" />
                          ) : message.isDelivered ? (
                            <CheckCheck className="w-3 h-3" />
                          ) : (
                            <Check className="w-3 h-3" />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ImageIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Smile className="w-5 h-5 text-gray-600" />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => {
                  setMessageText(e.target.value);
                  handleTyping();
                }}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 h-10 px-4 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim() || sending}
                className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/20">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Your Messages
            </h3>
            <p className="text-gray-500">
              Select a conversation to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// // "use client";

// // import { useEffect, useState, useRef } from "react";
// // import { useRouter } from "next/navigation";
// // import { messageAPI, Conversation, Message } from "@/lib/api/message";
// // import { userAPI, User } from "@/lib/api/user";
// // import { useSocket } from "@/context/SocketContext";
// // import {
// //   Send,
// //   Search,
// //   MoreVertical,
// //   ArrowLeft,
// //   Image as ImageIcon,
// //   Smile,
// //   Check,
// //   CheckCheck,
// //   Loader2,
// //   Phone,
// //   Video,
// //   Info,
// //   X,
// //   MessageCircle,
// //   Sparkles,
// //   ChevronRight,
// // } from "lucide-react";
// // import { toast } from "react-hot-toast";
// // import { formatDistanceToNow } from "date-fns";

// // export default function MessagesPage() {
// //   const router = useRouter();
// //   const { socket, isConnected } = useSocket();
// //   const [currentUser, setCurrentUser] = useState<User | null>(null);
// //   const [conversations, setConversations] = useState<Conversation[]>([]);
// //   const [selectedConversation, setSelectedConversation] =
// //     useState<Conversation | null>(null);
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [messageText, setMessageText] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const [sending, setSending] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [searchResults, setSearchResults] = useState<User[]>([]);
// //   const [showSearch, setShowSearch] = useState(false);
// //   const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
// //   const messagesEndRef = useRef<HTMLDivElement>(null);
// //   const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

// //   useEffect(() => {
// //     fetchCurrentUser();
// //     fetchConversations();
// //   }, []);

// //   useEffect(() => {
// //     if (!socket) return;

// //     socket.on("receive_message", (data: { message: Message }) => {
// //       const { message } = data;
      
// //       if (
// //         selectedConversation &&
// //         (message.sender._id === selectedConversation.participant._id ||
// //           message.receiver._id === selectedConversation.participant._id)
// //       ) {
// //         setMessages((prev) => [...prev, message]);
        
// //         socket.emit("mark_as_read", {
// //           conversationId: message.conversationId,
// //         });
// //       }

// //       fetchConversations();
// //     });

// //     socket.on("message_sent", (data: { message: Message }) => {
// //       console.log("Message sent successfully");
// //     });

// //     socket.on("message_delivered", (data: { messageId: string }) => {
// //       setMessages((prev) =>
// //         prev.map((msg) =>
// //           msg._id === data.messageId ? { ...msg, isDelivered: true } : msg
// //         )
// //       );
// //     });

// //     socket.on("messages_read", (data: { conversationId: string }) => {
// //       if (
// //         selectedConversation &&
// //         selectedConversation._id === data.conversationId
// //       ) {
// //         setMessages((prev) =>
// //           prev.map((msg) => ({ ...msg, isRead: true }))
// //         );
// //       }
// //     });

// //     socket.on("user_typing", (data: { userId: string }) => {
// //       setTypingUsers((prev) => new Set(prev).add(data.userId));
// //     });

// //     socket.on("user_stopped_typing", (data: { userId: string }) => {
// //       setTypingUsers((prev) => {
// //         const newSet = new Set(prev);
// //         newSet.delete(data.userId);
// //         return newSet;
// //       });
// //     });

// //     return () => {
// //       socket.off("receive_message");
// //       socket.off("message_sent");
// //       socket.off("message_delivered");
// //       socket.off("messages_read");
// //       socket.off("user_typing");
// //       socket.off("user_stopped_typing");
// //     };
// //   }, [socket, selectedConversation]);

// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages]);

// //   useEffect(() => {
// //     const searchUsers = async () => {
// //       if (searchQuery.trim().length < 2) {
// //         setSearchResults([]);
// //         return;
// //       }

// //       try {
// //         const response = await userAPI.searchUsers(searchQuery);
// //         if (response.success) {
// //           setSearchResults(response.data);
// //         }
// //       } catch (error: any) {
// //         console.error("Search failed:", error);
// //       }
// //     };

// //     const debounce = setTimeout(searchUsers, 300);
// //     return () => clearTimeout(debounce);
// //   }, [searchQuery]);

// //   const fetchCurrentUser = async () => {
// //     try {
// //       const response = await userAPI.getCurrentUser();
// //       if (response.success) {
// //         setCurrentUser(response.data);
// //       }
// //     } catch (error: any) {
// //       toast.error("Failed to fetch user data");
// //       router.push("/login");
// //     }
// //   };

// //   const fetchConversations = async () => {
// //     try {
// //       const response = await messageAPI.getConversations();
// //       if (response.success) {
// //         setConversations(response.data);
// //       }
// //     } catch (error: any) {
// //       toast.error("Failed to load conversations");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchMessages = async (userId: string) => {
// //     try {
// //       const response = await messageAPI.getMessages(userId);
// //       if (response.success) {
// //         setMessages(response.data);
// //       }
// //     } catch (error: any) {
// //       toast.error("Failed to load messages");
// //     }
// //   };

// //   const handleSelectConversation = async (conversation: Conversation) => {
// //     setSelectedConversation(conversation);
// //     await fetchMessages(conversation.participant._id);
    
// //     if (socket && conversation.unreadCount > 0) {
// //       socket.emit("mark_as_read", { conversationId: conversation._id });
// //     }
// //   };

// //   const handleStartNewChat = async (user: User) => {
// //     const existingConv = conversations.find(
// //       (c) => c.participant._id === user._id
// //     );

// //     if (existingConv) {
// //       handleSelectConversation(existingConv);
// //     } else {
// //       const newConv: Conversation = {
// //         _id: "",
// //         participant: {
// //           _id: user._id,
// //           username: user.username,
// //           fullName: user.fullName,
// //           profilePicture: user.profilePicture || "",
// //         },
// //         lastMessage: null,
// //         unreadCount: 0,
// //         lastMessageTime: new Date(),
// //       };
// //       setSelectedConversation(newConv);
// //       setMessages([]);
// //     }

// //     setShowSearch(false);
// //     setSearchQuery("");
// //   };

// //   const handleSendMessage = async () => {
// //     if (!messageText.trim() || !selectedConversation || !socket) return;

// //     const tempMessage: Message = {
// //       _id: Date.now().toString(),
// //       conversationId: selectedConversation._id,
// //       sender: {
// //         _id: currentUser?._id || "",
// //         username: currentUser?.username || "",
// //         fullName: currentUser?.fullName || "",
// //         profilePicture: currentUser?.profilePicture || "",
// //       },
// //       receiver: selectedConversation.participant,
// //       content: messageText,
// //       messageType: "text",
// //       isRead: false,
// //       isDelivered: false,
// //       createdAt: new Date(),
// //     };

// //     setMessages((prev) => [...prev, tempMessage]);
// //     const contentToSend = messageText;
// //     setMessageText("");
// //     setSending(true);

// //     socket.emit("send_message", {
// //       receiverId: selectedConversation.participant._id,
// //       content: contentToSend,
// //       messageType: "text",
// //     });

// //     socket.emit("typing_stop", {
// //       receiverId: selectedConversation.participant._id,
// //     });

// //     setSending(false);
// //     fetchConversations();
// //   };

// //   const handleTyping = () => {
// //     if (!socket || !selectedConversation) return;

// //     socket.emit("typing_start", {
// //       receiverId: selectedConversation.participant._id,
// //     });

// //     if (typingTimeoutRef.current) {
// //       clearTimeout(typingTimeoutRef.current);
// //     }

// //     typingTimeoutRef.current = setTimeout(() => {
// //       socket.emit("typing_stop", {
// //         receiverId: selectedConversation.participant._id,
// //       });
// //     }, 1000);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
// //         <div className="text-center">
// //           <div className="relative">
// //             <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
// //             <MessageCircle className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
// //           </div>
// //           <p className="text-gray-700 font-semibold text-lg">Loading messages...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
// //       {/* Top Navigation Bar */}
// //       <nav className="bg-white/90 backdrop-blur-xl border-b border-gray-200/60 z-50 shadow-sm">
// //         <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
// //           <button
// //               onClick={() => router.push('/home')}
// //               className="px-4 py-2 hover:bg-gray-100 rounded-xl transition-all flex items-center gap-2 text-sm font-medium text-gray-700"
// //             >
// //               <ArrowLeft className="w-4 h-4" />
// //               <span className="hidden sm:inline">Back</span>
// //             </button>
// //           <div className="flex items-center gap-6">
// //             <button 
// //               onClick={() => router.push('/home')}
// //               className="flex items-center gap-2 group"
// //             >
// //               {/* <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all">
// //                 <Sparkles className="w-5 h-5 text-white" />
// //               </div> */}
// //               <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
// //                 Frendly
// //               </h1>
// //             </button>
// //             {/* <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
// //               <MessageCircle className="w-5 h-5 text-blue-600" />
// //               <span className="font-semibold text-sm text-gray-700">Messages</span>
// //             </div> */}
// //           </div>

// //           <div className="flex items-center gap-3">
            
// //             <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200 ring-2 ring-blue-100">
// //               <img
// //                 src={
// //                   currentUser?.profilePicture ||
// //                   `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.username || 'default'}`
// //                 }
// //                 alt="Profile"
// //                 className="w-full h-full object-cover"
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Main Content */}
// //       <div className="flex-1 flex overflow-hidden">
// //       {/* Conversations List */}
// //       <div
// //         className={`${
// //           selectedConversation ? "hidden md:flex" : "flex"
// //         } w-full md:w-[380px] bg-white/95 backdrop-blur-xl border-r border-gray-200/50 flex-col shadow-xl`}
// //       >
// //         {/* Header */}
// //         <div className="p-5 border-b border-gray-200/50 bg-white">
// //           <div className="flex items-center justify-between mb-4">
// //             <div>
// //               <h2 className="text-xl font-bold text-gray-900">Chats</h2>
// //               <p className="text-xs text-gray-500">{conversations.length} conversations</p>
// //             </div>
// //             <button
// //               onClick={() => setShowSearch(!showSearch)}
// //               className="p-2.5 hover:bg-blue-50 rounded-xl transition-all group"
// //             >
// //               {showSearch ? (
// //                 <X className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
// //               ) : (
// //                 <Search className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
// //               )}
// //             </button>
// //           </div>

// //           {/* Search Bar */}
// //           {showSearch && (
// //             <div className="relative">
// //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
// //               <input
// //                 type="text"
// //                 placeholder="Search users..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="w-full h-11 pl-10 pr-4 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all border border-gray-200"
// //                 autoFocus
// //               />
// //             </div>
// //           )}
// //         </div>

// //         {/* Search Results */}
// //         {showSearch && searchResults.length > 0 && (
// //           <div className="flex-1 overflow-y-auto">
// //             <div className="p-3 bg-gray-50/80">
// //               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
// //                 Search Results ({searchResults.length})
// //               </p>
// //             </div>
// //             {searchResults.map((user) => (
// //               <button
// //                 key={user._id}
// //                 onClick={() => handleStartNewChat(user)}
// //                 className="w-full flex items-center gap-3 p-4 hover:bg-blue-50/50 transition-all border-b border-gray-100/50 group"
// //               >
// //                 <div className="relative">
// //                   <img
// //                     src={
// //                       user.profilePicture ||
// //                       `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
// //                     }
// //                     alt={user.username}
// //                     className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all"
// //                   />
// //                   <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
// //                 </div>
// //                 <div className="flex-1 text-left min-w-0">
// //                   <p className="font-semibold text-sm truncate text-gray-900">
// //                     {user.fullName}
// //                   </p>
// //                   <p className="text-xs text-gray-500 truncate">
// //                     @{user.username}
// //                   </p>
// //                 </div>
// //                 <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
// //               </button>
// //             ))}
// //           </div>
// //         )}

// //         {/* Conversations */}
// //         {!showSearch && (
// //           <div className="flex-1 overflow-y-auto">
// //             {conversations.length === 0 ? (
// //               <div className="flex flex-col items-center justify-center h-full p-8 text-center">
// //                 <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-4">
// //                   <MessageCircle className="w-10 h-10 text-blue-600" />
// //                 </div>
// //                 <h3 className="font-bold text-gray-900 mb-2 text-base">
// //                   No conversations yet
// //                 </h3>
// //                 <p className="text-sm text-gray-500 mb-5">
// //                   Start chatting with your friends
// //                 </p>
// //                 <button
// //                   onClick={() => setShowSearch(true)}
// //                   className="px-5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/40 transition-all text-sm"
// //                 >
// //                   Find Friends
// //                 </button>
// //               </div>
// //             ) : (
// //               <>
// //                 {conversations.map((conversation) => (
// //                   <button
// //                     key={conversation._id}
// //                     onClick={() => handleSelectConversation(conversation)}
// //                     className={`w-full flex items-center gap-3 p-4 hover:bg-blue-50/50 transition-all border-b border-gray-100/50 group ${
// //                       selectedConversation?._id === conversation._id
// //                         ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-blue-600"
// //                         : ""
// //                     }`}
// //                   >
// //                     <div className="relative flex-shrink-0">
// //                       <img
// //                         src={
// //                           conversation.participant.profilePicture ||
// //                           `https://api.dicebear.com/7.x/avataaars/svg?seed=${conversation.participant.username}`
// //                         }
// //                         alt={conversation.participant.username}
// //                         className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all"
// //                       />
// //                       {conversation.unreadCount > 0 && (
// //                         <div className="absolute -top-1 -right-1 min-w-[24px] h-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center px-2 shadow-lg">
// //                           <span className="text-xs text-white font-bold">
// //                             {conversation.unreadCount}
// //                           </span>
// //                         </div>
// //                       )}
// //                       <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
// //                     </div>
// //                     <div className="flex-1 text-left min-w-0">
// //                       <div className="flex items-center justify-between mb-1">
// //                         <p className="font-semibold text-sm truncate text-gray-900">
// //                           {conversation.participant.fullName}
// //                         </p>
// //                         {conversation.lastMessage && (
// //                           <p className="text-xs text-gray-500 ml-2">
// //                             {formatDistanceToNow(
// //                               new Date(conversation.lastMessage.createdAt),
// //                               { addSuffix: true }
// //                             )}
// //                           </p>
// //                         )}
// //                       </div>
// //                       {conversation.lastMessage && (
// //                         <p className={`text-sm truncate ${conversation.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
// //                           {conversation.lastMessage.sender === currentUser?._id
// //                             ? "You: "
// //                             : ""}
// //                           {conversation.lastMessage.content}
// //                         </p>
// //                       )}
// //                     </div>
// //                   </button>
// //                 ))}
// //               </>
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       {/* Chat Area */}
// //       {selectedConversation ? (
// //         <div className="flex-1 flex flex-col bg-white">
// //           {/* Chat Header */}
// //           <div className="flex items-center justify-between p-4 border-b border-gray-200/50 bg-white/95 backdrop-blur-xl shadow-sm">
// //             <div className="flex items-center gap-3">
// //               <button
// //                 onClick={() => setSelectedConversation(null)}
// //                 className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-all"
// //               >
// //                 <ArrowLeft className="w-5 h-5" />
// //               </button>
// //               <div className="relative">
// //                 <img
// //                   src={
// //                     selectedConversation.participant.profilePicture ||
// //                     `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedConversation.participant.username}`
// //                   }
// //                   alt={selectedConversation.participant.username}
// //                   className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-100"
// //                 />
// //                 <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
// //               </div>
// //               <div>
// //                 <p className="font-bold text-sm text-gray-900">
// //                   {selectedConversation.participant.fullName}
// //                 </p>
// //                 <p className="text-xs text-gray-500 flex items-center gap-1">
// //                   {typingUsers.has(selectedConversation.participant._id) ? (
// //                     <>
// //                       <span className="flex gap-1">
// //                         <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"></span>
// //                         <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
// //                         <span className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
// //                       </span>
// //                       <span className="ml-1">typing</span>
// //                     </>
// //                   ) : isConnected ? (
// //                     "Active now"
// //                   ) : (
// //                     "Offline"
// //                   )}
// //                 </p>
// //               </div>
// //             </div>
// //             <div className="flex items-center gap-1">
// //               <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-all group">
// //                 <Phone className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
// //               </button>
// //               <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-all group">
// //                 <Video className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
// //               </button>
// //               <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-all group">
// //                 <Info className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
// //               </button>
// //             </div>
// //           </div>

// //           {/* Messages */}
// //           <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
// //             {messages.length === 0 && (
// //               <div className="flex items-center justify-center h-full">
// //                 <div className="text-center">
// //                   <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-3 rotate-3">
// //                     <Sparkles className="w-8 h-8 text-blue-600" />
// //                   </div>
// //                   <p className="text-gray-600 text-sm font-medium mb-1">
// //                     Say hi to {selectedConversation.participant.fullName.split(' ')[0]}!
// //                   </p>
// //                   <p className="text-gray-400 text-xs">
// //                     Start your conversation below
// //                   </p>
// //                 </div>
// //               </div>
// //             )}
// //             {messages.map((message, index) => {
// //               const isOwn = message.sender._id === currentUser?._id;
// //               const showAvatar =
// //                 index === messages.length - 1 ||
// //                 messages[index + 1]?.sender._id !== message.sender._id;

// //               return (
// //                 <div
// //                   key={message._id}
// //                   className={`flex items-end gap-2 ${
// //                     isOwn ? "flex-row-reverse" : ""
// //                   }`}
// //                 >
// //                   {showAvatar && !isOwn && (
// //                     <img
// //                       src={
// //                         message.sender.profilePicture ||
// //                         `https://api.dicebear.com/7.x/avataaars/svg?seed=${message.sender.username}`
// //                       }
// //                       alt={message.sender.username}
// //                       className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm"
// //                     />
// //                   )}
// //                   {!showAvatar && !isOwn && <div className="w-8" />}
// //                   <div
// //                     className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
// //                       isOwn
// //                         ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-br-sm"
// //                         : "bg-white border border-gray-200 text-gray-900 rounded-bl-sm"
// //                     }`}
// //                   >
// //                     <p className="text-sm break-words leading-relaxed">{message.content}</p>
// //                     <div
// //                       className={`flex items-center gap-1 mt-1 text-xs ${
// //                         isOwn ? "text-blue-100" : "text-gray-500"
// //                       }`}
// //                     >
// //                       <span>
// //                         {new Date(message.createdAt).toLocaleTimeString([], {
// //                           hour: "2-digit",
// //                           minute: "2-digit",
// //                         })}
// //                       </span>
// //                       {isOwn && (
// //                         <>
// //                           {message.isRead ? (
// //                             <CheckCheck className="w-3.5 h-3.5 text-blue-200" />
// //                           ) : message.isDelivered ? (
// //                             <CheckCheck className="w-3.5 h-3.5" />
// //                           ) : (
// //                             <Check className="w-3.5 h-3.5" />
// //                           )}
// //                         </>
// //                       )}
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //             <div ref={messagesEndRef} />
// //           </div>

// //           {/* Message Input */}
// //           <div className="p-4 border-t border-gray-200/50 bg-white/95 backdrop-blur-xl">
// //             <div className="flex items-center gap-2 bg-gray-50 rounded-2xl p-2">
// //               <button className="p-2 hover:bg-gray-200 rounded-xl transition-all group">
// //                 <ImageIcon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
// //               </button>
// //               <button className="p-2 hover:bg-gray-200 rounded-xl transition-all group">
// //                 <Smile className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
// //               </button>
// //               <input
// //                 type="text"
// //                 placeholder="Type a message..."
// //                 value={messageText}
// //                 onChange={(e) => {
// //                   setMessageText(e.target.value);
// //                   handleTyping();
// //                 }}
// //                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
// //                 className="flex-1 h-10 px-4 bg-transparent text-sm outline-none placeholder:text-gray-500"
// //               />
// //               <button
// //                 onClick={handleSendMessage}
// //                 disabled={!messageText.trim() || sending}
// //                 className="p-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
// //               >
// //                 {sending ? (
// //                   <Loader2 className="w-5 h-5 animate-spin" />
// //                 ) : (
// //                   <Send className="w-5 h-5" />
// //                 )}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       ) : (
// //         <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
// //           <div className="text-center max-w-md px-6">
// //             {/* Frendly Badge */}
// //             <div className="flex items-center justify-center gap-2 mb-6">
// //               <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 rotate-3">
// //                 <MessageCircle className="w-7 h-7 text-white" />
// //               </div>
// //               <div className="text-left">
// //                 <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
// //                   Frendly
// //                 </h1>
// //                 <p className="text-xs text-gray-500 font-medium">Messages</p>
// //               </div>
// //             </div>

// //             {/* Welcome Message */}
// //             <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-6">
// //               <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
// //                 <Sparkles className="w-8 h-8 text-blue-600" />
// //               </div>
// //               <h3 className="text-xl font-bold text-gray-900 mb-2">
// //                 Select a conversation
// //               </h3>
// //               <p className="text-gray-500 text-sm leading-relaxed">
// //                 Choose from your existing conversations or start a new chat with your friends
// //               </p>
// //             </div>

// //             {/* Connection Status */}
// //             <div className="flex items-center justify-center gap-2 text-sm">
// //               <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
// //               <span className="text-gray-600 font-medium">
// //                 {isConnected ? "Connected" : "Connecting..."}
// //               </span>
// //             </div>

// //             {/* Quick Tips */}
// //             <div className="mt-8 grid grid-cols-2 gap-3">
// //               <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-100">
// //                 <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
// //                   <MessageCircle className="w-4 h-4 text-blue-600" />
// //                 </div>
// //                 <p className="text-xs font-semibold text-gray-700">Real-time Chat</p>
// //               </div>
// //               <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-100">
// //                 <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
// //                   <Sparkles className="w-4 h-4 text-purple-600" />
// //                 </div>
// //                 <p className="text-xs font-semibold text-gray-700">Stay Connected</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //       </div>
// //     </div>
// //   );
// // }

