const Todos = require('../models/todoModel.js');
const { getPostData } = require('../utils')

async function getTodos(req, res) {
    try{
        const todos = await Todos.findAll();

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(todos))
    }catch(err){
        console.log(err);
    }
}


async function createTodo(req, res) {
    try {
        const body = await getPostData(req)

        const { inputType, task } = JSON.parse(body)

        const todo = {
            inputType,
            task
        }

        const newTodo = await Todos.create(todo)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newTodo))  

    } catch (error) {
        console.log(error)
    }
}


async function deleteTodo(req, res, id) {
    try {
        const todo = await Todos.findById(id)

        if(!todo) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Todos Not Found' }))
        } else {
            await Todos.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Todos ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getTodos, deleteTodo, createTodo};