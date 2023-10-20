
import HotelDetails from "../models/hotelDetails.js";
import Rooms from "../models/rooms.js";
import RoomAvailability from "../models/roomAvailability.js";

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
        const id = req.body.hotelId
        const hoteData = await HotelDetails.findOne({_id:id})
        res.status(200).json(hoteData);
    } catch (error) {
        res.status(401)
        throw new Error('Error fetching data')
        
    }
  } 

  const getRoom = async (req, res) => {
    try {
      const id = req.body.hotelId
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

    }
  };



  export{
    getHotels,
    getRoom,
    hotelSingle
  }