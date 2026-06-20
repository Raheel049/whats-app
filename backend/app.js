import express from "express"
import dotenv from 'dotenv'
dotenv.config();
import { dbConnect } from "./config/db.js";

const app = express();

dbConnect();
app.listen(3000, () => console.log("server running on port 3000"));
