import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    userInfo:{
        type:Object
    },
    roomInfo:{
        type:Object
    },
    hotelInfo:{
        type:Object
    },
    checkInDate:{
        type:Date
    },
    checkOutDate:{
        type:Date
    },
    paymentStatus:{
        type:String
    },
    bookingStatus:{
        type:String
    },
    totalAmount:{
        type:Number
    },
    paymentId:{
        type:String
    }
})


const Bookings = mongoose.model('Bookings',bookingSchema)

export default Bookings