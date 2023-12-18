import express from "express"
import { adminLogin,logoutAdmin,getHotels, blockHotel,unBlockHotel, addFacilities, getFacilities, deleteFacilities, getComplaints, adminDashboard, getBookingsForAdmin, getUsers, blockUser, unBlockUser, getReviewsForAdmin, hideReview, unHideReview } from "../controller/adminController.js"
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
router.delete('/deleteFacilities',protectAdmin,deleteFacilities)
router.get('/getComplaints',protectAdmin,getComplaints)
router.get('/adminDashbaord',protectAdmin,adminDashboard)
router.get('/getBookingsForAdmin',protectAdmin,getBookingsForAdmin)
router.get('/getUsers',protectAdmin,getUsers)
router.get('/blockUser',protectAdmin,blockUser)
router.get('/unBlockUser',protectAdmin,unBlockUser)
router.get('/getReviewsForAdmin',protectAdmin,getReviewsForAdmin)

router.get('/hideReview',protectAdmin,hideReview)
router.get('/unHideReview',protectAdmin,unHideReview)

export default router 