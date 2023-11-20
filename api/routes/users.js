import express from "express"
import { getHotels,getRoom,hotelSingle,getProfile ,addAddress, getUserAddress, getDetailsForBooking, stripePayment, 
    paymentStatus, createBooking, getSingleBooking, getBookings, cancelBooking, submitComplaint, walletPayment, addReview, getHotelWiseReview} from "../controller/userController.js"
import { protect } from "../middleware/userAuthMiddleware.js"
import { createChatRoom, getMessages, sendChat } from "../controller/chatController.js"

const router = express.Router()


router.get('/getHotels',getHotels)
router.post('/getRoom',getRoom)
router.get('/hotelSingle',hotelSingle)

router.get('/profile',protect,getProfile)
router.post('/addAddress',protect,addAddress)
router.get('/getUserAddress',protect,getUserAddress)
router.get('/getDetailsForBooking',getDetailsForBooking)
router.post('/payment',stripePayment)
router.get('/payment-status',paymentStatus)
router.post('/createBooking',createBooking)
router.get('/getSingleBooking',getSingleBooking)
router.get('/getBookings',getBookings)
router.get('/cancelBooking',cancelBooking)
router.post('/submitComplaint',submitComplaint)
router.post('/walletPayment',walletPayment)
router.post('/addReview',addReview)
router.get('/getHotelWiseReview',getHotelWiseReview)

router.get('/createChatRoom/:user/:hotelier',createChatRoom)
router.post('/sendChat',sendChat)
router.get('/getMessages/:roomId',getMessages)

export default router 