import mongoose from "mongoose";

const facilitiesSchema = mongoose.Schema({
    facility:{
        type:String,
        required:true
    }
})


const Facilities = mongoose.model('Facilities',facilitiesSchema)

export default Facilities