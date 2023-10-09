import express from "express"
const router = express.Router()
import multer from "multer";
import {registerHotelier,loginHotelier,logoutHotelier,createHotel, getHotels} from '../controller/hotelController.js'
import { multerUploadHotelImages } from "../config/multer.js"
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'api/Public'); // Specify the directory where you want to store uploaded files
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname); // Rename the file to a unique name
//     },
//   });
//   const upload = multer({ storage ,
//     limits: {
//         fileSize: 1024 * 1024 * 5, // 5MB limit (adjust as needed)
//       },});

router.post('/register',registerHotelier)
router.post('/login',loginHotelier )
router.post('/logout',logoutHotelier)
router.post('/createHotel',multerUploadHotelImages.array("images",10),createHotel)
router.post('/getHotels',getHotels)


export default router