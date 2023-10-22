import express from "express"
import { getHotels,getRoom,hotelSingle,getProfile ,addAddress, getUserAddress} from "../controller/userController.js"


const router = express.Router()


router.get('/getHotels',getHotels)
router.get('/getRoom',getRoom)
router.get('/hotelSingle',hotelSingle)

router.get('/profile',getProfile)
router.post('/addAddress',addAddress)
router.get('/getUserAddress',getUserAddress)


export default router