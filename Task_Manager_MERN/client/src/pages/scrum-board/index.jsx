import { scrumBoardOptions } from "@/config";
import { TaskManagerContext } from "@/context";
import { Fragment, useContext, useEffect } from "react";
import { addNewTaskApi, deleteTaskApi, getAllTasksApi, updateTaskApi } from "@/services";
import CommonCard from "@/components/common-card";



function ScrumBoardPage(){
    const{user,setTaskList,tasksList,setLoading}=useContext(TaskManagerContext)

     async function fetchListOfTasks() {
        const response = await getAllTasksApi(user?._id);
        //console.log("Fetched tasks response:", response);
    
        if (response?.success) {
          // ✅ backend sends "tasklist" not "tasksList"
          setTaskList(response?.tasklist || []);
        }
        setLoading(false);
      }

    function renderTaskByTaskStatus(){
        const taskStatuses={
            todo:[],
            inProgress:[],
            blocked:[],
            review:[],
            done:[],
        }
        tasksList.forEach((taskItem)=>{
            taskStatuses[taskItem.status].push(
                <div>
                    <CommonCard title={taskItem?.title} description={taskItem?.status} />
                </div>
            )
        })
        return taskStatuses;
      }

    useEffect(()=>{
        if (user !== null) fetchListOfTasks();
    },[user]);


    return(
        <Fragment>
            <div className="grid grid-cols-5 gap-2 h-full">
                {
                    scrumBoardOptions.map(item=><div key={item.id} className="bordr border-[#333333] rounded overflow-auto " onDrop={(event)=>onDrop(event,item.id)} onDragOver={(event)=>event.preventDefault()}>
                        <div className="px-1 py-3 text-center bg-black border-none mb-3">
                            <h3 className="text-2xl text-white font-extrabold">
                                {item.label}
                            </h3>
                        </div>
                        <div>
                            {renderTaskByTaskStatus()[item.id]}
                        </div>
                    </div>
                    )
                }
            </div>
        </Fragment>
    )
}

export default ScrumBoardPage;