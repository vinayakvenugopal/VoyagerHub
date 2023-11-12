import mongoose from "mongoose";

const hotelDetailsSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    hotelierId:{
      type: mongoose.Schema.Types.ObjectId,
        ref:"hotelier"
    },
    city: {
        type: String,
        required: true,
      },
      starRating: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      images: {
        type: [String],
      },
      desc: {
        type: String,
        required: true,
      },
      aminities:{
        type: [String],
      },
      isListed: {
        type: Boolean,
        default: true,
      }
})


const HotelDetails = mongoose.model('HotelDetails',hotelDetailsSchema)

export default HotelDetails