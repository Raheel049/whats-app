import Chat from '../models/chat.js'

export const sendMessageLogic = async (chatId, senderId, text, messageType = "text", mediaUrl = "") => {
    try {
        const newMessage = {
            chatId,
            senderId,
            text,
            messageType,
            mediaUrl
        }
    
        await Chat.findByIdAndUpdate(chatId, {
            lastMessage: newMessage._id
        });
    
        return newMessage;
    } catch (error) {
        console.error("Message not saved", error)
        return null
    }
}