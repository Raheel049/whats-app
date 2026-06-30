import Chat from '../models/chat.js'
import Message  from '../models/Message.js';
import userModel from '../models/User.js';

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


export const fetchMessages = async (req, res) => {
    const {receiverId} = req.body
    const currentUserId = req.auth.userId

    if(!receiverId || !currentUserId){
        return res.status(400).json({message: "Users Id not found"});
    }

    try {

        const currentUser = await userModel.findOne({clerkUserId: currentUserId});
        const receiverUser = await userModel.findOne({clerkUserId: receiverId});

        if (!currentUser || !receiverUser) {
            return res.status(404).json({ message: "User not found in database" });
        }

        let isChatExist = await Chat.findOne({
            isGroupChat: false,
            participants: { $all: [currentUser._id, receiverUser._id]}
        })
        .populate("participants", "-password")
        .populate("latestMessage");
        console.log("chatIs",isChatExist);
        if(isChatExist){
            return res.status(200).json(isChatExist)
        }

        const newChatData = {
            isGroupChat: false,
            participants: [currentUser._id, receiverUser._id]
        }

        const createdChat = await Chat.create(newChatData)

        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("participants", "-password");
        
        return res.status(200).json(fullChat);

    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

export const sendMessage = async (req, res) => {
    const {chatId, content} = req.body
    const currentUserId = req.auth.userId
    console.log("Api his",currentUserId)
    console.log(content)

    if(!chatId || !content || !currentUserId){
        res.status(400).json({message: "Required fields are missing"})
    }
    try {
        const currentUser = await userModel.findOne({clerkUserId : currentUserId})
        if(!currentUser){
            return res.status(404).json({messgae: "User not found"})
        }
        console.log(currentUser._id);


        let message = await Message.create({
            senderId: currentUser._id,
            text: content,
            chatId: chatId
        }) 

        message = await message.populate("senderId", "name avatar")
        message = await message.populate("chatId")

        await Chat.findByIdAndUpdate(chatId, {
            lastMessage: message._id
        })

        return res.status(200).json(message)
    } catch (error) {
        res.status(500).json({message: error.message ||  "Internal server error"})
    }




}