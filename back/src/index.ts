import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import {User} from "./Models/User.ts"
import {sequelize} from "./db.ts"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

async function start() {
    try {

        app.listen(5000, () => {
            console.log("server started on 5000 port")
        })

    } catch (e) {
        console.log(e)
    }
}

start()