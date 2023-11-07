import mongoose from "mongoose";

const ComplaintModel = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,

    },
    email:{
        type:String,
    },
    subject:{
        type:String,
    },
    message:{
        type:String
    }
})


const Complaint = mongoose.model('Complaint',ComplaintModel)

export default Complaint