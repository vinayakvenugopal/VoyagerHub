import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()

const generateAdminToken = (res,userId) =>{
    const token = jwt.sign({userId},
        'newAdminSecret',{expiresIn:'3d'})

        res.cookie('jwtAdmin',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV !== 'development',
            sameSite:'strict',
            maxAge:30*24*60*60*1000
        })
}

export default generateAdminToken