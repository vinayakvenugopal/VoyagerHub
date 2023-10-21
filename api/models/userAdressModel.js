import mongoose from "mongoose";

const userAddress = mongoose.Schema({
    address:{
        type:String,
        required:true
    },
    locality:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})


const UserAddress = mongoose.model('UserAddress',userAddress)

export default UserAddress