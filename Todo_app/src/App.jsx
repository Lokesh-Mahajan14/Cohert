import { useEffect, useState } from "react"
import classes from "./styles.module.css"
import TodoItem from "./components/todo-item"
import Formcomponent from "./components/form";
import LoginCompoent from "./components/login";
import RegisterCompoent from "./components/register";
function App() {

  const[loading,setLoading]=useState(false);
  const[todolist,setTodolist]=useState([]);
  const[errorMsg,setErrorMsg]=useState(null);

  async function fetchListofTodos() {
    try{
      let data=await fetch('');
      data=await data.json();
      console.log(data);
      if(data?.todos && data?.todos?.lenght>0){
        setTodolist[data?.todos];
        setLoading(false);
      }else{
        setTodolist([]);
        setLoading(true);
        setErrorMsg('')
      }

    }catch(e){
      setErrorMsg('some error occured')

    }
  }

  useEffect(()=>{
    fetchListofTodos();
  },[])
 
  return(
    // <div className={classes.mainwrapper}>
    //   <h1 className={classes.headerTitle}>Simple Todo App</h1>
    //   <div>
    //     {
    //       todolist && todolist.length>0
    //       ?todolist.map(todoItem=>{<TodoItem todo={todoItem}/>})
    //       :null}

    //   </div>
    // </div>
    //<Formcomponent/>
    <div style={{display:"flex", gap:"20px"}}>
      <LoginCompoent/>
      <RegisterCompoent/>
    </div>

  )
}

export default App
