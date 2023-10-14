import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'


const protectHotel = asyncHandler(async(req,res,next)=>{
    let token
    token = req.cookies.jwtHotel

    if(token){
        try {
            const decoded = jwt.verify(token,'newHotelSecret')
            next()
        } catch (error) { 
            res.status(401);
            throw new Error("Not Authorized ,invalid token")
        }

    }else{
        res.status(401);
        throw new Error("Not Authorized no token")
    }
})


export {protectHotel}