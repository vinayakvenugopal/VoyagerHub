import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()

const generateToken = (res,userId) =>{
    const token = jwt.sign({userId},
        'jwtSecret',{expiresIn:'3d'})

        res.cookie('jwt',token,{
            httpOnly:true,
            sameSite:'strict',
            maxAge:30*24*60*60*1000
        })
}

export default generateToken
