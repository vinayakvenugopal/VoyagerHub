import Admin from "../models/adminModel.js";
import generateAdminToken from "../utils/generateAdminToken.js";
import HotelDetails from "../models/hotelDetails.js";

const adminLogin = async(req,res,next)=>{
    const {username,password} = req.body
    const admin = await Admin.findOne({username})
    console.log(admin);
    try {
        if(admin&&password===admin.password){
            generateAdminToken(res,admin._id)
            res.status(201).json({
                _id:admin._id,
                name:admin.username,
            })
        }else{
            res.status(400)
            throw new Error("Invalid Username Or Password")
        }
    } catch (error) {
        next(error)
        
    }
}

const logoutAdmin = async (req,res) =>{
    console.log('Logout Admin');
    res.cookie('jwtAdmin','',{
        httpOnly:true, 
        expires:new Date()
    })
    res.status(200).json({message:'Admin Logged Out'})

}

const getHotels = async (req, res,next) => {
  
    try {
      const hotelList = await HotelDetails.find({});
      res.status(200).json(hotelList);
    } catch (err) {
      next(err);
    }
  };

  const blockHotel = async(req,res,next)=>{
    try {
        const id = req.body.id
        const updated = await HotelDetails.updateOne({_id:id},{isListed:false})
        res.status(201).json({message:'Hotel Blocked Successfully'})
    }catch (error) {
        next(error)
    }
  }

  const unBlockHotel = async(req,res,next)=>{
    try {
        const id = req.body.id
        const updated = await HotelDetails.updateOne({_id:id},{isListed:true})
        res.status(201).json({message:'Hotel UnBlocked Successfully'})
    }catch (error) {
        next(error)
    }
  }


export {
    adminLogin,
    logoutAdmin,
    getHotels,
    blockHotel,
    unBlockHotel
}