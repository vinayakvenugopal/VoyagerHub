import express from "express"
const router = express.Router()
import {registerHotelier,loginHotelier,logoutHotelier,createHotel, getHotels, hotelSingle,
     addRoom, getRoomForHotelier, sendOtpCode, verifyOtp, deleteRoom,getFacilities, getBookings, changeBookingStatus,getBookingsForHotelier, hotelDashboard, updateHotel} from '../controller/hotelController.js'
import { multerUploadHotelImages,multerUploadRoomImages} from "../config/multer.js"
import { protectHotel } from "../middleware/hotelAuth.js";
import { getChatRooms, getMessages, sendChat } from "../controller/chatController.js";
import loginValidator from "../validators/loginValidator.js";
import validateRegister from "../validators/registerValidator.js";
import validateCreateHotel from "../validators/validateCreateHotel.js";

router.post('/register',validateRegister,registerHotelier)
router.post('/login',loginValidator,loginHotelier )
router.post('/logout',logoutHotelier)
router.post('/createHotel',validateCreateHotel,multerUploadHotelImages.array("images",10),protectHotel,createHotel)
router.get('/getHotels',protectHotel,getHotels)
router.get('/hotelSingle',protectHotel,hotelSingle)
router.post('/addRoom',protectHotel,multerUploadRoomImages.array("images",10),protectHotel,addRoom)
router.get('/getRooms',protectHotel,getRoomForHotelier) 
router.post('/sendOtp',sendOtpCode)
router.post('/verifyOtp',verifyOtp)
router.delete('/deleteRoom',protectHotel,deleteRoom)
router.get('/getFacilities',protectHotel,getFacilities)
router.get('/getBookings',protectHotel,getBookings)
router.get('/changeBookingStatus',protectHotel,changeBookingStatus)
router.get('/hotelDashbaord',protectHotel,hotelDashboard)
router.get('/getBookingsForHotelier',protectHotel,getBookingsForHotelier)
router.post('/updateHotel',protectHotel,multerUploadHotelImages.array("images",10),updateHotel)
router.get('/getChatRooms/:hotelier',protectHotel,getChatRooms)
router.post('/sendChat',protectHotel,sendChat)
router.get('/getMessages/:roomId',protectHotel,getMessages)
export default router 