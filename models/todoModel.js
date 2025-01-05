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
        // if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/todos.json', todos);
        // }
        resolve(newTodo)
    })
}


function remove(id) {
    return new Promise((resolve, reject) => {
         todos = todos.filter((p) => p.id !== id)
        // if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/todos.json', todos);
        // }
        resolve()
    })
}


module.exports = {findAll, findById, create, remove};