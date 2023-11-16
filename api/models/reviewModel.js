import mongoose from "mongoose";

const ReviewModel = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    hotelId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"HotelDetails"
    },
    name:{
        type:String,

    },
    title:{
        type:String,

    },
    desc:{
        type:String,
    },
    star:{
        type:Number,
    },
    isHidden:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})


const Review = mongoose.model('Review',ReviewModel)

export default Review