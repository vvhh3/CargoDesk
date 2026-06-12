import { User } from "../Models/User"
import type { Request,Response } from "express"

export const setRole = async (req: Request,res: Response) => {
    try{
        const {id,role} = req.body

        if(!id || !role) {
            return res.status(400).json({message:"data failid"})
        }

        const user = await User.findByPk(id)

        if (!user) {
            return res.status(404).json({message:"user not found"})
        }

        await user.update({role})

        return res.json({ message: "succees"})
    }catch(e){
        console.log(e)
        return res.status(500).json({message:"server error"})
    }
}
