import express from "express"
import { adminLogin,logoutAdmin,getHotels, blockHotel,unBlockHotel } from "../controller/adminController.js"
const router = express.Router()



router.post('/login',adminLogin )
router.post('/logout', logoutAdmin)
router.get('/getHotels',getHotels)
router.post('/blockHotel',blockHotel)
router.post('/unBlockHotel',unBlockHotel)


export default router 