import jwt from "jsonwebtoken"

export const GenerateJWT = (id:number) => {
    
    return jwt.sign(
        {id},
        process.env.JWTSecret!,
        {
            expiresIn: "2h"
        }
    )
}