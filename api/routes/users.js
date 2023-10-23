import express from "express"
import { getHotels,getRoom,hotelSingle,getProfile ,addAddress, getUserAddress} from "../controller/userController.js"
import { protect } from "../middleware/userAuthMiddleware.js"

const router = express.Router()


router.get('/getHotels',getHotels)
router.get('/getRoom',getRoom)
router.get('/hotelSingle',hotelSingle)

router.get('/profile',protect,getProfile)
router.post('/addAddress',protect,addAddress)
router.get('/getUserAddress',protect,getUserAddress)


export default router