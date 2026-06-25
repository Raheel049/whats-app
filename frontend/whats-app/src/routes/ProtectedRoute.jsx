import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { isLoaded, isSignedIn } = useAuth();
  

  if (!isLoaded) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )}

    if(!isSignedIn){
        return <Navigate to='/' replace/>;
    }

  

  return <Outlet />;
};

export default ProtectedRoute;
