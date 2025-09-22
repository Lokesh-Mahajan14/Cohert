import { callUserAuthApi } from "@/services";
import { createContext, useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

export const TaskManagerContext=createContext(null);


function TaskManagerProvider({children}){    

    const[user,setUser]=useState(null);
    const[loading,setLoading]=useState(false);
    const[tasksList,setTaskList]=useState([]);
    const taskFormData=useForm({
        defaultValues:{
        title:'',
        description:" ",
        status:"",
        priority:" ",
        }
    })

    const navigate=useNavigate();
    const location=useLocation();

    useEffect(()=>{
        const verifyUserCookie=async()=>{
            const data=await callUserAuthApi();
            if(data?.userInfo){
                setUser(data.userInfo);
            }
            return data?.success ?navigate(location.pathname==='/auth' || location.pathname==='/' ? "tasks/list" :`${location.pathname}`) :navigate("/auth"); 

        }
        verifyUserCookie();

    },[navigate,location.pathname]);



    return <TaskManagerContext.Provider value={{tasksList,setTaskList,setLoading,loading,user,setUser,taskFormData} }>{children}</TaskManagerContext.Provider>
}

export default TaskManagerProvider;