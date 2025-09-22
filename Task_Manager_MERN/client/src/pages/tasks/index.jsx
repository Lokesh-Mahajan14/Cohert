import CommonButton from "@/components/common-button";
import AddNewTasks from "@/components/tasks/add-new-tasks";
import TaskItem from "@/components/tasks/task-item";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskManagerContext } from "@/context";
import { addNewTaskApi, deleteTaskApi, getAllTasksApi } from "@/services";
import { Fragment, useContext, useEffect, useState } from "react";

function TasksPage() {
  const [showDialog, setShowDialog] = useState(false);
  const {
    tasksList,
    setTaskList,
    setLoading,   // ✅ corrected spelling
    loading,
    user,
    taskFormData,
  } = useContext(TaskManagerContext);

  async function handleSubmit(getData) {
    const response = await addNewTaskApi({
      ...getData,
      userId: user?._id,
    });

    if (response?.success) {
      setLoading(true);
      await fetchListOfTasks();
      setShowDialog(false);
      taskFormData.reset();
    }
  }

  async function handleDelete(getTaskid){
    
    const response=await deleteTaskApi(getTaskid);
    if(response?.success){
        await fetchListOfTasks();

    }
  }

  async function fetchListOfTasks() {
    const response = await getAllTasksApi(user?._id);
    //console.log("Fetched tasks response:", response);

    if (response?.success) {
      // ✅ backend sends "tasklist" not "tasksList"
      setTaskList(response?.tasklist || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (user !== null) fetchListOfTasks();
  }, [user]);

  if (loading) {
    return (
      <Skeleton className="w-full h-[550px] rounded-[6px] bg-black opacity-50" />
    );
  }

  return (
    <Fragment>
      <div className="mb-5">
        <CommonButton
          onClick={() => setShowDialog(true)}
          buttonText={"Add New Task"}
        />
      </div>

      <div className="mt-5 flex flex-col">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tasksList?.length > 0 ? (
            tasksList.map((taskItem) => (
              <TaskItem setShowDialog={setShowDialog} handleDelete={handleDelete} key={taskItem._id} item={taskItem} />  
            ))
          ) : (
            <h1>No tasks added! Please add one</h1>
          )}
        </div>
      </div>

      <AddNewTasks
        showDialog={showDialog}
        handleSubmit={handleSubmit}
        setShowDialog={setShowDialog}
        taskFormData={taskFormData}
      />
    </Fragment>
  );
}

export default TasksPage;
