import CommonButton from "@/components/common-button";
import AddNewTasks from "@/components/tasks/add-new-tasks";
import TaskItem from "@/components/tasks/task-item";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskManagerContext } from "@/context";
import {
  addNewTaskApi,
  deleteTaskApi,
  getAllTasksApi,
  updateTaskApi,
} from "@/services";
import { Fragment, useContext, useEffect, useState } from "react";

function TasksPage() {
  const [showDialog, setShowDialog] = useState(false);

  const {
    tasksList,
    setTaskList,
    setLoading,
    loading,
    user,
    taskFormData,
    setCurrentEditedId,
    currentEditedId,
  } = useContext(TaskManagerContext);

  async function handleSubmit(getData) {
    const response =
      currentEditedId !== null
        ? await updateTaskApi({
            ...getData,
            _id: currentEditedId,
            userId: user?._id,
          })
        : await addNewTaskApi({
            ...getData,
            userId: user?._id,
          });

    if (response?.success) {
      setLoading(true);
      await fetchListOfTasks();
      setShowDialog(false);
      taskFormData.reset();
      setCurrentEditedId(null);
    }
  }

  async function handleDelete(taskId) {
    const response = await deleteTaskApi(taskId);
    if (response?.success) {
      await fetchListOfTasks();
    }
  }

  async function fetchListOfTasks() {
    const response = await getAllTasksApi(user?._id);
    if (response?.success) {
      setTaskList(response?.tasklist || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (user !== null) fetchListOfTasks();
  }, [user]);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center">
        <Skeleton className="w-[90%] max-w-6xl h-[400px] rounded-3xl bg-black/40" />
      </div>
    );
  }

  return (
    <Fragment>
      {/* PAGE WRAPPER */}
      <div className="min-h-[calc(100vh-64px)] w-full 
        bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4 py-10">

        {/* GLASS CARD */}
        <div className="mx-auto bg-white/10 backdrop-blur-xl shadow-2xl 
          rounded-3xl p-6 sm:p-8 w-full max-w-7xl border border-white/20">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center 
            sm:justify-between gap-6 mb-8">

            <div className="text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                My Tasks
              </h2>
              <p className="text-white/80 mt-1">
                Organize your work efficiently 🚀
              </p>
            </div>

            <CommonButton
              onClick={() => setShowDialog(true)}
              buttonText="Add New Task"
            />
          </div>

          {/* TASK GRID */}
          <div className="grid gap-6 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            place-items-center">

            {tasksList?.length > 0 ? (
              tasksList.map((taskItem) => (
                <TaskItem
                  key={taskItem._id}
                  item={taskItem}
                  setShowDialog={setShowDialog}
                  handleDelete={handleDelete}
                  setCurrentEditedId={setCurrentEditedId}
                  taskFormData={taskFormData}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-24">
                <h3 className="text-2xl font-semibold text-white">
                  No tasks yet 😴
                </h3>
                <p className="text-white/70 mt-2">
                  Click “Add New Task” to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      <AddNewTasks
        showDialog={showDialog}
        handleSubmit={handleSubmit}
        setShowDialog={setShowDialog}
        taskFormData={taskFormData}
        currentEditedId={currentEditedId}
      />
    </Fragment>
  );
}

export default TasksPage;
