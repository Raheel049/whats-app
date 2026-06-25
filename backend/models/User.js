import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, unique: true }, // Clerk ki unique User ID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String }, // User ki profile picture
  status: { type: String, default: "Available" },
  isOnline: { type: Boolean, default: false },
  lastSeen: { type: Date, default: Date.now }
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema)
export default userModel