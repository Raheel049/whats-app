import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    participants: [
        {
            type: String
        }
    ],

    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
}, {timestamps: true})

export const Chat = mongoose.model("Chat",chatSchema);