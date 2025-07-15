'use strict'
import jwt from 'jsonwebtoken'

export const generateJwt = (payload)=>{
    try{
        return jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                expiresIn: '1h', 
                algorithm: 'HS256'
            }
        )
    }catch(err){
        console.error(err)
        return err
    }
}