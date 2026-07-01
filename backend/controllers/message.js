import Chat from '../models/chat.js'
import Message  from '../models/Message.js';
import userModel from '../models/User.js';

// export const sendMessageLogic = async (chatId, senderId, text, messageType = "text", mediaUrl = "") => {
//     try {
//         const newMessage = {
//             chatId,
//             senderId,
//             text,
//             messageType,
//             mediaUrl
//         }
    
//         await Chat.findByIdAndUpdate(chatId, {
//             lastMessage: newMessage._id
//         });
    
//         return newMessage;
//     } catch (error) {
//         console.error("Message not saved", error)
//         return null
//     }
// }


export const accsaaChat = async (req, res) => {
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
        const currentUserStr = currentUser._id.toString();
        const receiverUserStr = receiverUser._id.toString();

        let isChatExist = await Chat.findOne({
    
            participants: { $all: [currentUserStr, receiverUserStr] }
        }).populate("lastMessage");
        console.log("chatIs",isChatExist);
        if(isChatExist){
            return res.status(200).json(isChatExist)
        }

        const newChatData = {
            isGroupChat: false,
            participants: [currentUserStr, receiverUserStr]
        }

        const createdChat = await Chat.create(newChatData)
        
        return res.status(200).json(createdChat);

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


export const getAllMessage = async (req, res) => {
    const {chatId} = req.params
    console.log("chatidformssage",chatId);
    if(!chatId){
        return res.status(400).json({message: "Required fields are misssing"})
    }

    try {
        const isChat = await Chat.findById(chatId)
        if(!isChat){
            return res.status(404).json({message: "Messages are not found in db"})
        }

        const messages = await Message.find({chatId: chatId}).populate("senderId", "name avatar email").sort({createdAt: 1})
        return res.status(200).json(messages);

    } catch (error) {
        return res.status(500).json({message: error.message || "Internal server error"});
    }
}