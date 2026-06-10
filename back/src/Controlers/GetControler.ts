import { AuthRequest } from "../middleware/AuthMiddleware";
import type { Response } from "express"
import { User, UserRole } from "../Models/User";
import { Op } from "sequelize";
import { Order } from "../Models/Order";

export const getUsersByManager = async (req: AuthRequest, res: Response) => {
    try {
        const users = await User.findAll({
            where: {
                [Op.and]: [
                    { role: { [Op.ne]: UserRole.manager } },
                    { role: { [Op.ne]: UserRole.admin } }
                ]
            }
        })

        return res.json(users)

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "server error"
        })
    }
}

export const getAllUser = async (req: AuthRequest,res: Response) => {
    try{
        const users = await User.findAll()
        return res.json(users)
    }catch(e){
        return res.status(500).json({
            message: "server error"
        })
    }
}

export const getRequsetByManager = async (req: AuthRequest, res: Response) => {
    try{
        const orders = await Order.findAll()
        return res.json(orders)
    }catch(e){
        console.log(e)
        return res.status(500).json({
            message: "server error"
        })
    }
}