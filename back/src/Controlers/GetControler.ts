import { AuthRequest } from "../middleware/AuthMiddleware";
import type { Response } from "express"
import { User, UserRole } from "../Models/User";
import { Op } from "sequelize";


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
        
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "server error"
        })
    }
}