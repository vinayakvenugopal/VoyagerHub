import express from "express"
import { getHotels,getRoom,hotelSingle,getProfile ,addAddress, getUserAddress, getDetailsForBooking, stripePayment, 
    paymentStatus, createBooking, getSingleBooking, getBookings, cancelBooking, submitComplaint, walletPayment, addReview, getHotelWiseReview, getNotification} from "../controller/userController.js"
import walletPaymentValidator from "../validators/walletPaymentValidator.js"
import { protect } from "../middleware/userAuthMiddleware.js"
import { createChatRoom, getMessages, sendChat } from "../controller/chatController.js"
import validateAddAddress from "../validators/addAddressValidator.js"
import validateSubmitComplaint from "../validators/submitComplaintValidator.js"
import validateAddReview from "../validators/validateAddReview.js"
import BookingValidator from "../validators/walletPaymentValidator.js"

const router = express.Router()


router.get('/getHotels',getHotels)
router.post('/getRoom',protect,getRoom)
router.get('/hotelSingle',protect,hotelSingle)

router.get('/profile',protect,getProfile)
router.post('/addAddress',validateAddAddress,protect,addAddress)
router.get('/getUserAddress',protect,getUserAddress)
router.get('/getDetailsForBooking',getDetailsForBooking)
router.post('/payment',stripePayment)
router.get('/payment-status',protect,paymentStatus)
router.post('/createBooking',BookingValidator,protect,createBooking)
router.get('/getSingleBooking',protect,getSingleBooking)
router.get('/getBookings',protect,getBookings)
router.get('/cancelBooking',protect,cancelBooking)
router.post('/submitComplaint',validateSubmitComplaint,protect,submitComplaint)
router.post('/walletPayment',protect,walletPaymentValidator,walletPayment)
router.post('/addReview',validateAddReview,protect,addReview)
router.get('/getHotelWiseReview',protect,getHotelWiseReview)

router.get('/createChatRoom/:user/:hotelier',protect,createChatRoom)
router.post('/sendChat',protect,sendChat)
router.get('/getMessages/:roomId',protect,getMessages)
router.get('/getNotification/:id',protect,getNotification)

export default router 