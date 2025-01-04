const http = require('http');
const fs = require('fs');
// const { getProducts } = require('./controllers/todoController');
const url = require('url');
const { json } = require('stream/consumers');
const TODOS_FILE_PATH = './todos.json';

function readTodosFromFile() {
    try {
      const data = fs.readFileSync(TODOS_FILE_PATH);
      return JSON.parse(data);
    } catch (error) {
      return ['error found']; // Return an empty array if the file doesn't exist or there's an error
    }
  }


const server = http.createServer((req, res) =>{
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  const parsedUrl = url.parse(req.url, true);

  // GET /todos - Get all todos
  if (parsedUrl.pathname === '/todos' && req.method === 'GET') {
    const todos = readTodosFromFile();
    res.writeHead(200);
    res.end(JSON.stringify(todos));
    // res.end(todos);
  }
})


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;