import { scrumBoardOptions } from "@/config";
import { TaskManagerContext } from "@/context";
import { Fragment, useContext, useEffect } from "react";
import {
  addNewTaskApi,
  deleteTaskApi,
  getAllTasksApi,
  updateTaskApi,
} from "@/services";
import CommonCard from "@/components/common-card";

function ScrumBoardPage() {
  const { user, setTaskList, tasksList, setLoading } =
    useContext(TaskManagerContext);

  /* ---------------- FETCH TASKS ---------------- */
  async function fetchListOfTasks() {
    const response = await getAllTasksApi(user?._id);

    if (response?.success) {
      setTaskList(response?.tasklist || []);
    }
    setLoading(false);
  }

  /* ---------------- GROUP TASKS BY STATUS ---------------- */
  function renderTaskByTaskStatus() {
    const taskStatuses = {
      todo: [],
      inProgress: [],
      blocked: [],
      review: [],
      done: [],
    };

    tasksList.forEach((taskItem) => {
      taskStatuses[taskItem.status]?.push(
        <div key={taskItem._id} className="mb-3">
          <CommonCard
            title={taskItem?.title}
            description={taskItem?.description}
          />
        </div>
      );
    });

    return taskStatuses;
  }

  useEffect(() => {
    if (user !== null) fetchListOfTasks();
  }, [user]);

  return (
    <Fragment>
      {/* PAGE WRAPPER */}
      <div
        className="h-[calc(100vh-64px)] w-full flex items-center justify-center 
        bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-6"
      >
        {/* GLASS CONTAINER */}
        <div
          className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl 
          p-6 w-full max-w-7xl border border-white/20 animate-fadeIn"
        >
          {/* HEADER */}
          <div className="mb-6">
            <h2 className="text-4xl font-extrabold text-white drop-shadow-md">
              Scrum Board
            </h2>
            <p className="text-white/80 mt-1">
              Track progress visually 🧩
            </p>
          </div>

          {/* SCRUM BOARD */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 h-[65vh]">
            {scrumBoardOptions.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 
                  rounded-2xl flex flex-col overflow-hidden"
                onDragOver={(event) => event.preventDefault()}
              >
                {/* COLUMN HEADER */}
                <div className="py-3 text-center bg-black/40">
                  <h3 className="text-xl text-white font-bold">
                    {item.label}
                  </h3>
                </div>

                {/* TASK LIST */}
                <div className="p-3 overflow-y-auto flex-1">
                  {renderTaskByTaskStatus()[item.id]?.length > 0 ? (
                    renderTaskByTaskStatus()[item.id]
                  ) : (
                    <p className="text-center text-white/60 text-sm mt-6">
                      No tasks
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ScrumBoardPage;
