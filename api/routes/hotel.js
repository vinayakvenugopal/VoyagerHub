import express from "express"
const router = express.Router()
import multer from "multer";
import {registerHotelier,loginHotelier,logoutHotelier,createHotel, getHotels, hotelSingle, addRoom, getRoomForHotelier} from '../controller/hotelController.js'
import { multerUploadHotelImages,multerUploadRoomImages } from "../config/multer.js"
import { protectHotel } from "../middleware/hotelAuth.js";

router.post('/register',registerHotelier)
router.post('/login',loginHotelier )
router.post('/logout',logoutHotelier)
router.post('/createHotel',multerUploadHotelImages.array("images",10),protectHotel,createHotel)
router.post('/getHotels',protectHotel,getHotels)
router.post('/hotelSingle',protectHotel,hotelSingle)
router.post('/addRoom',protectHotel,multerUploadRoomImages.array("images",10),protectHotel,addRoom)
router.post('/getRooms',protectHotel,getRoomForHotelier) 

export default router