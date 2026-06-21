import { useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import axios from 'axios';

export default function SyncUser() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const syncData = async () => {
      // Agar user login ho chuka hai aur data load ho gaya hai
      if (isLoaded && isSignedIn && user) {
        try {
          // Clerk se secure login token generate karwana
          const token = await getToken();

          // Apne local backend par direct hit marna
          await axios.post('http://localhost:5000/api/users/sync-user', {
            clerkUserId: user.id,
            name: user.fullName,
            email: user.primaryEmailAddress?.emailAddress,
            avatar: user.imageUrl
          }, {
            headers: {
              // Token header mein bhej rahe hain security ke liye
              Authorization: `Bearer ${token}`
            }
          });

          console.log("User MongoDB ke sath sync ho gaya!");
        } catch (error) {
          console.error("Frontend sync failed:", error);
        }
      }
    };

    syncData();
  }, [isLoaded, isSignedIn, user, getToken]);

  return null; // Iska koi UI nahi hoga, yeh background mein chalega
}