
import HotelDetails from "../models/hotelDetails.js";
import Rooms from "../models/rooms.js";
import RoomAvailability from "../models/roomAvailability.js";
import User from "../models/userModel.js";
import UserAddress from "../models/userAdressModel.js";
import { Stripe } from "stripe";
const stripe = new Stripe('sk_test_51O7dS4SHIO1unxwgQgkt80Tlj3oRPvrHskSU8NlGDRBR3M2AJzMUr88C5q3TaIaYHTk4nIAhJnRvgDFTugo85HHr005ho3q9Lw')
const clienturl = 'http://localhost:3000'
import Bookings from "../models/bookingModel.js";
import Complaint from "../models/complaintModel.js"; 

// const getHotels = async (req, res, next) => {
//   try {
//     const searchName = req.query.name
//     console.log(searchName);
//     let query = { isListed: true };
//     if (searchName) {
//       query.name = { $regex: new RegExp(searchName, 'i') };
//     }
//     const hotelList = await HotelDetails.find(query);
//     res.status(200).json(hotelList);
//   } catch (err) {
//     next(err);
//   }
// };

const getHotels = async (req, res, next) => {
  try {
    const searchName = req.query.name;
    const checkIn = req.query.checkinDate;
    const checkOut = req.query.checkoutDate;
    let checkinDate = checkIn ? new Date(checkIn) : new Date();
    checkinDate.setHours(0, 0, 0, 0);
    let checkoutDate = checkOut ? new Date(checkOut) : new Date();
    checkoutDate.setHours(23, 59, 59, 999);
    if (!checkinDate || !checkoutDate) {
      return res.status(400).json({ message: "Check-in and Check-out dates are required." });
    }
    let query = { isListed: true };
    if (searchName) {
      query.name = { $regex: new RegExp(searchName, 'i') };
    }
    const hotelList = await HotelDetails.find(query);
    const availableHotels = [];

    for (const hotel of hotelList) {
      const rooms = await Rooms.find({ hotelId: hotel._id });

      let atLeastOneRoomAvailable = false;

      for (const room of rooms) {
        const availability = await RoomAvailability.find({
          hotelId: hotel._id,
          roomId: room._id,
          date: { $gte: checkinDate, $lte: checkoutDate },
          numberOfAvailableRooms: { $gt: 0 },
        });
        if (availability.length === Math.ceil((new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 60 * 60 * 24))) {
          atLeastOneRoomAvailable = true;
          break; 
        }
      }
      if (atLeastOneRoomAvailable) {
        availableHotels.push(hotel);
      }
    }
    res.status(200).json(availableHotels);


            
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

  const getRoom = async (req, res, next) => {
    try {
      const id = req.body.id;
      const checkIn = req.body.checkIn;
      const checkOut = req.body.checkOut;
  
      let checkinDate = checkIn ? new Date(checkIn) : new Date();
      checkinDate.setUTCHours(0, 0, 0, 0);
      let checkoutDate = checkOut ? new Date(checkOut) : new Date();
      checkoutDate.setUTCHours(23, 59, 59, 999);
  
      const availableRooms = await RoomAvailability.find({
        hotelId: id,
        date: { $gte: checkinDate, $lte: checkoutDate },
      }).populate("roomId");

        const roomGroups = availableRooms.reduce((groups, room) => {
        const roomId = room.roomId._id;
        if (!groups.has(roomId)) {
          groups.set(roomId, {
            room: room.roomId,
            availability: [],
          }); 
        }
        groups.get(roomId).availability.push(room);
        return groups;
      }, new Map());
      const roomDetails = [];
      for (const [roomId, group] of roomGroups) {
        const minAvailability = Math.min(...group.availability.map((room) => room.numberOfAvailableRooms));
        const numberOfDays = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24))
        const roomPrice = group.room.price 
        const totalPrice = numberOfDays * roomPrice;
        if(minAvailability>0){
        roomDetails.push({
          room: group.room,
          minAvailability,
          checkinDate,
          checkoutDate, 
          totalPrice,
          numberOfDays
        });
      }
      }
      res.status(200).json(roomDetails);
    } catch (err) {
      next(err);
    }
  };

  const getProfile = async(req,res,next)=>{
    try {
      const userId = req.query.id
      const user = await User.findOne({_id:userId})
      res.status(201).json(user)
    } catch (error) {
      next(error)
    }


  }

  const addAddress = async(req,res,next)=>{
   try {
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

  const getDetailsForBooking = async(req,res,next)=>{
    const hotelId = req.query.hotelId
    const availabilityId = req.query.availabilityId
    const userId = req.query.userId
    const roomDetails = await RoomAvailability.findOne({_id:availabilityId}).populate('roomId')
    const hotelDetails = await HotelDetails.findOne({_id:hotelId})
    // const address = await UserAddress.findOne({userId:userId})
    const details={
      roomDetails:roomDetails,
      hotelDetails:hotelDetails,
      // address:address
    } 
    res.status(201).json(details)
    
  }

  const stripePayment = async(req,res,next)=>{
    const { price, name, place } = req.body;
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: name,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment", 
      return_url: `${clienturl}/return?session_id={CHECKOUT_SESSION_ID}`,
    });
    res.json({clientSecret: session.client_secret});
  }

  const paymentStatus = async(req,res,next)=>{
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    res.json(session);
  }

  const createBooking = async(req,res,next)=>{
    console.log('createBooking');
    const {userInfo,roomInfo,hotelInfo,checkInDate,checkOutDate,paymentStatus,bookingStatus,totalAmount,paymentId} = req.body
    const bookingExist = await Bookings.findOne({paymentId:paymentId})
    if(bookingExist){
      res.status(200).json(bookingExist)
      return
    }
    try {
      let currentDate = new Date(checkInDate);
      currentDate.setHours(0, 0, 0, 0);
      while (currentDate <= new Date(checkOutDate)) {
        const updated = await RoomAvailability.updateOne(
          { roomId: roomInfo._id,date: currentDate,
        },
          { $inc: { numberOfAvailableRooms: -1 } }
        );
        console.log(currentDate);
        console.log(updated);
        console.log(roomInfo._id);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      const booking = await Bookings.create({
        userInfo,
        roomInfo,
        hotelInfo,
        checkInDate,
        checkOutDate,
        paymentStatus,
        bookingStatus,
        totalAmount,
        paymentId,
        bookingDate:new Date(),
      })

     
      res.status(200).json(booking)
    } catch (error) {
      next(error)
    } 


  }

  const getSingleBooking = async(req,res,next)=>{
    const id = req.query.id
    console.log(id);

    try {
      const booking = await Bookings.findOne({_id:id})
      res.json(booking)
    } catch (error) {
      next(error)
    }

  }

  const getBookings = async(req,res,next)=>{
    const id = req.query.id
    try {
      const booking = await Bookings.find({'userInfo.id':id}).sort({bookingDate:-1})
      res.json(booking)
    } catch (error) {
      next(error)
    }

  }

  const cancelBooking = async(req,res,next)=>{
    const id = req.query.id
    try {
      const booking = await Bookings.updateOne({_id:id},{bookingStatus:'Cancel Requested'})
      res.json(booking)
    } catch (error) {
      next(error)
    }

  }

  const submitComplaint = async(req,res,next)=>{
    try {
      console.log('submitcomplaint');
     const {userId,subject,message,name,email} = req.body
     const complaint = await Complaint.create({
      userId,
      name,
      email,
      subject,
      message 
   })
   res.status(201).json(complaint)
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
    getUserAddress,
    getDetailsForBooking,
    stripePayment,
    paymentStatus,
    createBooking,
    getSingleBooking,
    getBookings,
    cancelBooking,
    submitComplaint
  }