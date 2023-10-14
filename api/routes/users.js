import express from "express"
import { getHotels,getRoom,hotelSingle } from "../controller/userController.js"


const router = express.Router()


router.post('/getHotels',getHotels)
router.post('/getRoom',getRoom)
router.post('/hotelSingle',hotelSingle)




export default router