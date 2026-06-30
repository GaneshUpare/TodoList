const express =require("express")
const todoRoutes=require("./src/routes/todo.routes")
const dotenv=require("dotenv")
const connectDB = require("./src/config/db")

const app=express()
app.use(express.json())
dotenv.config()


connectDB()
app.use("/api",todoRoutes)


app.listen(process.env.PORT,()=>{
    console.log("server is running on port 3001")
})