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

// app.use((err,req,res,next)=>{
//     const errorStatus = err.status || 500
//     const errorMessage = err.message || "Something went wrong"
//     return res.status(errorStatus).json({
//         success:false,
//         status:errorStatus,
//         message:errorMessage,
//         stack:err.stack
//     })
// })

app.listen(port,()=>{
    console.log(`backend connected @ ${port}`);
})