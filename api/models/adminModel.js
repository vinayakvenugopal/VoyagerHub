import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
    }
},{
    timestamps : true
})

const Admin = mongoose.model('Admin',adminSchema)

export default Admin