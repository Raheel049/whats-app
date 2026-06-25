import React from 'react'
import { SignInButton, SignUpButton, SignedOut, useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router'


const Home = () => {

  const {user, isSignedIn} = useUser()

  if(isSignedIn){
    return <Navigate to='/ChatBoard' />
  }
  console.log(user.firstName)
  return (
    <div className='flex flex-col justify-around items-center mt-4 bg-[#F5F5F7] h-[80vh] w-full'>
        <h1 className='w-95 text-center mt-4 font-semibold text-3xl'>CONNECT SECUERLY WITH TECH INSIDER CHAT</h1>
        <p className='w-95 text-center mt-4'>Experience seamless messaging with friends, family and colleagues Simple powerful and secure.</p>
        <div className='flex flex-col mt-6 mb-6 justify-around items-center w-[300px] h-auto bg-[#FFFFFD] rounded-md
        shadow-[0_15px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] border border-gray-300 mt-4 p-2 text-sm'>
            <h1 className='text-center font-medium text-xl'>SIGN UP</h1>
            <SignedOut>
              <SignUpButton mode='modal'>
            <button className='w-50 h-10 rounded-sm bg-[#359347] cursor-pointer text-white'>Get Start - Sign Up for free</button>

              </SignUpButton>
            </SignedOut>
            <p>Join the community in seconds.</p>
        </div>

        <div className='flex flex-col  w-[300px] h-auto border border-gray-300 rounded-md shadow-[0px_15px_9px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] bg-white p-2'>
            <h1 className='text-center font-semibold '>LOG IN</h1>
            <p className='text-sm text-center'>Already have an account? <span className='text-blue-500 cursor-pointer'><SignInButton mode='modal' /></span></p>
        </div>
    </div>
  )
}

export default Home