import express from "express"
const router = express.Router()
import multer from "multer";
import {registerHotelier,loginHotelier,logoutHotelier,createHotel, getHotels, hotelSingle, addRoom, getRoom} from '../controller/hotelController.js'
import { multerUploadHotelImages } from "../config/multer.js"
router.post('/register',registerHotelier)
router.post('/login',loginHotelier )
router.post('/logout',logoutHotelier)
router.post('/createHotel',multerUploadHotelImages.array("images",10),createHotel)
router.post('/getHotels',getHotels)
router.post('/hotelSingle',hotelSingle)
router.post('/addRoom',addRoom)
router.post('/getRoom',getRoom)

export default router