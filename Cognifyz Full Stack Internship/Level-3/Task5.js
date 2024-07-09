const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let todos = [
    { id: 1, title: 'Learn JavaScript', completed: false },
    { id: 2, title: 'Build a RESTful API', completed: false },
    { id: 3, title: 'Create a front-end interface', completed: false }
];

// GET all todos
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// GET single todo
app.get('/api/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === todoId);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
});

// POST new todo
app.post('/api/todos', (req, res) => {
    const { title } = req.body;
    const newTodo = {
        id: todos.length + 1,
        title,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT update todo
app.put('/api/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const { title, completed } = req.body;
    const todoToUpdate = todos.find(todo => todo.id === todoId);
    if (!todoToUpdate) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todoToUpdate.title = title;
    todoToUpdate.completed = completed;
    res.json(todoToUpdate);
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== todoId);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
