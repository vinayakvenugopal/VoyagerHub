import express from "express"
import dotenv from "dotenv"
import path from 'path';
import connectDB from "./config/db.js"
import authRoute from './routes/auth.js'
import userRoute from './routes/users.js'
import cookieParser from 'cookie-parser'
import hotelRoute from './routes/hotel.js'
import adminRoute from './routes/admin.js'
import cors from 'cors'
import { notFound,errorHandler } from "./middleware/errorMiddleware.js"
dotenv.config()
const currentWorkingDir = path.resolve();
const parentDir = path.dirname(currentWorkingDir);
const port = 5000
const app = express() 
connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
// ===================== Setting Static Folder =====================
app.use(express.static(path.join(parentDir, '/api/Public')));

app.use(cors({
  origin: ["https://voyagerhub.vinayakvenugopal.com/","https://www.voyagerhub.vinayakvenugopal.com/"],
  credentials: true
}));

app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/hotel',hotelRoute)
app.use('/api/admin',adminRoute)

const enviornment = 'production'
if (enviornment === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(parentDir, '/frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(parentDir, 'frontend', 'dist', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }


app.use(notFound) 
app.use(errorHandler)



const server =  app.listen(port,()=>{
    console.log(`backend connected @ ${port}`);
})

import { Server } from 'socket.io'

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: ["https://voyagerhub.vinayakvenugopal.com/","https://www.voyagerhub.vinayakvenugopal.com/"],
    },
  }); 

  io.on("connection",(socket)=>{
    console.log("connected with socket io");
  
    socket.on("setup",(userData)=>{
      socket.join(userData._id);
      socket.emit("connected");
    });

    socket.on('join chat',(room)=>{
        socket.join(room);
        console.log("User Joined room:"+room);
      })

      socket.on('new message',(newMessageReceived)=>{
        var chat = newMessageReceived.room;
        if(!chat.user || !chat.hotelier){
          return console.log('chat.users not defined')
        }
        
        socket.to(chat._id).emit("message received",newMessageReceived)
    
      
      })  
})
