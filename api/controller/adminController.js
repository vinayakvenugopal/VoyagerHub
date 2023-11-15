import Admin from "../models/adminModel.js";
import generateAdminToken from "../utils/generateAdminToken.js";
import HotelDetails from "../models/hotelDetails.js";
import Facilities from "../models/facilitiesModal.js";
import Complaint from "../models/complaintModel.js";
import Bookings from "../models/bookingModel.js";
import User from '../models/userModel.js'


const adminLogin = async(req,res,next)=>{
    const {username,password} = req.body
    const admin = await Admin.findOne({username})
    console.log(admin);
    try {
        if(admin&&password===admin.password){
            generateAdminToken(res,admin._id)
            res.status(201).json({
                _id:admin._id,
                name:admin.username,
            })
        }else{
            res.status(400)
            throw new Error("Invalid Username Or Password")
        }
    } catch (error) {
        next(error)
        
    }
}

const logoutAdmin = async (req,res) =>{
    console.log('Logout Admin');
    res.cookie('jwtAdmin','',{
        httpOnly:true, 
        expires:new Date()
    })
    res.status(200).json({message:'Admin Logged Out'})

}

const getHotels = async (req, res,next) => {
  
    try {
      const hotelList = await HotelDetails.find({});
      res.status(200).json(hotelList);
    } catch (err) {
      next(err);
    }
  };

  const blockHotel = async(req,res,next)=>{
    try {
        const id = req.body.id
        const updated = await HotelDetails.updateOne({_id:id},{isListed:false})
        res.status(201).json({message:'Hotel Blocked Successfully'})
    }catch (error) {
        next(error)
    }
  }

  const unBlockHotel = async(req,res,next)=>{
    try {
        const id = req.body.id
        const updated = await HotelDetails.updateOne({_id:id},{isListed:true})
        res.status(201).json({message:'Hotel UnBlocked Successfully'})
    }catch (error) {
        next(error)
    }
  }

  const addFacilities = async(req,res,next)=>{
    try {
        const {facility} =  req.body
        const facilities = await Facilities.create({
            facility
           
        })
        res.status(201).json({message:'Added Succesfully'})
    } catch (error) {
        next(error)
    }
  }

  const getFacilities = async(req,res,next)=>{
    try {
        const facilities = await Facilities.find({})
        res.status(201).json(facilities)
    } catch (error) {
        next(error)
    }
  }

  const deleteFacilities = async(req,res,next)=>{
    try {
        const id = req.query.id
        const facilities = await Facilities.deleteOne({ _id: id }).exec();
        res.status(201).json({message:'Deleted'})
    } catch (error) {
        next(error)
    }
  }

  const getComplaints = async(req,res,next)=>{
    try {
        const facilities = await Complaint.find({})
        res.status(201).json(facilities)
    } catch (error) {
        next(error)
    }
  }

  const adminDashboard = async (req, res, next) => {
  
    try {
      const bookingInfo = await Bookings.aggregate([
        {
          $group: {
            _id: '$hotelInfo.hotelierId',
            totalBookingAmount: { $sum: '$totalAmount' },
            totalBookings: { $sum: 1 },   

          },
        },
      ]);

      const bookingByDate = await Bookings.aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$bookingDate' },
              month: { $month: '$bookingDate' },
              day: { $dayOfMonth: '$bookingDate' },
            },
            totalBookingAmount: { $sum: '$totalAmount' },
          },
        },
        {
          $sort: {
            '_id.year': 1,
            '_id.month': 1,
            '_id.day': 1,
          },
        },
      ]);
  
      res.status(201).json({bookingInfo,bookingByDate});
    } catch (error) {
      next(error);
    }
  };

  const getBookingsForAdmin = async(req,res,next)=>{
    try {
      const booking = await Bookings.find({}).sort({bookingDate:-1})
      res.json(booking)
    } catch (error) {
      next(error)
    }

  }

  const getUsers = async(req,res,next)=>{
    try {
    const users = await User.find({})
    res.status(201).json(users)
  } catch (error) {
      next(error)
  }
  }

  const blockUser = async(req,res,next)=>{
    const {id} = req.query
    try {
    const users = await User.updateOne({_id:id},{isBlocked:true})
    res.status(201).json({message:'User Blocked'})
  } catch (error) {
      next(error)
  }
  }

  const unBlockUser = async(req,res,next)=>{
    const {id} = req.query
    try {
    const users = await User.updateOne({_id:id},{isBlocked:false})
    res.status(201).json({message:'User UnBlocked'})
  } catch (error) {
      next(error)
  }
  }
  


export {
    adminLogin,
    logoutAdmin,
    getHotels,
    blockHotel,
    unBlockHotel,
    addFacilities,
    getFacilities,
    deleteFacilities,
    getComplaints,
    adminDashboard,
    getBookingsForAdmin,
    getUsers,
    blockUser,
    unBlockUser
}