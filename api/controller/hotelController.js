import asyncHandler from 'express-async-handler'
import Hotelier from '../models/hotelierModel.js';
import generateToken from '../utils/generateUserToken.js';
import HotelDetails from '../models/hotelDetails.js';
import {createError} from '../utils/error.js'

//@desc Register a new User
//route POST /api/auth/register
//@access Public

const registerHotelier = asyncHandler(async(req,res) =>{
    console.log(req.body);
    const {name,email,password} = req.body
    const hotelierExist = await Hotelier.findOne({email})
    if(hotelierExist){
        res.status(400);
        throw new Error('Email Already Taken')
    }
    const hotelier = await Hotelier.create({
        name,
        email,
        password
    })
    if(hotelier){
        generateToken(res,hotelier._id)
        res.status(201).json({
            _id:hotelier._id,
            name:hotelier.name,
            email:hotelier.email,
        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

//@desc Auth user/set token
//route POST /api/auth/user
//@access Public

const loginHotelier = asyncHandler(async(req,res) =>{
    const {email,password} = req.body
    const hotelier = await Hotelier.findOne({email})
    if(hotelier&&(await hotelier.matchPassword(password))){
        generateToken(res,hotelier._id)
        res.status(201).json({
            _id:hotelier._id,
            name:hotelier.name,
            email:hotelier.email,
        })
    }else{
        res.status(401)
        throw new Error('Invalid Email or Password')
    }

})

//@desc Logout a new User
//route POST /api/users/logout
//@access Public

const logoutHotelier = async (req,res) =>{
    res.cookie('jwthotel','',{
        httpOnly:true,
        expires:new Date()
    })
    res.status(200).json({message:'User Logged Out'})

}


const createHotel = async (req, res, next) => {
      let images = []
      req.files.map((files)=>{
        images.push()
      })
    const {name,city,address,desc,aminities} = req.body
    try {
        const hotelDetais = await HotelDetails.create({
            name,
            city,
            address,
            desc,
            aminities

        })

      

    } catch (err) {
      next(err);  
    }
  };

  const getHotels = async (req, res, next) => {
  
    try {
      const hotelList = await HotelDetails.find({});
      res.status(200).json(hotelList);
    } catch (err) {
      next(err);
    }
  };

export{
    registerHotelier,
    loginHotelier,
    logoutHotelier,
    createHotel,
    getHotels
}