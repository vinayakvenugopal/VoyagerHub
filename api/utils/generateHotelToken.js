import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()

const generateHotelToken = (res,userId) =>{
    const token = jwt.sign({userId},
        process.env.JWT_HOTEL_SECRET,{expiresIn:'3d'})

        res.cookie('jwtHotel',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV !== 'development',
            sameSite:'strict',
            maxAge:30*24*60*60*1000
        })
}

export default generateHotelToken