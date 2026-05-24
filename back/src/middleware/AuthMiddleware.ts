import jwt from "jsonwebtoken"

import type { Request, Response, NextFunction } from "express"
import { User } from "../Models/User"

export interface AuthRequest extends Request {
    id?: number
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(400).json({
                message: "not auth"
            })
        }

        const decoded = jwt.verify(token, process.env.JWTSecret!) as {id: number}

        req.id = decoded.id
        
        const user = await User.findByPk(decoded.id)

        if(!user|| user.dataValues.isDeleted) {
            return res.status(403).json({
                messaage: "account deleted"
            })
        }
        
        next()
    } catch (e) {
        return res.status(401).json({
            message: "not auth"
        })
    }
}