import type { Request, Response } from "express"
import { Order, OrderStatus } from "../Models/Order"
import { AuthRequest } from "../middleware/AuthMiddleware"


export const createRequest = async (req: AuthRequest, res: Response) => {
    try {
        
        const {
            product,
        } = req.body

        if (!product) {
            return res.status(400).json({message: "data is faild"})
        }

        if(!req.id) {
            return res.status(400).json({message:"userId is faild"})
        }

        const order = await Order.create({
            userId: req.id,
            product: product,
            status: OrderStatus.waitingManager,
        })

        return res.json({order})
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "server error"
        })
    }
}