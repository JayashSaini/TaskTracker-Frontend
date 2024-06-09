import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Input from "../components/Input";
import { useAuth } from "../context/auth.context";
import { requestHandler } from "../util";
import { getAllTodos, toggleIsCompleted, deleteTodo } from "../api";
import Loader from "../components/Loader";
import Accordion from "../components/tasks/Accordion.js";
import { toast } from "sonner";
import AddTask from "../components/tasks/AddTask.js";
import { createTodo } from "../api";

const Task = () => {
  const [openLogout, SetOpenLogout] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addTaskDialog, setAddTaskDialog] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // task state
  const [tasks, setTasks] = useState<any[]>([]);

  const { logout } = useAuth();

  // Function to update state when input data changes
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Function to handle the logout process
  const logoutHandler = () => {
    // Call the logout function from the authentication context
    logout();
  };

  // add task handler
  const addTaskHandler = async (e: any) => {
    e.preventDefault();
    await requestHandler(
      async () => await createTodo({ title, description }),
      null,
      (res) => {
        const { data } = res;
        setTitle("");
        setDescription("");
        setTasks((prev: any) => {
          return [data, ...prev];
        });
        toggleAddTaskDialog();
        toast.success("Task added successfully");
      },
      alert
    );
  };

  // get user tasks from the database
  useEffect(() => {
    (async () => {
      await requestHandler(
        async () => await getAllTodos(),
        setIsLoading,
        (res) => {
          const { data } = res;
          setTasks(data);
        },
        alert // Display error alerts on request failure
      );
    })();
  }, []);

  // toggle Handler to complete when the user is completed task
  const toggleIsCompletedTask = async (taskId: string) => {
    (async () => {
      await requestHandler(
        async () => await toggleIsCompleted(taskId),
        null,
        () => {},
        alert // Display error alerts on request failure
      );
    })();
  };

  // delete task handler
  const deletedTaskHandler = async (taskId: string) => {
    await requestHandler(
      async () => await deleteTodo(taskId),
      null,
      () => {
        const updatedTasks = tasks.filter((task: any) => task.id !== taskId);
        setTasks(updatedTasks);
        toast.success("Task deleted successfully");
      },
      alert // Display error alerts on request failure
    );
  };

  // extract date for the database generated date
  function extractDate(databaseDate: string) {
    const date = new Date(databaseDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // toggle Add Task Dialog handler
  const toggleAddTaskDialog = () => {
    setAddTaskDialog((prev) => !prev);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="relative w-full min-h-screen">
      {addTaskDialog && (
        <AddTask
          toggleAddTaskDialog={toggleAddTaskDialog}
          addTaskHandler={addTaskHandler}
          title={title}
          description={description}
          onChangeTitle={(val: string) => {
            setTitle(val);
          }}
          onChangeDescription={(val: string) => {
            setDescription(val);
          }}
        />
      )}
      <div className="w-full min-h-screen flex justify-center items-start p-5 pt-10 ">
        <div className="max-w-[800px] w-full  min-h-[500px] ">
          {/* Title section  */}
          <div className="w-full flex justify-between items-center ">
            <h1 className="text-center font-bold text-[#ff6c43] oxygen-bold sm:text-4xl text-2xl select-none">
              Task Tracker
            </h1>
            <div className="relative">
              <BsThreeDotsVertical
                className="text-lg cursor-pointer"
                onClick={() => {
                  SetOpenLogout((prev) => !prev);
                }}
              />
              {openLogout && (
                <div className=" z-10 w-auto absolute bg-gray-900 py-3 sm:px-10 px-5 rounded-lg -bottom-12 right-3">
                  <h4
                    className="cursor-pointer select-none"
                    onClick={logoutHandler}
                  >
                    Logout
                  </h4>
                </div>
              )}
            </div>
          </div>
          {/* Search Section  */}
          <div className="mt-8 mb-4  w-full flex gap-2">
            <div className="sm:w-3/4 w-full">
              <Input
                placeholder="Search Task..."
                value={query}
                onChange={handleSearchInputChange}
              />
            </div>
            <button
              className="sm:w-1/4 w-1/3 py-2 px-3 font-bold text-white bg-[#e66744] rounded-lg sm:text-base text-sm"
              onClick={toggleAddTaskDialog}
            >
              Add Task
            </button>
          </div>

          {/* Task Section */}
          {tasks.length > 0 ? (
            tasks.map((task: any) => {
              return (
                <div key={task.id} className="bg-[#1a2639] my-2">
                  <Accordion
                    title={task.title}
                    description={task.description}
                    isCompleted={task.isCompleted}
                    delete={async () => {
                      await deletedTaskHandler(task.id);
                    }}
                    createdAt={extractDate(task.createdAt)}
                    toggleIsCompleted={async () => {
                      await toggleIsCompletedTask(task.id);
                    }}
                  />
                </div>
              );
            })
          ) : (
            <div className="w-full min-h-80 flex items-center justify-center">
              {" "}
              No task here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
