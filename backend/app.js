import express, { urlencoded } from "express"
import dotenv from 'dotenv'
dotenv.config();
import { dbConnect } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cors from 'cors'

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

dbConnect();


app.use('/api/users', authRouter)

app.listen(3000, () => console.log("server running on port 3000"));
