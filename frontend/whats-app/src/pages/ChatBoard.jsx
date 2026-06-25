import React from 'react'
import { IoEllipsisVertical, IoAttach, IoSend } from 'react-icons/io5'
import { BsEmojiSmile } from 'react-icons/bs'


const ChatBoard = () => {
  return (
    <div className="w-full h-[90vh] bg-[#d8e6ef] flex flex-col overflow-hidden font-sans">
      

      

      {/* 2. LOWER CONTENT AREA (Sidebar + Chat Window) */}
      <div className="flex flex-1 w-full max-w-7xl mx-auto px-4 py-4 gap-6 overflow-hidden">
        
        {/* ==================== LEFT SIDEBAR: CHATS LIST ==================== */}
        <div className="w-1/3 bg-white rounded-xl shadow-lg border border-gray-200/50 flex flex-col overflow-hidden">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-100 shrink-0">
            <h2 className="text-sm font-bold tracking-wider text-gray-400 uppercase">Chats</h2>
          </div>

          {/* Chats Scrollable Area */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {/* Active Chat Item Example */}
            <div className="flex items-center gap-3 p-4 bg-gray-100 cursor-pointer transition">
              <div className="w-11 h-11 rounded-full bg-gray-300 flex items-center justify-center text-xl shrink-0">⚙️</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm font-bold text-gray-800 truncate">Tech Insiders</h4>
                  <span className="text-xs text-gray-400 font-medium">12:38 PM</span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5"><span className="font-semibold text-gray-700">Raheel:</span> Check out this screenshot!</p>
              </div>
              <span className="bg-[#005e54] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shrink-0">5</span>
            </div>

            {/* Dummy Chat Item 2 */}
            <div className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition">
              <div className="w-11 h-11 rounded-full bg-gray-200 shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm font-semibold text-gray-800 truncate">Project Alpha</h4>
                  <span className="text-xs text-gray-400">12:39 PM</span>
                </div>
                <p className="text-xs text-gray-400 truncate mt-0.5">Group: Project Alpha be able to lite...</p>
              </div>
              <span className="bg-[#005e54] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shrink-0">3</span>
            </div>
            
            {/* Mazeed items loop yahan chalayein ge */}
          </div>
        </div>

        {/* ==================== RIGHT SIDEBAR: ACTIVE CHAT WINDOW ==================== */}
        <div className="w-2/3 bg-white rounded-xl shadow-lg border border-gray-200/50 flex flex-col overflow-hidden">
          
          {/* Chat Window Header */}
          <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center shrink-0">
            <div>
              <h3 className="text-sm font-bold text-gray-800 tracking-wide uppercase">Tech Insiders</h3>
              <p className="text-xs text-gray-400 font-medium mt-0.5">5 members online</p>
            </div>
            <IoEllipsisVertical className="text-gray-400 text-lg cursor-pointer hover:text-gray-600" />
          </div>

          {/* Messages Area (Scrollable) */}
          <div className="flex-1 p-6 overflow-y-auto bg-gray-50/30 flex flex-col gap-4">
            
            {/* Incoming Message Text */}
            <div className="flex items-start gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-sky-500 shrink-0"></div>
              <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 relative">
                <p className="text-xs font-bold text-sky-600">Alex</p>
                <p className="text-sm text-gray-800 mt-0.5">Hey team, here's the design update.</p>
                <span className="block text-[10px] text-gray-400 text-right mt-1 font-medium">12:31 PM</span>
              </div>
            </div>

            {/* Incoming Message Image/Media */}
            <div className="flex items-start gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-emerald-500 shrink-0"></div>
              <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                <p className="text-xs font-bold text-emerald-600">Raheel</p>
                <p className="text-sm text-gray-800 mt-0.5">Check out this screenshot!</p>
                
                {/* Image Container */}
                <div className="mt-2 rounded-lg overflow-hidden border border-gray-100 max-w-[240px]">
                  <img src="https://via.placeholder.com/300x180" alt="shared-ui" className="w-full object-cover" />
                </div>
                <span className="block text-[10px] text-gray-400 text-right mt-1 font-medium">12:32 PM</span>
              </div>
            </div>

          </div>

          {/* Chat Window Input Bottom Bar */}
          <div className="p-4 border-t border-gray-100 bg-white shrink-0 flex items-center gap-3">
            <button className="text-gray-400 hover:text-gray-600 text-xl transition">
              <IoAttach />
            </button>
            
            <div className="flex-1 bg-gray-50 border border-gray-200/60 rounded-xl px-4 py-2.5 flex items-center gap-2">
              <input 
                type="text" 
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

        </div>

      </div>
    </div>
  )
}

export default ChatBoard