import express from 'express';
import { getAllUsers, signUp } from '../controllers/auth.js';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'; // ES6 compatible middleware name

const authRouter = express.Router();

// Clerk Express middleware use kar rahe hain
authRouter.post('/sync-user',ClerkExpressRequireAuth(), signUp);

authRouter.get("/all", ClerkExpressRequireAuth(), getAllUsers)

// ES6 Default Export
export default authRouter;