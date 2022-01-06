const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');


/**
 * @route GET api/v1/todos
 * @desc  Get all todos
 * @access Private
 */
router.get('/',
    todoController.getAllTodos
);

/**
 * @route GET api/v1/todos/:id
 * @desc  Get a todo
 * @access Private
 */
router.get('/:id',
    todoController.getTodo
);

/**
 * @route POST api/v1/todos
 * @desc  Add a todo
 * @access Private
 */
router.post('/',
    todoController.addTodo
);

/**
 * @route PUT api/v1/todos/:id
 * @desc  Get all todos
 * @access Private
 */
router.put('/:id',
    todoController.updateTodo
);

/**
 * @route DELETE api/v1/todos/:id
 * @desc  Get all todos
 * @access Private
 */
router.delete('/:id',
    todoController.deleteTodo
);

module.exports = router;