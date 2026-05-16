import { Request,Response } from "express"
import { User } from "../Models/User.ts"
import {GenerateJWT} from "../utils/GenerateJWT.ts"
import bcrypt from "bcrypt"

export const register = async (req: Request,res:Response) => {
    try{
        const {email,password} = req.body
        
        if(!email|| !password){
            return res.json(400).json({
                message:"data is faild"
            })
        }

        const candidate = await User.findOne({
            where: {email}
        })

        if(candidate !== null) {
            return res.status(400).json({
                message: "user already exists"
            })
        }

        const hashPassword = await bcrypt.hash(
            password,
            10
        )
        const user = await User.create({
            email,
            hashPassword
        })

        //можно писать и просто user.id ,dataValues - на всякий случай
        const token = GenerateJWT(user.dataValues.id)

        return res.json({
            token,
            user
        })
    }catch(e){
        return res.status(500).json({
            message:"server error"
        })
    }
}

export const login = async (req: Request,res: Response) => {
    try{
        const {email,password} = req.body

        const user = await User.findOne({
            where: {email}
        })

        if(!user){
            return res.status(400).json({
                message: "not find user"
            })
        }

        const pas = await bcrypt.compare(
            password,
            user.dataValues.password
        )

        if(!pas){
            return res.status(400).json({
                message: "wrong password"
            })
        }
        const token = GenerateJWT(user.dataValues.id)

        return res.json({
            token,
            user
        })
    }catch(e){
        res.status(500).json({
            message: "error server"
        })
    }
}

// export const getUser = async (req: Request,res: Response) => {
//     try{
//         const user = await User.findByPk(req.Id)
//         return res.json(user)
//     }catch(e){
//         return res.status(500).json({
//             message:"server error"
//         })
//     }
// }