import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import {register, login,getUser,registryGoogle} from "./Controlers/AuthControler.ts"
import {authMiddleware} from "./middleware/AuthMiddleware.ts"
import {createRequest,getAllOrderUser,getAllOrderManager} from "./Controlers/OrderControler.ts"
import { setRole } from "./utils/setRole.ts"

import { sequelize } from "./db.ts"

import cookieParser from "cookie-parser"
import { RoleMiddleware } from "./middleware/RoleMiddleware.ts"
import { UserRole } from "./Models/User.ts"
import { logout } from "./Controlers/ProfileController.ts"
import { getAllUser, getUsersByManager } from "./Controlers/GetControler.ts"

import {generateData} from "./seed.ts"

dotenv.config()

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json())
app.use(cookieParser())

//POST
app.post("/auth/register", register)
app.post("/auth/login", login)
app.post("/auth/google",registryGoogle)
app.post("/logout",logout)
app.post("/order", authMiddleware, createRequest)

//PATCH
app.patch("/users/role", authMiddleware, RoleMiddleware([UserRole.admin]),setRole) // ПРОВЕРИТЬ

//GET
app.get("/auth/me",authMiddleware, getUser)
app.get("/client/orders", authMiddleware , RoleMiddleware([UserRole.client]), getAllOrderUser)

app.get("/manager/orders", authMiddleware , RoleMiddleware([UserRole.manager]), getAllOrderManager)
app.get("/manager/users", authMiddleware , RoleMiddleware([UserRole.manager]), getUsersByManager)

app.get("/admin/users", authMiddleware , RoleMiddleware([UserRole.admin]), getAllUser)

async function start() {
    try {
        await sequelize.authenticate()
        console.log("bd connect")

        // await sequelize.sync({alter: true} - Это попытается изменить таблицу без удаления данных
        //  await sequelize.sync({force: true}) - Это удалит таблицу и создаст заново уже
        await sequelize.sync({alter: true})
        
        console.log("bd synced")
        app.listen(5000, () => {
            console.log("server started on 5000 port")
        })

        await generateData()

    } catch (e) {
        console.log(e)
    }
}

start()
