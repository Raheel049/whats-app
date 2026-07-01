import express from 'express'
import { accsaaChat, getAllMessage, sendMessage } from '../controllers/message.js'
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'

const messageRoute = express.Router()

messageRoute.post("/access",ClerkExpressRequireAuth(), accsaaChat);

messageRoute.post("/send", ClerkExpressRequireAuth(), sendMessage);

messageRoute.get("/message/all/:chatId", getAllMessage);

export default messageRoute