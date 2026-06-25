import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { isLoaded, isSignedIn } = useAuth();

  // Jab tak clerk check kar raha hai, screen ko hold rakhein
  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-xl font-medium text-gray-500 animate-pulse">Loading Auth...</h1>
      </div>
    );
  }

  // Agar token nahi mila, toh wapas direct home '/' par bhej do
  if (!isSignedIn) {
    return <Navigate to='/' replace />;
  }

  // Agar user logged in hai, toh nested screens (ChatBoard) open karne do
  return <Outlet />;
};

export default ProtectedRoute;