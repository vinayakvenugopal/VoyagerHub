import express from "express"
const router = express.Router()
import {registerHotelier,loginHotelier,logoutHotelier} from '../controller/hotelController.js'

router.post('/register',registerHotelier)
router.post('/login',loginHotelier )
router.post('/logout',logoutHotelier)

export default router