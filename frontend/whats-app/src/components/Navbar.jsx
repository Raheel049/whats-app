import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Outlet } from "react-router";
import { CiSearch } from "react-icons/ci";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { IoSearchOutline, IoEllipsisVertical, } from 'react-icons/io5'
import { FiUsers, FiCircle } from 'react-icons/fi'

const Navbar = () => {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      
      {/* --- HEADER BAR --- */}
      <div className="flex justify-between items-center h-12 w-full bg-[#106055] px-6 shrink-0 shadow-md z-50">
        
        {/* Left Side: Logo & Brand */}
        <div className="flex items-center gap-3">
          <FaWhatsapp className="text-[#4fc65e]" size={28} />
          <h1 className="text-white font-semibold text-sm tracking-wide">
            Tech Insider Chat
          </h1>
        </div>

        {/* Center/Right-ish: Custom Search Bar */}
        <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 transition px-3 py-1 rounded-lg border border-white/10 max-w-xs w-48 sm:w-64">
          <CiSearch className="text-white/80 shrink-0" size={18} /> 
          <input 
            type="text" 
            placeholder="Search..." 
            className="outline-none bg-transparent text-white text-xs placeholder-white/60 w-full" 
          />
        </div>

        {/* Right Side: Profile User Button */}
        <div className="flex items-center">
          <SignedIn>
            {/* UserButton wrapper taake customization properly screen par dikhe */}
            <div className="scale-90 hover:opacity-90 transition pr-2">
              <UserButton/>
            </div>
            <div className="flex items-center gap-5 text-xl">
          <IoSearchOutline className="cursor-pointer opacity-80 hover:opacity-100 text-white" />
          <FiUsers className="cursor-pointer opacity-80 hover:opacity-100 text-white" />
          <FiCircle className="cursor-pointer opacity-80 hover:opacity-100 text-white" />
          <IoEllipsisVertical className="cursor-pointer opacity-80 hover:opacity-100 text-white" />
        </div>
          </SignedIn>
        </div>

      </div>

      {/* --- MAIN CONTENT AREA (Outlet Screens) --- */}
      {/* FIX: h-[calc(100vh-48px)] me spaces theek kr diye hain aur screen full block ha */}
      <main className="flex-1 h-[calc(100vh-48px)] w-full bg-[#f0f2f5] overflow-hidden">
        <Outlet />
      </main>

    </div>
  );
};

export default Navbar;