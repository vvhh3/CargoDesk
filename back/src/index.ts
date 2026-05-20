import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import {register, login,getUser,registryGoogle} from "./Controlers/AuthControler.ts"
import {authMiddleware} from "./middleware/AuthMiddleware.ts"
import {createRequest} from "./Controlers/OrderControler.ts"
import { setRole } from "./utils/setRole.ts"

import { sequelize } from "./db.ts"

import cookieParser from "cookie-parser"
import { RoleMiddleware } from "./middleware/RoleMiddleware.ts"
import { UserRole } from "./Models/User.ts"

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
app.post("/auth/google",registryGoogle)
app.post("/order",authMiddleware,createRequest)
app.patch("/users/role",authMiddleware,RoleMiddleware([UserRole.admin]),setRole)

app.get("/auth/me",authMiddleware, getUser)

// app.get("/client/dashboard",authMiddleware,RoleMiddleware([UserRole.client]), getClientDashboard)

async function start() {
    try {
        await sequelize.authenticate()
        console.log("bd connect")

        // await sequelize.sync({alter: true} - Это попытается изменить таблицу без удаления данных
        //  await sequelize.sync({force: true}) - Это удалит таблицу и создаст заново уже
        await sequelize.sync({force: true})
        console.log("bd synced")
        app.listen(5000, () => {
            console.log("server started on 5000 port")
        })

    } catch (e) {
        console.log(e)
    }
}

start()
