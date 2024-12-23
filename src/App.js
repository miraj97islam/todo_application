import './App.css';
import { use, useState, useEffect  } from 'react';
import { v4 as uuidv4 } from 'uuid';


function App() { 
  
  const[newInput, setnewInput]  = useState("");
  const[todoList, setTodoList] = useState([]);
  const[editTaskId, setEditTaskId] = useState(null);


  useEffect(() => { 
    const savedTodos = localStorage.getItem("todoList");

    if (savedTodos) {
      setTodoList(JSON.parse(savedTodos));
    }
  }, []);
  
  const addTodo = ()=>{ 

    if (!newInput.trim()){
      return
    }

     if (editTaskId){
       todoList.find(task=> task.id===editTaskId).task = newInput;

        localStorage.setItem("todoList", JSON.stringify(todoList));

        setTodoList(todoList);
        setnewInput("");
        setEditTaskId("");

     }else{
      const newValue = {
        id: uuidv4(),
        task: newInput
      }
  
      const updateList = [...todoList, newValue];
      
      localStorage.setItem("todoList", JSON.stringify(updateList));
  
      setTodoList(updateList);
      setnewInput("");
    }    
  }

  function visualizeToUpdate(id){
       const notepadEdit = todoList.find((task)=> task.id === id);

       if (notepadEdit) {
          setnewInput(notepadEdit.task);
          setEditTaskId(id);
       }
      
  }

  function deleteTodo(id){
    const updateList = todoList.filter((task)=> task.id !== id);

    localStorage.setItem("todoList", JSON.stringify(updateList));

    setTodoList(updateList);
  }


  function currentTodo(e){
    setnewInput(e.target.value);
  }


  return (
    <>
      <div className='grid place-items-center'>
        <div className='m-4 border-3 border-black'>
              Google Keep
        </div>

        <div className='grid place-items-center'>
            <div>
              <input onChange={currentTodo} value={newInput} class='border-2 border-black'></input> 
            </div>
            <div>
                <button onClick={addTodo} className='mt-4 mb-8 bg-green-500 hover:bg-green-700 text-white font-medium py-1 px-10 rounded-lg shadow-lg'>
                    Save          
                </button>
            </div>
         </div>

          <div className='px-60 py-2'>
              <ul>
                { todoList.map((task) => (
                          <li key={task.id} className='p-2 text-base text-center'>
                            {task.task} 
                          <div>
                            <button onClick={()=>visualizeToUpdate(task.id)} 
                                    className='ml-10 mr-2  bg-yellow-500 hover:bg-yellow-700 text-white text-base font-normal mt-2 py-1 px-6 rounded-lg shadow-lg'
                             >
                                Update
                            </button>
                            <button onClick={()=> deleteTodo(task.id)}  className='bg-red-500 hover:bg-red-700 text-white text-base font-normal mt-2 py-1 px-6 rounded-lg shadow-lg'>
                                Delete
                            </button>
                            </div>
                        </li>
                    ))}
              </ul>
          </div>
      </div>
    </>
    
  );
}

export default App;
