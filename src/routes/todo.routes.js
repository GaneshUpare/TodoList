const express=require("express")
const router=express.Router()

const {CreateTodo,getTodos,getTodosByID, updatedTodo} =require("../controller/todo.controller")

// create add route

router.post("/add",CreateTodo)

// getAll Todos

router.get("/",getTodos)

// get todos by id

router.get("/:id",getTodosByID)

router.put("/:id",updatedTodo)



module.exports=router