import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Outlet } from "react-router";
import { CiSearch } from "react-icons/ci";
import { SignedIn, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between items-center h-[40px] w-full bg-[#106055] sticky top-0">
        <div className="flex w-auto justify-between items-center ml-10 gap-5">
          <FaWhatsapp color="white" fill="#4fc65e" size="30px" />
          <h1 className="text-white">Tech Insider Chat</h1>
        </div>
        <div className="flex w-auto items-center justify-between gap-2 ">
       <CiSearch color="white" size='20px'/> <input type="text" placeholder="Search... " className="outline-none h-[40px] w-[150px] text-white placeholder-white" />

        </div>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <main className='h-[calc(100vh - 40px)]'>
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;
