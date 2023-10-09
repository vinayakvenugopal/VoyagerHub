import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateUserToken.js';
// import {createError} from '../utils/error.js'

//@desc Register a new User
//route POST /api/auth/register
//@access Public

const registerUser = asyncHandler(async(req,res) =>{
    console.log(req.body);
    const {name,email,password} = req.body
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400);
        throw new Error('User Already Exist')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

//@desc Auth user/set token
//route POST /api/auth/user
//@access Public

const loginUser = asyncHandler(async(req,res) =>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(user&&(await user.matchPassword(password))){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        })
    }else{
        res.status(401)
        throw new Error('Invalid Email or Password')
    }

})

//@desc Logout a new User
//route POST /api/users/logout
//@access Public

const logoutUser = async (req,res) =>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date()
    })
    res.status(200).json({message:'User Logged Out'})

}
//@desc Login Using google
//route POST /api/users/googleLogin
//@access Public
const googleLogin = async(req,res)=>{
    const name = req.body.googleName
    const email = req.body.googleEmail
    const user = await User.findOne({email})
    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        })
    }else{
        const user = await User.create({
            name,
            email,
        })
        if(user){
            generateToken(res,user._id)
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
            })
        }

    }


}

export{
    registerUser,
    loginUser,
    logoutUser,
    googleLogin
}