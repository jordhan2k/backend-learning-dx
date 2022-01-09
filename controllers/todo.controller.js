const { validationResult } = require('express-validator');
const Todo = require('../models/Todo');


const getAllTodos = async (req, res) => {
    const { page, limit } = req.query;

    const customLabels = {
        totalDocs: "totalItems",
        docs: "todos",
        page: "currentPage",
    }
    const options = {
        limit: limit && limit,
        page: page && page,
        customLabels,
        populate: {
            path: "user",
            select: "username"
        },
        pagination: page && limit
    };

    try {
        const data = await Todo.paginate(
            { user: req.userId },
            options,
        )
        return res.json({
            success: true,
            ...data
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Internal server error!"
        });
    }
}

const addTodo = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Todo is in bad structure",
            errors: errors.array()
        })
    }

    const { title, desc, isCompleted } = req.body;
    try {
        const newTodo = new Todo({
            title,
            desc,
            isCompleted,
            user: req.userId
        });

        await newTodo.save();

        return res.json({
            success: true,
            message: "Happy todo!",
            todo: newTodo
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const getTodo = async (req, res) => {
    try {
        const byId = await Todo.findOne({
            _id: req.params.id,
            user: req.userId
        })

        return res.json({
            success: true,
            todo: byId
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const updateTodo = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Todo is in bad structure",
            errors: errors.array()
        })
    }

    const { title, desc, isCompleted } = req.body;

    let updatedTodo = {
        title,
        desc,
        isCompleted
    };

    const updateCondition = {
        _id: req.params.id,
        user: req.userId
    }

    try {
        updatedTodo = await Todo.findOneAndUpdate(updateCondition, updatedTodo, { new: true });

        return res.json({
            success: true,
            message: "Todo updated!",
            todo: updatedTodo
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const deleteTodo = async (req, res) => {
    try {
        const deleteCondition = {
            _id: req.params.id,
            user: req.userId
        }

        const deletedTodo = await Todo.findOneAndDelete(deleteCondition);

        if (!deletedTodo) {
            return res.status(401).json({
                success: false,
                message: "Todo not found or user not authorised"
            });
        }

        return res.json({
            success: true,
            message: "Oops! Drop the beat :D",
            todo: deletedTodo
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

module.exports = { getAllTodos, getTodo, addTodo, updateTodo, deleteTodo };