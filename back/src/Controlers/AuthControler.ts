import type { Request, Response } from "express"
import { User, UserRole } from "../Models/User.ts"
import { GenerateJWT } from "../utils/GenerateJWT.ts"
import bcrypt from "bcrypt"
import type { AuthRequest } from "../middleware/AuthMiddleware.ts"

import { OAuth2Client } from "google-auth-library"
import dotenv from "dotenv"

dotenv.config()

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)


export const registryGoogle = async (req: Request, res: Response) => {
    try {
        const { credential } = req.body

        //Google проверяет:настоящий ли токен, не подделан ли, кем выдан.
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        //Получаем данные пользователя:
        const payload = ticket.getPayload()

        if (!payload) {
            return res.status(400).json({ message: "invalid token" })
        }

        const {
            email,
            given_name,
            family_name,
            picture
        } = payload

        let user = await User.findOne({
            where: { email }
        })

        if (!user) {
            user = await User.create({
                role: UserRole.client,
                name: given_name,
                lastName: family_name || "",
                email,
                companyName: "Google User",
                password: null,
                avatar: picture,
                isDeleted: false
            })
        }

        if (user.dataValues.isDeleted) {
            return res.status(403).json({
                message: "account deleted"
            })
        }

        const token = GenerateJWT(user.dataValues.id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // если true cookie работает только через HTTPS.
            sameSite: "lax",
            maxAge: 2 * 60 * 60 * 1000
        })

        return res.json({
            user: {
                role: user.dataValues.role 
            },
            message: "Успешно!"
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "server error"
        })
    }
}


export const register = async (req: Request, res: Response) => {
    try {

        const { name, lastName, email, companyName, password } = req.body

        if (!name || !lastName || !email || !companyName || !password) {
            return res.status(400).json({
                message: "data is faild"
            })
        }

        const candidate = await User.findOne({
            where: { email }
        })

        if (candidate !== null) {
            return res.status(400).json({
                message: "user already exists"
            })
        }

        const hashPassword = await bcrypt.hash(
            password,
            10
        )

        const user = await User.create({
            role: UserRole.client,
            name: name,
            lastName: lastName,
            email: email,
            companyName: companyName,
            password: hashPassword
        })

        //можно писать и просто user.id ,dataValues - на всякий случай
        const token = GenerateJWT(user.dataValues.id)

        res.cookie("token", token, {
            httpOnly: true, //Запрещает JS доступ к cookie.
            secure: false, // если true cookie работает только через HTTPS.
            sameSite: "lax",
            maxAge: 2 * 60 * 60 * 1000 //Сколько живёт cookie. 2 часа
        })

        return res.json({
            user: {
                role: user.dataValues.role 
            },
            message: "Успешно!"
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "server error"
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ //получает один объект по определенному критерию
            where: { email }
        })

        if (!user) {
            return res.status(400).json({
                message: "not find user"
            })
        }

        if (user.dataValues.isDeleted) {
            return res.status(403).json({
                message: "account deleted"
            })
        }

        const pas = await bcrypt.compare(
            password,
            user.dataValues.password
        )

        if (!pas) {
            return res.status(400).json({
                message: "wrong password"
            })
        }
        const token = GenerateJWT(user.dataValues.id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 2 * 60 * 60 * 1000
        })

        return res.json({
            user:{
                role: user.dataValues.role,
            },
            message: "Успешно!"
        })
    } catch (e) {
        res.status(500).json({
            message: "error server"
        })
    }
}

export const getUser = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findByPk(req.id) // получает объект по первичному ключу

        return res.json({
            user: {
                id: user?.dataValues.id,
                role: user?.dataValues.role,
                name: user?.dataValues.name,
                lastName: user?.dataValues.lastName,
                email: user?.dataValues.email,
                companyName: user?.dataValues.companyName,
                avatar: user?.dataValues.avatar,
            }
        });
    } catch {
        return res.status(500).json({
            message: "server error",
        });
    }
};