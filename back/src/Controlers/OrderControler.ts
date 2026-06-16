import type {  Response } from "express"
import { Order, OrderStatus } from "../Models/Order"
import { AuthRequest } from "../middleware/AuthMiddleware"
import { User } from "../Models/User"
import { Op } from "sequelize"

export const createRequest = async (req: AuthRequest, res: Response) => {
    try {

        const {
            product,
            link,
            brand,
            quantity,
            productImages = [],
        } = req.body

        const parsedQuantity = Number(quantity)

        if (!product || !link || !brand || !Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
            return res.status(400).json({ message: "data is faild" })
        }

        if (!Array.isArray(productImages)) {
            return res.status(400).json({ message: "productImages must be array" })
        }

        if (!req.id) {
            return res.status(400).json({ message: "userId is faild" })
        }

        await Order.create({
            userId: req.id,
            link,
            product,
            brand,
            quantity: parsedQuantity,
            productImages,
            status: OrderStatus.waitingManager,
        })

        return res.json({
            message: "order creadet"
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "server error"
        })
    }
}

export const getAllOrderManager = async (req: AuthRequest,res: Response) => {
    try{

        const orders = await Order.findAll({
            where: {status: {[Op.ne] :  OrderStatus.cancelled}}
        })
        // [Op.and]: [{ authorId: 12 }, { status: 'active' }], это оператор И
        // [Op.or]: [{ authorId: 12 }, { authorId: 13 }], это оператор ИЛИ
        return res.json({
            orders      
        })
    }catch(e){
        return res.status(500).json({
            message: "server error"
        })
    }
}

export const getAllOrderUser = async (req: AuthRequest,res: Response) => {

    try{
        const orders = await Order.findAll({
            where: {userId: req.id}
        })

        return res.json({
            message: "success",
            orders
        })
    }catch(e){
        return res.status(500).json({
            message: "server error"
        })
    }
}

export const AcceptOrder = async (req: AuthRequest,res: Response) => {
    try{
        const {id,idOrder, whenDate, price} = req.body

        if(!idOrder|| !id || !whenDate || !price){
            return res.status(400).json({
                message:" data is failid"
            })
        }

        const order = await Order.findByPk(idOrder)

        if(!order){
            return res.status(400).json({
                message:" order not found"
            }) 
        }

        await order.update({
            status: OrderStatus.approved,
            managerId: id,
            whenCamedate: whenDate,
            price: price,
            approvedAt: new Date(),
        })
        
        return res.status(200).json({
            message: "success"
        })

    }catch(e){
        return res.status(500).json({
            message: "server error"
        })
    }
}