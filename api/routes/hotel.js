import express from "express"
const router = express.Router()
import {registerHotelier,loginHotelier,logoutHotelier,createHotel, getHotels,} from '../controller/hotelController.js'

router.post('/register',registerHotelier)
router.post('/login',loginHotelier )
router.post('/logout',logoutHotelier)
router.post('/createHotel',createHotel)
router.post('/getHotels',getHotels)


export default router