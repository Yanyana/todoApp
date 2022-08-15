var express = require('express');
var router = express.Router();
const todoController = require("../controllers/todoController");

const { body } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/todo-items', 
  body('title')
  .isLength({ min: 1 })
  .withMessage('notNull Violation: todo_items.title cannot be null'),
  body('activity_group_id')
  .isLength({ min: 1 })
  .withMessage('notNull Violation: todo_items.activity_group_id cannot be null'), (req, res, next) => {
  todoController.createTodo(req, res, next)
});

router.get('/todo-items', (req, res, next) => {
  todoController.GetTodo(req, res, next)
});

router.get('/todo-items/:id', (req, res, next) => {
  todoController.GetTodo(req, res, next)
});

router.delete('/todo-items/:id', (req, res, next) => {
  todoController.deleteTodo(req, res, next)
});

router.patch('/todo-items/:id',
  body('title')
  .isLength({ min: 1 })
  .withMessage('notNull Violation: todo_items.title cannot be null'),
  body('activity_group_id')
  .isLength({ min: 1 })
  .withMessage('notNull Violation: todo_items.activity_group_id cannot be null'), (req, res, next) => {
  todoController.updateTodo(req, res, next)
});

module.exports = router;
