import express from "express"
const router = express.Router()
import {registerHotelier,loginHotelier,logoutHotelier,createHotel, getHotels, hotelSingle,
     addRoom, getRoomForHotelier, sendOtpCode, verifyOtp, deleteRoom,getFacilities, getBookings, changeBookingStatus,getBookingsForHotelier, hotelDashboard, updateHotel} from '../controller/hotelController.js'
import { multerUploadHotelImages,multerUploadRoomImages} from "../config/multer.js"
import { protectHotel } from "../middleware/hotelAuth.js";
import { getChatRooms, getMessages, sendChat } from "../controller/chatController.js";

router.post('/register',registerHotelier)
router.post('/login',loginHotelier )
router.post('/logout',logoutHotelier)
router.post('/createHotel',multerUploadHotelImages.array("images",10),protectHotel,createHotel)
router.get('/getHotels',protectHotel,getHotels)
router.get('/hotelSingle',protectHotel,hotelSingle)
router.post('/addRoom',protectHotel,multerUploadRoomImages.array("images",10),protectHotel,addRoom)
router.get('/getRooms',protectHotel,getRoomForHotelier) 
router.post('/sendOtp',sendOtpCode)
router.post('/verifyOtp',verifyOtp)
router.delete('/deleteRoom',deleteRoom)
router.get('/getFacilities',protectHotel,getFacilities)
router.get('/getBookings',getBookings)
router.get('/changeBookingStatus',changeBookingStatus)
router.get('/hotelDashbaord',hotelDashboard)
router.get('/getBookingsForHotelier',getBookingsForHotelier)
router.post('/updateHotel',multerUploadHotelImages.array("images",10),updateHotel)
router.get('/getChatRooms/:hotelier',getChatRooms)
router.post('/sendChat',sendChat)
router.get('/getMessages/:roomId',getMessages)
export default router 