import mongoose from "mongoose";

const hotelDetailsSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    city: {
        type: String,
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
      featured: {
        type: Boolean,
        default: false,
      }



})


const HotelDetails = mongoose.model('HotelDetails',hotelDetailsSchema)

export default HotelDetails