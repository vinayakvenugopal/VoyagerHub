import mongoose from "mongoose";

const roomAvailabilitySchema = mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Rooms"
    },
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"HotelDetails"
    },
    date: {
        type:Date
    },
    numberOfAvailableRooms:{
        type:Number
    }


})


const RoomAvailability = mongoose.model('RoomAvailability',roomAvailabilitySchema)

export default RoomAvailability