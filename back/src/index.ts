import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import {register, login,getUser} from "./Controlers/AuthControler.ts"
import {authMiddleware} from "./middleware/AuthMiddleware.ts"
import { sequelize } from "./db.ts"

import cookieParser from "cookie-parser"

dotenv.config()

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json())
app.use(cookieParser())

app.post("/auth/register", register)
app.post("/auth/login", login)
app.get("/auth/me",authMiddleware, getUser)

async function start() {
    try {
        await sequelize.authenticate()
        console.log("bd connect")

        // await sequelize.sync({alter: true} - Это попытается изменить таблицу без удаления данных
        //  await sequelize.sync({force: true}) - Это удалит таблицу и создаст заново уже
        await sequelize.sync()
        console.log("bd synced")
        app.listen(5000, () => {
            console.log("server started on 5000 port")
        })

    } catch (e) {
        console.log(e)
    }
}

start()