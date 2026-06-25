import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import SyncUser from "./components/SyncUser";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import ChatBoard from "./pages/ChatBoard";

function App() {
  return (
    <div>

      <Routes>
        <Route element={<Navbar />}>
        <Route path='/' element={<Home />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/ChatBoard" element={<ChatBoard />} />
        </Route>

        </Route>
      </Routes>
    </div>

    // Tailwind classes check karein: min-h-screen aur bg-emerald-100 pure page par apply hongi
    // <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-100 font-sans">

    //   {/* 1. Toaster ko sab se upar baher rkhna ha taake pure project me kahi bhi toast chale */}
    //   <Toaster position="top-left" reverseOrder={false} />

    //   <header className="absolute top-5 right-5 bg-white p-3 rounded-xl shadow-md flex items-center gap-4">
    //     <SignedOut>
    //       {/* Clerk button par direct styling nahi lagti, isliye iske andar apna custom button dalein */}
    //       <SignInButton mode="modal">
    //         <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg transition">
    //           Sign In to WhatsApp
    //         </button>
    //       </SignInButton>
    //     </SignedOut>

    //     <SignedIn>
    //       <div className="flex items-center gap-3">
    //         <UserButton afterSignOutUrl="/" />
    //         <span className="text-sm font-semibold text-gray-700">Profile active</span>
    //       </div>
    //       {/* Engine background me chale ga */}
    //       <SyncUser />
    //     </SignedIn>
    //   </header>

    //   <main className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md mx-4">
    //     {/* FIX: 'color-red' ki jagah 'text-red-600' aur mazeed Tailwind classes text ko bara krne ke liye */}
    //     <h1 className="text-3xl font-extrabold text-red-600 mb-2">
    //       Welcome to WhatsApp Clone
    //     </h1>
    //     <p className="text-gray-500 text-sm">
    //       Aapka Tailwind CSS aur Clerk setup ab completely configuration ke sath ready hai.
    //     </p>
    //   </main>
    // </div>
  );
}

export default App;
