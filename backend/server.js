import express from 'express';
import cors from 'cors';
import "dotenv/config";
import http from 'http';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

//Intialize socket.io
export const io = new Server(server, {
    cors: {
      origin: "*"
    }
})

export const userSocketMap = {};

//handle socket.io connections
io.on('connection',(socket)=>{
    const userId = socket.handshake.query.userId;
    console.log(`User connected ${userId}`);
    if(userId){
        userSocketMap[userId] = socket.id;
    }
    io.emit('getOnlineUsers',Object.keys(userSocketMap));
    io.on('disconnect',()=>{
        console.log(`User disconnected ${userId}`);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers',Object.keys(userSocketMap));
    })
    
})

app.use(cors());
app.use(express.json());

app.use('/api/status',(req,res)=>{
    res.send('server is live');
})
app.use('/api/auth',userRouter);
app.use('/api/messages',messageRouter);

//connect database
await connectDB();
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });