import asyncHandler from 'express-async-handler'
import Hotelier from '../models/hotelierModel.js';
import generateHotelToken from '../utils/generateHotelToken.js';
import HotelDetails from '../models/hotelDetails.js';
import Rooms from '../models/rooms.js';
import {sendOtp,verifyCode} from '../utils/twilio.js'
import RoomAvailability from '../models/roomAvailability.js';
import Facilities from '../models/facilitiesModal.js';
//@desc Register a new User
//route POST /api/auth/register
//@access Public

const registerHotelier = asyncHandler(async(req,res) =>{
    console.log(req.body);
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
  console.log('Logout');
    res.cookie('jwtHotel','',{
        httpOnly:true,
        expires:new Date()
    })
    res.status(200).json({message:'User Logged Out'})

}


const createHotel = async (req, res) => {
      
    const {name,city,address,desc,aminities,hotelierId} = req.body
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
            hotelierId
        })
        res.status(201).json({message:'Hotel Created'})
    } catch (err) {
      console.log(err.message);
    }
  };

  const getHotels = async (req, res,next) => {
    try {
      const id = req.query.id
      const hotelList = await HotelDetails.find({hotelierId:id});
      console.log(hotelList);
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
    console.log(req.body);
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
      const roomData = await Rooms.find({hotelId:id});
      res.status(200).json(roomData);
    } catch (err) {
      next(err);
    }
  };

  const sendOtpCode = async (req,res,next) =>{
    console.log('sendotp');
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
    getFacilities
}