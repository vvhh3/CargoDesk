import type { Request,Response } from "express"
import { User } from "../Models/User.ts"
import {GenerateJWT} from "../utils/GenerateJWT.ts"
import bcrypt from "bcrypt"
import type {AuthRequest} from "../middleware/AuthMiddleware.ts"

export const register = async (req: Request,res:Response) => {
    try{
        const {email,password} = req.body
        
        if(!email|| !password){
            return res.status(400).json({
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
            email: email,
            password: hashPassword
        })

        //можно писать и просто user.id ,dataValues - на всякий случай
        const token = GenerateJWT(user.dataValues.id)

        //что чё значит, и какие параметры есть ещё
        res.cookie("token",token,{
            httpOnly: true, //Запрещает JS доступ к cookie.
            secure: false, // если true cookie работает только через HTTPS.
            sameSite: "lax",
            maxAge: 2 * 60* 60* 1000 //Сколько живёт cookie. 2 часа
        })

        return res.json({
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

        res.cookie("token",token,{
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 2 * 60 * 60 * 1000
        })

        return res.json({
            user
        })
    }catch(e){
        res.status(500).json({
            message: "error server"
        })
    }
}

export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findByPk(req.id);

    return res.json({ user });
  } catch {
    return res.status(500).json({
      message: "server error",
    });
  }
};