
import HotelDetails from "../models/hotelDetails.js";
import Rooms from "../models/rooms.js";
import RoomAvailability from "../models/roomAvailability.js";
import User from "../models/userModel.js";
import UserAddress from "../models/userAdressModel.js";
const getHotels = async (req, res) => {
  
    try {
      const hotelList = await HotelDetails.find({isListed:true});
      res.status(200).json(hotelList);
    } catch (err) {
      next(err);
    }
  };

 

  const hotelSingle = async(req,res)=>{
    try {
        const id = req.query.id
        const hoteData = await HotelDetails.findOne({_id:id})
        res.status(200).json(hoteData);
    } catch (error) {
        res.status(401)
        throw new Error('Error fetching data')
        
    }
  } 

  const getRoom = async (req, res,next) => {
    try {
      const id = req.query.id
      const roomData = await Rooms.find({hotelId:id});
      // const { checkInDate, checkOutDate, hotelId } = req.body;
      // console.log(req.body);
      // const roomData = await RoomAvailability.find({
      //   date: { $gte: new Date(checkInDate), $lte: new Date(checkOutDate) },
      //   numberOfAvailableRooms: { $gt: 0 }, 
      //   hotelId
      // })
      console.log(roomData);
      res.status(200).json(roomData);
    } catch (err) {
      next(er)
    }
  };

  const getProfile = async(req,res,next)=>{
    try {
      const userId = req.query.id
      const user = await User.findOne({_id:userId})
      console.log(user);
      res.status(201).json(user)
    } catch (error) {
      next(error)
    }


  }

  const addAddress = async(req,res,next)=>{
   try {
    console.log('hi');
    const {address,locality,state,pincode,country,userId} = req.body
    const userAddress = await UserAddress.create({
      address,
      locality,
      state,
      pincode,
      country,
      userId
  })
  res.status(201).json(userAddress)
   } catch (error) {
    next(error)
   }

  }

  const getUserAddress = async(req,res,next)=>{
    try {
      const id = req.query.id
      const userAddress = await UserAddress.findOne({userId:id})
      res.status(201).json(userAddress)
    } catch (error) {
      next(error)
    }
  }



  export{
    getHotels,
    getRoom,
    hotelSingle,
    getProfile,
    addAddress,
    getUserAddress
  }