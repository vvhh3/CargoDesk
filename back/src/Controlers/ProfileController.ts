import type { Request, Response } from "express"
import { AuthRequest } from "../middleware/AuthMiddleware"
import { User } from "../Models/User"

export const logout = async (req: Request, res: Response) => {
    try {

        res.clearCookie("token", {
            httpOnly: true, //Запрещает JS доступ к cookie.
            secure: false, // если true cookie работает только через HTTPS.
            sameSite: "lax"
        })

        return res.json({
            message: "logout success"
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "server error"
        })
    }
}

//Проверить!
export const deleteProfile = async (req: AuthRequest, res: Response) => {
    try {

        const user = await User.findByPk(req.id)
        if (!user) {
            return res.json({
                message: "not found user"
            })
        }

        user.update({
            isDeleted: true
        })

        res.clearCookie("token",{
            httpOnly: true,
            secure: false,
            sameSite:"lax"
        })

        return res.json({
            message: "deleted success"
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "server error"
        })
    }
}