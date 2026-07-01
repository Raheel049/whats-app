import React, { useEffect, useState } from 'react'
import { IoEllipsisVertical, IoAttach, IoSend } from 'react-icons/io5'
import { BsEmojiSmile } from 'react-icons/bs'
import { io } from 'socket.io-client'
// 🌟 FIX: Folder ka naam check karke sahi import karein ('utils' ya 'utlis')
import axiosInstance from '../utlis/axiosInstance' 
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useChatState } from '../context/ChatContext' 


let socket;

const ChatBoard = () => {
  const { activeChat, setActiveChat, selectUser: selectedUser, setSelectUser: setSelectedUser } = useChatState();
  const [messageText, setMessageText] = useState("");
  
  

  // Socket Connection Effect
  useEffect(() => {
    socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("User connected to socket server:", socket.id);
    });

    if (activeChat?._id) {
      socket.emit("join_chat", activeChat._id);
      console.log("Joined Room:", activeChat._id);
    }

    return () => {
      socket.disconnect();
    }
  }, [activeChat?._id]);

  // React Query: Fetch Users
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ['availableUsers'],
    queryFn: async () => {
      // 🌟 Tip: Agar axiosInstance me pehle se '/api' base URL laga ha to sirf '/users/all' likhein
      const res = await axiosInstance.get('/users/all');
      // console.log(res)
      return res.data;
    }
  });

  const {data : messages, isLoading: isMessagesLoading } = useQuery({
    queryKey: ['chatMessages', activeChat?._id],
    queryFn: async () => {
      if (!activeChat?._id) return [];
      const res = await axiosInstance.get(`/chats/message/all/${activeChat._id}`);
      // console.log(res.data)
      return res.data;
    },
    enabled: !!activeChat?._id,
  }) 

  console.log(activeChat)

  const queryClient = useQueryClient();

  const {mutate: sendMessageMutate, isPending: isSending} = useMutation({
    mutationFn: async (newComment) => {
      const res = await axiosInstance.post("/chats/send", {
        chatId: activeChat._id,
        content: newComment
      });
      

      return res.data;
    },

    onSuccess: (data) => {
      // console.log("Message send success",data)
      setMessageText("")
      queryClient.invalidateQueries({ queryKey: ['availableUsers'] });
      queryClient.invalidateQueries({ queryKey: ['chatMessages', activeChat?._id] });
    },

    onError: (error) => {
      console.log("Message send error:", error)
    }
  })

  // Sidebar user click handler
  const handleUserClick = async (clickedUser) => {
    try {
      // 🌟 Tip: Axios Base URL ke mutabiq endpoint checks lazmi hain
      const res = await axiosInstance.post('/chats/access', { receiverId: clickedUser.clerkUserId });
      
      // console.log(res.data)
      // console.log(clickedUser)
      setActiveChat(res.data); 
      setSelectedUser(clickedUser); 
    } catch (error) {
      console.error("Chat access karne me error:", error);
    }
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center text-gray-600 font-medium">Users load ho rahe hain...</div>
  
  if (isError) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-red-500 gap-2">
        <p className="font-medium">Error loading users!</p>
        <p className="text-xs text-gray-400">{error?.message}</p>
      </div>
    )
  }

  



  const handleSendMessage = async () => {
    sendMessageMutate(messageText)
  }
  // console.log(selectedUser)
//  console.log(activeChat)

  return (
    <div className="w-full h-[90vh] bg-[#d8e6ef] flex flex-col overflow-hidden font-sans">
      <div className="flex flex-1 w-full max-w-7xl mx-auto px-4 py-4 gap-6 overflow-hidden">
        
        {/* ==================== SIDEBAR ==================== */}
        <div className="w-1/3 bg-white rounded-xl shadow-lg border border-gray-200/50 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 shrink-0">
            <h2 className="text-sm font-bold tracking-wider text-gray-400 uppercase">Chats</h2>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {users && users.length > 0 ? (
              users.map((user) => (
                <div 
                  key={user._id}
                  onClick={() => handleUserClick(user)}
                  className={`flex items-center gap-3 p-4 transition cursor-pointer hover:bg-gray-50 ${
                    selectedUser?.clerkUserId === user.clerkUserId ? 'bg-gray-100' : ''
                  }`}
                >
                  <div className="w-11 h-11 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold shrink-0 overflow-hidden">
                    {user.avatar ? <img src={user.avatar} alt="profile" className="w-full h-full object-cover" /> : "👤"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-800 truncate">{user.name}</h4>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{activeChat?.lastMessage?.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-gray-400">No other users found</div>
            )}
          </div>
        </div>

        {/* ==================== CHAT WINDOW ==================== */}
        <div className="w-2/3 bg-white rounded-xl shadow-lg border border-gray-200/50 flex flex-col overflow-hidden">
          {activeChat ? (
            <>
              {/* Header */}
              <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center shrink-0">
                <div className='flex'>
                  <div>
                    {selectedUser.avatar ? <img src={selectedUser.avatar} alt="profile" className=" h-[50px] w-[50px] rounded-full  object-cover" /> : "👤"}
                    
                  </div>
                  <div className='pl-2'>
                  <h3 className="text-sm font-bold text-gray-800 tracking-wide uppercase">
                    {selectedUser?.name}
                  </h3>
                  <p className="text-xs text-emerald-600 font-medium mt-0.5">online</p>
                  </div>

                  
                </div>
                <IoEllipsisVertical className="text-gray-400 text-lg cursor-pointer" />
              </div>

              {/* Messages Center */}
              <div className="flex-1 p-6 overflow-y-auto bg-gray-50/30 flex flex-col gap-4">
                {isMessagesLoading ? (
                  <p className="text-xs text-center text-gray-400">Loading messages...</p>
                ) : messages && messages.length > 0 ? (
                  messages.map((msg) => {
                    // Check karo message kis ne bheja ha? (Aapne ya samne wale ne?)
                    // Agar message ki senderId humare selectedUser se match nahi krti, iska mtlb humne bheja ha
                    // const isMyMessage = msg.senderId?.clerkUserId === selectedUser?.clerkUserId ? false : true;
                    const senderMongoId = msg.senderId?._id ? msg.senderId._id.toString() : msg.senderId?.toString();
                    const selectedUserMongoId = selectedUser?._id?.toString();

                    const isMyMessage = senderMongoId === selectedUserMongoId ? false : true;
                    return (
                      <div
                        key={msg._id}
                        className={`flex w-full ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-md px-4 py-2 rounded-xl text-sm shadow-sm ${
                            isMyMessage
                              ? 'bg-[#005e54] text-white rounded-tr-none'
                              : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <span className={`text-[9px] block text-right mt-1 ${isMyMessage ? 'text-gray-200' : 'text-gray-400'}`}>
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-center text-gray-400">No messages yet. Say Hi! 👋</p>
                )}
              </div>

              {/* Input Box */}
              <div className="p-4 border-t border-gray-100 bg-white shrink-0 flex items-center gap-3">
                <input 
                  type="text" 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                />
                <button className="bg-[#005e54] text-white p-2.5 rounded-full shadow-md" onClick={handleSendMessage}>
                  <IoSend />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-400 gap-2">
              <span className="text-5xl">💬</span>
              <p className="text-sm font-medium">Select a user to start chatting</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default ChatBoard;