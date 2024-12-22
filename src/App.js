import './App.css';
import { use, useState, useEffect  } from 'react';
import { v4 as uuidv4 } from 'uuid';


function App() {
  
  const[newInput, setnewInput]  = useState("");
  const[todoList, setTodoList] = useState([]);

  useEffect(() => { 
    const savedTodos = localStorage.getItem("todoList");

    if (savedTodos) {
      setTodoList(JSON.parse(savedTodos));
    }
  }, []);
  
  const addTodo = ()=>{ 
     const newValue = {
      id: uuidv4(),
      task: newInput
     }

     const updateList = [...todoList, newValue];
     
     localStorage.setItem("todoList", JSON.stringify(updateList));

     setTodoList(updateList);
     setnewInput("");
  }

  function currentTodo(e){
    setnewInput(e.target.value);
  }


  return (
    <>
      <div>
          Google Keep
      </div>

      <div>
          <input onChange={currentTodo} value={newInput}></input> 
          <button onClick={addTodo}>
              Save          
            </button>
      </div>

      <div>
          <ul>
            { todoList.map((task) => (
                    <li key={task.id}>
                           {task.task}
                        <button>Update</button>
                        <button>Delete</button>
                    </li>
                    
                ))}
          </ul>
      </div>
    </>
    
  );
}

export default App;
