import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatProvider } from "./context/ChatContext.jsx";

const queryClient = new QueryClient();

// .env file se Publishable Key nikalna
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
// console.log("PUBLISHABLE_KEY", PUBLISHABLE_KEY);

// Agar key nahi milti toh console mein error show hoga taake debugging asaan ho
if (!PUBLISHABLE_KEY) {
  throw new Error(
    "Missing Publishable Key! Make sure you added VITE_CLERK_PUBLISHABLE_KEY to your .env file"
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* Poori App ko ClerkProvider ke andar wrap kar diya */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <ChatProvider>
          <App />
        </ChatProvider>
      </QueryClientProvider>
    </ClerkProvider>
  </BrowserRouter>
);
