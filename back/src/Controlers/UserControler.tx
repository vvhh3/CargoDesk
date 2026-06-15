import type { Request, Response } from "express"
import { User } from "../Models/User"

export const EditUser = async (req: Request,res: Response) => {
    try{
        const {
            id,
            name,
            lastName,
            email,
            companyName,
        } = req.body

        if(!id){
            return res.status(400).json({
                message: "data is failid"
            })
        }
        const user = await User.findByPk(id)
        
        if(!user){
            return res.status(400).json({
                message: "user not found"
            })
        }

        await user.update({
            name: name ?? user.dataValues.name,
            lastName: lastName ?? user.dataValues.lastName,
            email: email ?? user.dataValues.email,
            companyName: companyName ?? user.dataValues.companyName
        })

        return res.json({
            message:"success"
        })
        
    }catch(e){
        console.log(e)
        return res.status(500).json({
            message:"server error"
        })
    }
}