var express = require('express');
var router = express.Router();
const todoController = require("../controllers/todoController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/todo-items', (req, res, next) => {
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

router.patch('/todo-items/:id', (req, res, next) => {
  todoController.updateTodo(req, res, next)
});

module.exports = router;
