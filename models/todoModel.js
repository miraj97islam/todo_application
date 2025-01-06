let todos = require('../data/todos');
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils')


function findAll(){
    return new Promise((resolve, reject)=>{
        resolve(todos);
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const todo = todos.find((p) => p.id === id)
        resolve(todo)
    })
}


function create(todo) {
    return new Promise((resolve, reject) => {
        const newTodo = {id: uuidv4(), ...todo}
        todos.push(newTodo)
            writeDataToFile('./data/todos.json', todos);
        resolve(newTodo)
    })
}


function update(id, todo) {
    return new Promise((resolve, reject) => {
        const index = todos.findIndex((p) => p.id === id)
        todos[index] = {id, ...todo}
            writeDataToFile('./data/todos.json', todos);
        resolve(todos[index])
    })
}


function remove(id) {
    return new Promise((resolve, reject) => {
         todos = todos.filter((p) => p.id !== id)
            writeDataToFile('./data/todos.json', todos);
        resolve()
    })
}


module.exports = {findAll, findById, create, remove, update};