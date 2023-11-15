import express from "express"
import { adminLogin,logoutAdmin,getHotels, blockHotel,unBlockHotel, addFacilities, getFacilities, deleteFacilities, getComplaints, adminDashboard, getBookingsForAdmin, getUsers, blockUser, unBlockUser } from "../controller/adminController.js"
import { protectAdmin } from "../middleware/adminAuth.js"
const router = express.Router()



router.post('/login',adminLogin )
router.post('/logout', logoutAdmin)
router.get('/getHotels',protectAdmin,getHotels)
router.post('/blockHotel',protectAdmin,blockHotel)
router.post('/unBlockHotel',protectAdmin,unBlockHotel)
router.post('/addFacilities',protectAdmin,addFacilities)
router.post('/addFacilities',protectAdmin,addFacilities)
router.get('/getFacilities',protectAdmin,getFacilities)
router.delete('/deleteFacilities',deleteFacilities)
router.get('/getComplaints',getComplaints)
router.get('/adminDashbaord',adminDashboard)
router.get('/getBookingsForAdmin',getBookingsForAdmin)
router.get('/getUsers',getUsers)

router.get('/blockUser',blockUser)
router.get('/unBlockUser',unBlockUser)

export default router 