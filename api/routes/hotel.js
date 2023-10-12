import express from "express"
const router = express.Router()
import multer from "multer";
import {registerHotelier,loginHotelier,logoutHotelier,createHotel, getHotels, hotelSingle, addRoom, getRoom, getRoomForHotelier} from '../controller/hotelController.js'
import { multerUploadHotelImages,multerUploadRoomImages } from "../config/multer.js"
router.post('/register',registerHotelier)
router.post('/login',loginHotelier )
router.post('/logout',logoutHotelier)
router.post('/createHotel',multerUploadHotelImages.array("images",10),createHotel)
router.post('/getHotels',getHotels)
router.post('/hotelSingle',hotelSingle)
router.post('/addRoom',multerUploadRoomImages.array("images",10),addRoom)
router.post('/getRoom',getRoom)
router.post('/getRooms',getRoomForHotelier)

export default router