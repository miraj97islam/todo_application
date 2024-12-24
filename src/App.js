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
    setnewInput("");

  }


  function currentTodo(e){
    setnewInput(e.target.value);
  }


  return (
    <>
      <div className='container'>
       
        <div className='notepad-container'>
            <div className='m-4'>
                  Google Keep
            </div>
            <div>
              <textarea onChange={currentTodo} value={newInput} class='notepad'></textarea> 
            </div>
            <div>
                <button onClick={addTodo} className='btn-save'>
                    Save          
                </button>
            </div>
        </div>

        { todoList.map((task) => (
            <div  className='note-item'>
                  <div key={task.id}  onClick={()=>visualizeToUpdate(task.id)} className='note-item-content'>
                    {task.task} 
                  </div>
                    <button onClick={()=> deleteTodo(task.id)}  className='btn-delete'>
                        X
                    </button>
            </div> 
            ))}
        </div>
    </>
  );
}

export default App;
