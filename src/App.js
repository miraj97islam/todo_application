import './App.css';
import { use, useState, useEffect  } from 'react';
import { v4 as uuidv4 } from 'uuid';


  function InputCompnent({onChangeTrigger, inputValue}){

    return <input onChange={onChangeTrigger} value={inputValue} class='notepad' placeholder ="Add your task.."></input> 

}

function VisualizedNotes({keyValue, noteVlaue, onClickTriger, className}){
  return(
    <div key={keyValue}  onClick ={onClickTriger} className={className}>
        {noteVlaue} 
    </div>
  )
}

function SaveButton({onClickTriger, className}){
  return (
        <button onClick={onClickTriger} className={className}>
                    Save          
        </button>
  )
}

function DeleteButton({onClickTriiger, className}){
  return (  
        <button onClick={onClickTriiger}  className= {className}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
           class="size-4 lg:size-5 xl:size-7 2xl:size-10">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
  )
}

function App() { 
  
  const[newInput, setnewInput]  = useState("");
  const[todoList, setTodoList] = useState([]);
  const[editTaskId, setEditTaskId] = useState(null);
  // const[categoryId, setCategoryId] = useState("");
  // const[inputTypeId, setinputTypeId] = useState("tasks");


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

      <div id = "header">
        <div class="flexrow-container">
            <div class="standard-theme theme-selector"></div>
            <div class="light-theme theme-selector"></div>
            <div class="darker-theme theme-selector"></div>
        </div>
      </div>
       
        <div className='notepad-container'>
            <div className='title'>
                  Google Keep
            </div>
            <div>
                <InputCompnent onChangeTrigger = {currentTodo} inputValue = {newInput} />
            </div>
            <div>
                <SaveButton onClickTriger={addTodo} className={'btn-save'}/>
            </div>
        </div>

        {/* <div>
          <select name="importance" id="categoryList">
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        </select>
        </div> */}

        { todoList.map((task) => (
            <div  className='note-item'>
                  <VisualizedNotes keyValue = {task.id} noteVlaue ={task.task} onClickTriger ={()=>visualizeToUpdate(task.id)} className = {'note-item-content'} />
                  <DeleteButton onClickTriiger={()=> deleteTodo(task.id)} className={'btn-delete'} />
            </div> 
            ))}
        </div>
    </>
  );
}

export default App;
