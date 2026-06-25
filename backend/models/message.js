import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },

    senderId: {
        type: String,
        required: true
    },

    messageType: {
        type: String,
        enum: ['text', 'image', 'video', 'file'],
        default: 'text',
    },

    text: {
        type: String,
        default: '',
    },

    mediaUrl: {
        type: String,
        default: '',
    }
}, {timestamps: true})

export const Message = mongoose.model("Message", messageSchema);
