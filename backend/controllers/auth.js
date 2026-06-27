import userModel from '../models/User.js'; // Note: ES6 mein '.js' extension lagana lazmi hota hai local files ke sath

export const signUp = async (req, res) => {
   
    const { clerkUserId, name, email, avatar } = req.body;
  
    try {
      // Upsert query: Agar user pehle se hai toh update karo, nahi hai toh naya banao
      const user = await userModel.findOneAndUpdate(
        { clerkUserId }, 
        { name, email, avatar }, 
        { new: true, upsert: true } 
      );
  
      res.status(200).json({ success: true, message: "User synced successfully!", user });
    } catch (error) {
      console.error("Database sync error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }



export const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.auth.userId; // Clerk ki ID jo login ha

    // Apne ilawa baqi saare users database se nikalen
    const users = await userModel.find({ clerkId: { $ne: loggedInUserId } });
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Users list nahi mil saki" });
  }
};