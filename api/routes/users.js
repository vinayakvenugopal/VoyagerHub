import express from "express"
import { getHotels,getRoom,hotelSingle,getProfile ,addAddress, getUserAddress} from "../controller/userController.js"


const router = express.Router()


router.post('/getHotels',getHotels)
router.post('/getRoom',getRoom)
router.post('/hotelSingle',hotelSingle)

router.get('/profile',getProfile)
router.post('/addAddress',addAddress)
router.get('/getUserAddress',getUserAddress)


export default router