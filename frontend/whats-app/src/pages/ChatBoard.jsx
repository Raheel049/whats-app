import React, { useEffect, useState } from 'react'
import { IoEllipsisVertical, IoAttach, IoSend } from 'react-icons/io5'
import { BsEmojiSmile } from 'react-icons/bs'
import { io } from 'socket.io-client'
import axiosInstance from '../utlis/axiosInstance' // Agar folder 'utils' ha to name theek krlein
import { useQuery } from '@tanstack/react-query'

// Global socket variable placeholder
let socket;

const ChatBoard = () => {
  // 🌟 CONTEXT KI JAGAH LOCAL STATES: Kisi extra file ki zaroorat nahi
  const [activeChat, setActiveChat] = useState(null); // Isme backend ki chatId wagera aayegi
  const [selectedUser, setSelectedUser] = useState(null); // Isme click kiye gaye user ki info hogi
  const [messageText, setMessageText] = useState("");

  // 1. SOCKET CONNECTION EFFECT
  useEffect(() => {
    socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("User connected to socket server:", socket.id);
    });

    // Agar user ne kisi chat par click kiya ha, toh uska personal room join karlo
    if (activeChat?._id) {
      socket.emit("join_chat", activeChat._id);
      console.log("Room Joined successfully:", activeChat._id);
    }

    return () => {
      socket.disconnect();
    }
  }, [activeChat?._id]); // Jab bhi activeChat badle gi, naya socket room join hoga

  // 2. REACT QUERY: FETCH USERS FROM MONGODB
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['availableUsers'],
    queryFn: async () => {
      const res = await axiosInstance.get('/users/all');
      return res.data;
    }
  });

  // Sidebar ke kisi user par click karne ka function
  const handleUserClick = async (clickedUser) => {
    try {
      // Backend par hit karein jo ya to purani chatId dhoondega ya nayi banayega
      const res = await axiosInstance.post('/chats/access', { receiverId: clickedUser.clerkId });
      
      setActiveChat(res.data); // Backend se aayi hui chatId aur details save kiye
      setSelectedUser(clickedUser); // Frontend pr dikhane ke liye user info save ki
    } catch (error) {
      console.error("Chat access karne me error:", error);
    }
  };

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center font-medium text-gray-500 animate-pulse">Users load ho rahe hain...</div>
  }

  if (isError) {
    return <div className="h-screen flex items-center justify-center text-red-500 font-medium">Users lane me masla hua!</div>
  }

  return (
    <div className="w-full h-[90vh] bg-[#d8e6ef] flex flex-col overflow-hidden font-sans">
      
      {/* LOWER CONTENT AREA */}
      <div className="flex flex-1 w-full max-w-7xl mx-auto px-4 py-4 gap-6 overflow-hidden">
        
        {/* ==================== LEFT SIDEBAR: CHATS LIST ==================== */}
        <div className="w-1/3 bg-white rounded-xl shadow-lg border border-gray-200/50 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 shrink-0">
            <h2 className="text-sm font-bold tracking-wider text-gray-400 uppercase">Chats</h2>
          </div>

          {/* Users List Container */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {users?.map((user) => (
              <div 
                key={user._id}
                onClick={() => handleUserClick(user)} // Click par dono local states update hongi
                className={`flex items-center gap-3 p-4 transition cursor-pointer hover:bg-gray-50 active:bg-gray-100 ${
                  selectedUser?.clerkId === user.clerkId ? 'bg-gray-100' : ''
                }`}
              >
                {/* User Avatar */}
                <div className="w-11 h-11 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold shrink-0 overflow-hidden border border-gray-200">
                  {user.avatar ? <img src={user.avatar} alt="profile" className="w-full h-full object-cover" /> : "👤"}
                </div>
                
                {/* User Text Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-sm font-bold text-gray-800 truncate">
                      {user.firstName} {user.lastName}
                    </h4>
                    <span className="text-xs text-gray-400 font-medium shrink-0">12:38 PM</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">Click to chat</p>
                </div>

                <span className="bg-[#005e54] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shrink-0">1</span>
              </div>
            ))}
          </div>
        </div>

        {/* ==================== RIGHT SIDEBAR: ACTIVE CHAT WINDOW ==================== */}
        <div className="w-2/3 bg-white rounded-xl shadow-lg border border-gray-200/50 flex flex-col overflow-hidden">
          
          {activeChat ? (
            <>
              {/* Active Chat Header */}
              <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center shrink-0">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 tracking-wide uppercase">
                    {selectedUser?.firstName} {selectedUser?.lastName}
                  </h3>
                  <p className="text-xs text-emerald-600 font-medium mt-0.5">Online</p>
                </div>
                <IoEllipsisVertical className="text-gray-400 text-lg cursor-pointer hover:text-gray-600" />
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 p-6 overflow-y-auto bg-gray-50/30 flex flex-col gap-4">
                <div className="flex items-start gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-sky-500 shrink-0"></div>
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 relative">
                    <p className="text-xs font-bold text-sky-600">{selectedUser?.firstName}</p>
                    <p className="text-sm text-gray-800 mt-0.5">Hey! Let's start the chat.</p>
                    <span className="block text-[10px] text-gray-400 text-right mt-1 font-medium">12:31 PM</span>
                  </div>
                </div>
              </div>

              {/* Message Input Form */}
              <div className="p-4 border-t border-gray-100 bg-white shrink-0 flex items-center gap-3">
                <button className="text-gray-400 hover:text-gray-600 text-xl transition">
                  <IoAttach />
                </button>
                
                <div className="flex-1 bg-gray-50 border border-gray-200/60 rounded-xl px-4 py-2.5 flex items-center gap-2">
                  <input 
                    type="text" 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..." 
                    className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                  />
                  <button className="text-gray-400 hover:text-gray-600 text-lg transition">
                    <BsEmojiSmile />
                  </button>
                </div>

                <button className="bg-[#005e54] hover:bg-[#004d43] text-white p-2.5 rounded-full shadow-md transition shrink-0 flex items-center justify-center">
                  <IoSend className="text-sm translate-x-[1px]" />
                </button>
              </div>
            </>
          ) : (
            /* Blank state screens */
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-400 gap-2">
              <span className="text-5xl">💬</span>
              <p className="text-sm font-medium">Select a user from sidebar to start chatting</p>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}

export default ChatBoard;             