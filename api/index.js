import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoute from './routes/auth.js'
import userRoute from './routes/users.js'
import cookieParser from 'cookie-parser'
import hotelRoute from './routes/hotel.js'
import adminRoute from './routes/admin.js'
import { notFound,errorHandler } from "./middleware/errorMiddleware.js"
dotenv.config()

const port = process.env.PORT
const app = express() 
connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
// ===================== Setting Static Folder =====================
app.use(express.static('api/Public'));


app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/hotel',hotelRoute)
app.use('/api/admin',adminRoute)

app.use(notFound) 
app.use(errorHandler)



const server =  app.listen(port,()=>{
    console.log(`backend connected @ ${port}`);
})

import { Server } from 'socket.io'

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: ["http://localhost:3000"],
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
        
        if(chat.user._id === newMessageReceived.sender._id){
          socket.to(chat.hotelier._id).emit("message received",newMessageReceived)
        }
    
        if(chat.hotelier._id === newMessageReceived.sender._id){
          socket.to(chat.user._id).emit("message received",newMessageReceived)
        }
      })  
})