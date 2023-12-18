import express from "express"
const router = express.Router()
import {loginUser, registerUser,logoutUser,googleLogin,sendOtpCode, verifyOtp} from '../controller/authController.js'
import loginValidator from "../validators/loginValidator.js"
import { protect } from "../middleware/userAuthMiddleware.js"
import validateRegister from "../validators/registerValidator.js"


router.post('/register',validateRegister,registerUser)
router.post('/login',loginValidator,loginUser )
router.post('/logout',logoutUser)
router.post('/googleLogin',googleLogin)

router.post('/sendOtp',sendOtpCode)
router.post('/verifyOtp',verifyOtp)

export default router 