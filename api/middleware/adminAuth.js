import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'


const protectAdmin = asyncHandler(async(req,res,next)=>{
    let token
    token = req.cookies.jwtAdmin

    if(token){
        try {
            const decoded = jwt.verify(token,'newAdminSecret')
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


export {protectAdmin}