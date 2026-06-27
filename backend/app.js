import express from "express"
import dotenv from 'dotenv'
dotenv.config();
import { dbConnect } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cors from 'cors'
import { createServer } from 'http'
import { Server } from "socket.io";



const app = express();
const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"]
    }
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

dbConnect();


app.use('/api/users', authRouter)

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on("join_chat", (chatId) => {
        socket.join(chatId)
    })
})

httpServer.listen(3000, () => console.log("server running on port 3000"));
