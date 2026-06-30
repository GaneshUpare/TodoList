const Todo = require("../models/todo.models")
const mongoose = require("mongoose")

// create todos

const CreateTodo = async (req, res) => {
    try {

        const { title, description } = req.body

        // validation 
        if (!title || title.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            })
        }

        const todo = await Todo.create({
            title,
            description,
        })

        return res.status(200).json({
            success: true,
            message: "Todo created Successfully",
            todo
        })
    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })

    }
}


// get all todos

const getTodos = async (req, res) => {

    try {
        const { search, sort } = req.query

        let query = {}


        if (search) {
            query.search = { $regex: search, $options: "i" }
        }

        // sorting

        let sortOption = {}
        if (sort === "asc") sortOption.createdAt = 1

        const todos = await Todo.find(query).sort(sortOption)

        return res.status(200).json({
            success: true,
            message: "Todo Fetched Successfully",
            data: todos
        })
    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
    }
}

// get one todos
const getTodosByID = async (req, res) => {
    try {
        const { id } = req.params

        // validate id based on mongoose

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Todo ID",
            })
        }
        const todo = await Todo.findById(id)

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not Found",

            })
        }

        return res.status(200).json({
            success: true,
            message: "Todo fetched successfully",
            data: todo,
        })
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
    }
}

const updatedTodo = async (req, res) => {
    try {

        const { id } = req.params

        const { title, description } = req.body


        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Todo ID",
            })
        }

        if (!title || title.trim()=== "") {
            return res.status(400).json({
                success: false,
                message: "title id required",
            })
        }

        const todo = await Todo.findByIdAndUpdate(id, { title, description }, { new: true, runValidators: true })
    

    if(!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not Found",

            })
        }

        return res.status(200).json({
            success:true,
            message:"Todo Updated Successfully",
            data:todo,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Inernal Server Error",
        })
    }
}
module.exports = { CreateTodo, getTodos, getTodosByID ,updatedTodo}