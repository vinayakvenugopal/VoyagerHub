
import HotelDetails from "../models/hotelDetails.js";
import Rooms from "../models/rooms.js";

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
        const id = req.body.hotelierId
        const hoteData = await HotelDetails.findOne({hotelierId:id})
        res.status(200).json(hoteData);
    } catch (error) {
        res.status(401)
        throw new Error('Error fetching data')
        
    }
  } 

  const getRoom = async (req, res) => {
    try {
      const id = req.body.hotelierId
      const roomData = await Rooms.find({hotelierId:id});
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