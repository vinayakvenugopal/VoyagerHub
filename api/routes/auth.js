import express from "express"
const router = express.Router()
import {loginUser, registerUser,logoutUser,googleLogin} from '../controller/authController.js'
import { protect } from "../middleware/userAuthMiddleware.js"

router.post('/register',registerUser)
router.post('/login',loginUser )
router.post('/logout',logoutUser)
router.post('/googleLogin',googleLogin)
export default router