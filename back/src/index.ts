const express = require("express")
const cors = require ("cors")
import dotenv from 'dotenv'

const app = express()
app.use(cors())
app.use(express.json())


app.listen(5000 ,() => {
    console.log("server started on 5000 port")
})