import express from 'express'
import { fetchMessages, sendMessage } from '../controllers/message.js'
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'

const messageRoute = express.Router()

messageRoute.post("/access",ClerkExpressRequireAuth(), fetchMessages);

messageRoute.post("/send", ClerkExpressRequireAuth(), sendMessage);

export default messageRoute