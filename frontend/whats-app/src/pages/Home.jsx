import React from 'react'
import { SignInButton, SignUpButton, SignedOut, useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router'

const Home = () => {
  // isLoaded lagana zaroori hai taake check loading complete ho jaye
  const { user, isSignedIn, isLoaded } = useUser()

  // Jab tak Clerk state check kar raha hai, return khali ya loading
  if (!isLoaded) {
    return <div className="h-screen flex items-center justify-center bg-[#F5F5F7]">Loading...</div>
  }

  // Agar user pehle se logged in hai, toh chup-chaap ChatBoard bhej do
  if (isSignedIn) {
    return <Navigate to='/ChatBoard' replace />
  }

  // FIX: Optional chaining 'user?.firstName' use karein taake bina login crash na ho
  console.log("Current User:", user?.firstName)

  return (
    <div className='flex flex-col justify-center gap-8 items-center bg-[#F5F5F7] min-h-[calc(100-16)] py-10 w-full font-sans'>
        
        <div className="text-center max-w-xl px-4">
          <h1 className='text-center font-bold text-gray-800 text-3xl tracking-wide uppercase leading-snug'>
            CONNECT SECURELY WITH <br/><span className="text-[#359347]">TECH INSIDER CHAT</span>
          </h1>
          <p className='text-center mt-3 text-gray-500 text-sm md:text-base max-w-md mx-auto'>
            Experience seamless messaging with friends, family and colleagues. Simple, powerful and secure.
          </p>
        </div>

        {/* --- SIGN UP CARD --- */}
        <div className='flex flex-col gap-4 justify-center items-center w-[320px] bg-white rounded-xl shadow-[0_15px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.05)] border border-gray-200 p-2 text-sm text-center'>
            <h1 className='font-bold text-gray-700 text-lg tracking-wider uppercase'>SIGN UP</h1>
            
            <SignedOut>
              <SignUpButton mode='modal'>
                <button className='w-10/12 h-11 rounded-lg bg-[#359347] hover:bg-[#2d7d3c] transition font-medium cursor-pointer text-white shadow-sm'>
                  Get Started - Sign Up for free
                </button>
              </SignUpButton>
            </SignedOut>
            
            <p className="text-gray-400 text-xs">Join the community in seconds.</p>
        </div>

        {/* --- LOG IN CARD --- */}
        <div className='flex flex-col gap-3 w-[320px] border border-gray-200 rounded-xl shadow-[0_15px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.05)] bg-white p-6 text-center'>
            <h1 className='font-bold text-gray-700 text-lg tracking-wider uppercase'>LOG IN</h1>
            <p className='text-sm text-gray-500'>
              Already have an account?{' '}
              <SignInButton mode='modal'>
                <span className='text-blue-600 font-semibold cursor-pointer hover:underline'>
                  Log in here
                </span>
              </SignInButton>
            </p>
        </div>
    </div>
  )
}

export default Home