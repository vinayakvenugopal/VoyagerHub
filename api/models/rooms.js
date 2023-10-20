import mongoose from "mongoose";

const roomsSchema = mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"HotelDetails"
    },
    hotelierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"hotelier"
    },
    images: {
        type: [String],
    },
    price:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    area:{
        type:Number,
    },
    occupancy:{
        type:Number,
    },
    facilities:{
        type: [String],

    },
    noOfRooms:{
        type:Number,
    },
    availability: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RoomAvailability' }],

})


const Rooms = mongoose.model('Rooms',roomsSchema)

export default Rooms