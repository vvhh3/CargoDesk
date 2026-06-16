
import { User } from "../Models/User"
import type { Request,Response } from "express"

export const DeleteUser = async (req: Request, res: Response) => {
    try{
        const {id, isDeleted} = req.body

        if(!id|| isDeleted === undefined || isDeleted === null){
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

        await user.update({isDeleted})
        return res.status(200).json("success")

    }catch(e){
        return res.status(500).json({
            message: "server error"
        })
    }
}