import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
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
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {/* 1. Global Toaster: Pure project me kahi bhi alerts chalane ke liye */}
      <Toaster position="top-left" reverseOrder={false} />

      {/* 2. Background Engine: Jab tak user login hai, data chupke se sync hota rahega */}
      <SignedIn>
        <SyncUser />
      </SignedIn>

      {/* 3. Main Project Routes */}
      <Routes>
        {/* Layout wrapper: Navbar in sabhi routes par top par dikhegi */}
        <Route element={<Navbar />}>
        <Route path='/' element={<Home />} />
          
          {/* Strict Protected Routes: Sirf logged-in users ke liye */}
          <Route element={<ProtectedRoute />}>
            <Route path="/ChatBoard" element={<ChatBoard />} />
          </Route>

        </Route>
      </Routes>
    </div>
  );
}

export default App;