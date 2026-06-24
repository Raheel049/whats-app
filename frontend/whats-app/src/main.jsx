import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'

// .env file se Publishable Key nikalna
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log("PUBLISHABLE_KEY",PUBLISHABLE_KEY);

// Agar key nahi milti toh console mein error show hoga taake debugging asaan ho
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key! Make sure you added VITE_CLERK_PUBLISHABLE_KEY to your .env file")
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Poori App ko ClerkProvider ke andar wrap kar diya */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)