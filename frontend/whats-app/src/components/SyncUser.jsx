import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import axiosInstance from '../utlis/axiosInstance';
import toast from 'react-hot-toast';

export default function SyncUser() {
  const { isLoaded, isSignedIn, user } = useUser();
  

  useEffect(() => {
    const syncData = async () => {
      // Agar user login ho chuka hai aur data load ho gaya hai
      if (isLoaded && isSignedIn && user) {
        try {
          

          // Apne local backend par direct hit marna
          await axiosInstance.post('/users/sync-user', {
            clerkUserId: user.id,
            name: user.fullName,
            email: user.primaryEmailAddress?.emailAddress,
            avatar: user.imageUrl
          });

          console.log("User MongoDB ke sath sync ho gaya!");
          toast.success("Welcome! Login Successful.")
        } catch (error) {
          console.error("Frontend sync failed:", error);
          toast.error("Failed to sync user with server.")
        }
      }
    };

    syncData();
  }, [isLoaded, isSignedIn, user]);

  return null; // Iska koi UI nahi hoga, yeh background mein chalega
}