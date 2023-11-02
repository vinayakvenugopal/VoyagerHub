import express from "express"
const router = express.Router()
import {loginUser, registerUser,logoutUser,googleLogin,sendOtpCode, verifyOtp} from '../controller/authController.js'
import { protect } from "../middleware/userAuthMiddleware.js"

router.post('/register',registerUser)
router.post('/login',loginUser )
router.post('/logout',logoutUser)
router.post('/googleLogin',googleLogin)

router.post('/sendOtp',sendOtpCode)
router.post('/verifyOtp',verifyOtp)

export default router 