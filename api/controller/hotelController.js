import asyncHandler from 'express-async-handler'
import Hotelier from '../models/hotelierModel.js';
import generateHotelToken from '../utils/generateHotelToken.js';
import HotelDetails from '../models/hotelDetails.js';
import Rooms from '../models/rooms.js';
import {sendOtp,verifyCode} from '../utils/twilio.js'
import RoomAvailability from '../models/roomAvailability.js';
import Facilities from '../models/facilitiesModal.js';
import Bookings from "../models/bookingModel.js";
import User from "../models/userModel.js";
import Notification from '../models/NotificationModel.js';

//@desc Register a new User
//route POST /api/auth/register
//@access Public

const registerHotelier = asyncHandler(async(req,res) =>{
    const {name,email,password,mobile} = req.body
    const hotelierExist = await Hotelier.findOne({email})
    if(hotelierExist){
        res.status(400); 
        throw new Error('Email Already Taken')
    }
    const hotelier = await Hotelier.create({
        name,
        email,
        mobile,
        password 
    })
    if(hotelier){
      generateHotelToken(res,hotelier._id)
        res.status(201).json({
            _id:hotelier._id,
            name:hotelier.name,
            email:hotelier.email,
        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

//@desc Auth user/set token
//route POST /api/auth/user
//@access Public

const loginHotelier = asyncHandler(async(req,res) =>{
    const {email,password} = req.body
    const hotelier = await Hotelier.findOne({email})
    if(hotelier&&(await hotelier.matchPassword(password))){
      generateHotelToken(res,hotelier._id)
        res.status(201).json({
            _id:hotelier._id,
            name:hotelier.name,
            email:hotelier.email,
        })
    }else{
        res.status(401)
        throw new Error('Invalid Email or Password')
    }

})

//@desc Logout a new User
//route POST /api/users/logout
//@access Public

const logoutHotelier = async (req,res) =>{
    res.cookie('jwtHotel','',{
        httpOnly:true,
        expires:new Date()
    })
    res.status(200).json({message:'User Logged Out'})

}


const createHotel = async (req, res) => {
      
    const {name,city,address,desc,aminities,hotelierId,starRating,videoUrl} = req.body
    let images = []
    if(req.files){
      req.files.map((files)=>{
        images.push(files.filename)
      })
    }
      let aminitiesArray = []
      if(aminities){
      aminities.map((aminities)=>{
        aminitiesArray.push(aminities)
      })
    }
    try {   
        const hotelDetais = await HotelDetails.create({ 
            name,
            city,
            address,
            desc,
            aminities:aminitiesArray,
            images,
            hotelierId,
            starRating,
            videoUrl
        })
        res.status(201).json({message:'Hotel Created'})
    } catch (err) {
      console.log(err.message);
    }
  }; 

  const updateHotel = async(req,res,next)=>{
    console.log('updated');
    console.log(req.files);
    let images = [] 
    if(req.files.length > 0){
      req.files.map((files)=>{
        images.push(files.filename)
      })
    } 
    const {name,city,address,desc,aminities,hotelierId,starRating,id,videoUrl} = req.body
    try {
      const hotelData = await HotelDetails.findOne({_id:id})
      if(hotelData){
        hotelData.name = name ||  hotelData.name
        hotelData.city = city ||  hotelData.city
        hotelData.address = address ||  hotelData.address
        hotelData.desc = desc ||  hotelData.desc
        hotelData.aminities = aminities ||  hotelData.aminities
        hotelData.starRating = starRating ||  hotelData.starRating
        hotelData.videoUrl = videoUrl ||  hotelData.videoUrl

      }
      if(req.files.length > 0){
        hotelData.images = images || hotelData.images
      }

      await hotelData.save()
      res.status(201).json({message:'Updated Succesfully'})
    } catch (error) {
      next(error)
    }

  }

  const getHotels = async (req, res,next) => {
    try {
      const id = req.query.id
      const hotelList = await HotelDetails.find({hotelierId:id});
      res.status(200).json(hotelList);
    } catch (err) {
      next(err);
    }
  };


  const hotelSingle = async(req,res)=>{
    try {
        const id = req.query.id
        const hotelData = await HotelDetails.findOne({_id:id})
        res.status(200).json(hotelData);
    } catch (error) {
        res.status(401)
        throw new Error('Error fetching data')
        
    }
  } 






  const addRoom = async (req, res) => {
    const {hotelId,price,desc,area,occupancy,facilities,type,hotelierId,noOfRooms} = req.body
    let images = []
      req.files.map((files)=>{
        images.push(files.filename)
      })

    //   let facilitiesArray = []
    //   facilities.map((facility)=>{
    //     facilitiesArray.push(facility)
    //   })
    try {
        const RoomDetails = await Rooms.create({
          type,
          price,
          desc, 
          area,
          occupancy,
          images,
          facilities,
          hotelierId,
          noOfRooms,
          hotelId
        })
        const startDate = new Date();
        for (let i = 0; i < 10; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          date.setHours(0, 0, 0, 0);
          const availability = await RoomAvailability.create({
            date,
            roomId: RoomDetails._id,
            numberOfAvailableRooms: noOfRooms,
            hotelId
          });
          RoomDetails.availability.push(availability);
        }
    
        await RoomDetails.save();
        res.status(200).json(RoomDetails);
    } catch (err) {
      res.status(401)
      throw new Error('Error Adding data')
    }
  };  



  const getRoomForHotelier = async (req, res,next) => {
    try {
      const id = req.query.id
      const roomData = await Rooms.find({hotelId:id})
      res.status(200).json(roomData);
    } catch (err) {
      next(err);
    }
  };

  const sendOtpCode = async (req,res,next) =>{
    try {
     const mobile = req.body.mobile
     await sendOtp(mobile)
     res.status(201).json({mobile})
    } catch (error) {
      next(error)

    }
 
 }
 
 const verifyOtp = async (req,res,next) =>{
     try {
      const {mobile,otp} = req.body
      const code = otp
      const verified = await verifyCode(mobile,code)
      if(verified===false){
         res.status(400);
         throw new Error('Wrong OTP Entered') 
      }
      res.status(200).json({mobile})
     } catch (error) {  
          next(error)
     } 
  
  }

  const deleteRoom = async (req, res, next) => {
    try {
      const id = req.query.id;
      const room = await Rooms.deleteOne({ _id: id }).exec();
      const availability = await RoomAvailability.deleteMany({ roomId: id }).exec();
      console.log(room,availability);
      res.status(201).json({ message: 'Room Deleted' });
    } catch (error) {
      next(error);
    }
  };

  const getFacilities = async(req,res,next)=>{
    try {
        const facilities = await Facilities.find({})
        res.status(201).json(facilities)
    } catch (error) {
        next(error)
    }
  }

  const getBookings = async(req,res,next)=>{
    const id = req.query.id
    try {
      const booking = await Bookings.find({'hotelInfo._id':id}).sort({bookingDate:-1})
      res.json(booking)
    } catch (error) {
      next(error)
    }

  }

  const changeBookingStatus = async(req,res,next)=>{
    const {id,status,userId} = req.query
    try {
      const booking = await Bookings.findOne({_id:id})
      if(booking){
        booking.bookingStatus=status
      }
      const user = await User.findOne({_id:userId})
      console.log(user);
      if(status==='Cancelled'){
        if(user){
          user.wallet+=booking.totalAmount
          console.log(user.wallet);
        }

      }
      const notification = await Notification.create({
        sender:booking.hotelInfo.name,
        reciever:booking.userInfo.name,
        senderId:booking.hotelInfo._id,
        recieverId:booking.userInfo.id,
        message:`Your booking for ${booking.roomInfo.type} is cancelled`
      })
      await notification.save()
      await booking.save()
      await user.save()
      res.json(booking)
    } catch (error) {
      next(error)
    }

  }

  const hotelDashboard = async (req, res, next) => {
    const { hotelierId } = req.query;
  
    try {
      const bookingInfo = await Bookings.aggregate([
        {
          $match: {
            'hotelInfo.hotelierId': hotelierId,
          },
        },
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
          $match: {
            'hotelInfo.hotelierId': hotelierId,
          },
        },
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

  const getBookingsForHotelier = async(req,res,next)=>{
    const id = req.query.id
    try {
      const booking = await Bookings.find({'hotelInfo.hotelierId':id})
      res.json(booking)
    } catch (error) {
      next(error)
    }

  }
  


  
  

export{
    registerHotelier,
    loginHotelier,
    logoutHotelier,
    createHotel,
    getHotels,
    hotelSingle,
    addRoom,
    getRoomForHotelier,
    sendOtpCode,
    verifyOtp,
    deleteRoom,
    getFacilities,
    getBookings,
    changeBookingStatus,
    hotelDashboard,
    getBookingsForHotelier,
    updateHotel
}