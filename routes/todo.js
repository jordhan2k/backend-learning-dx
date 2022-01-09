const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const todoController = require('../controllers/todo.controller');
const verifyToken = require('../middlewares/auth');

const verifyTodo = [
    check("title").notEmpty().withMessage("Title must be a bin-empty string."),
    check("isCompleted").isBoolean().withMessage("IsCompleted must be a boolean value.")
];

/**
 * @route GET api/v1/todos
 * @desc  Get all todos
 * @access Private
 */
router.get('/',
    verifyToken,
    todoController.getAllTodos
);

/**
 * @route GET api/v1/todos/:id
 * @desc  Get a todo
 * @access Private
 */
router.get('/:id',
    verifyToken,
    todoController.getTodo
);

/**
 * @route POST api/v1/todos
 * @desc  Add a todo
 * @access Private
 */
router.post('/',
    verifyToken,
    verifyTodo,
    todoController.addTodo
);

/**
 * @route PUT api/v1/todos/:id
 * @desc  Get all todos
 * @access Private
 */
router.put('/:id',
    verifyToken,
    verifyTodo,
    todoController.updateTodo
);

/**
 * @route DELETE api/v1/todos/:id
 * @desc  Get all todos
 * @access Private
 */
router.delete('/:id',
    verifyToken,
    todoController.deleteTodo
);

module.exports = router;