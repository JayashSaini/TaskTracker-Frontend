import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAuth } from "../context/auth.context";
import { requestHandler } from "../util";
import {
  getAllTodos,
  toggleIsCompleted,
  deleteTodo,
  clearTask,
  updateTodo,
} from "../api";
import Loader from "../components/Loader";
import Accordion from "../components/tasks/Accordion.js";
import { toast } from "sonner";
import AddTask from "../components/tasks/AddTask.js";
import { createTodo } from "../api";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/system";
import UpdateTask from "../components/tasks/UpdateTask.js";

const Task = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [addTaskDialog, setAddTaskDialog] = useState<boolean>(false);
  const [updateTaskDialog, setUpdateTaskDialog] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // to store updated tasks value
  const [updateTitle, setUpdateTitle] = useState<string>("");
  const [updateDescription, setUpdateDescription] = useState<string>("");
  const [updateTaskId, setUpdateTaskId] = useState<string>("");

  // task state
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any[]>([]);

  const { logout } = useAuth();

  // Function to handle the logout process
  const logoutHandler = () => {
    // Call the logout function from the authentication context
    logout();
    setOpenMenu((prev) => !prev);
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
        setSelectedTask((prev: any) => {
          return [data, ...prev];
        });
        toggleAddTaskDialog();
        toast.success("Task added successfully");
      },
      alert
    );
  };

  const updateTaskHandler = async (e: any) => {
    e.preventDefault();
    await requestHandler(
      async () =>
        await updateTodo(
          { title: updateTitle, description: updateDescription },
          updateTaskId
        ),
      null,
      (res) => {
        const { data } = res;
        setUpdateTitle("");
        setUpdateDescription("");
        setUpdateTaskId("");

        setTasks((prevTasks: any) => {
          return prevTasks.map((task: any) =>
            task.id === data.id ? data : task
          );
        });

        setSelectedTask((prevSelectedTask: any) => {
          return prevSelectedTask.map((task: any) =>
            task.id === data.id ? data : task
          );
        });

        toggleUpdateTaskDialog();
        toast.success("Task updated successfully");
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
          setSelectedTask(data);
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
        const updatedTasks = selectedTask.filter(
          (task: any) => task.id !== taskId
        );
        setSelectedTask(updatedTasks);
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

  // toggle Add Task Dialog handler
  const toggleUpdateTaskDialog = () => {
    setUpdateTaskDialog((prev) => !prev);
  };

  // clear task handler
  const clearTasksHandler = async () => {
    setOpenMenu((prev) => !prev);
    if (tasks.length == 0) {
      toast.error("No tasks to clear");
      return;
    }
    const result = confirm("Are you sure you want to clear tasks?");
    if (!result) return;
    await requestHandler(
      async () => await clearTask(),
      null,
      () => {
        setSelectedTask([]);
        setTasks([]);
        toast.success("Tasks cleared successfully");
      },
      alert
    );
  };

  // custome search bar css
  const SearchBarCss = styled("div")(() => ({
    backgroundColor: "#1e2c46",
    color: "white",
    border: "1px solid #ffffffe4",
    "& .MuiAutocomplete-option": {
      backgroundColor: "#1e2c46",
      color: "white",
      margin: 1,
    },
    "& .MuiAutocomplete-option.Mui-focused": {
      backgroundColor: "#39465f",
    },
  }));

  const onChangeSearchInput = (_: any, newValue: any) => {
    if (!newValue) {
      setSelectedTask(tasks);
      return;
    }
    const task = tasks.find((task) => task.title === newValue);
    if (!task) {
      setSelectedTask([]);
      return;
    }
    setSelectedTask([task]);
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
      {updateTaskDialog && (
        <UpdateTask
          toggleUpdateTaskDialog={toggleUpdateTaskDialog}
          updateTaskHandler={updateTaskHandler}
          title={updateTitle}
          description={updateDescription}
          updateTaskId={updateTaskId}
          onChangeTitle={(val: string) => {
            setUpdateTitle(val);
          }}
          onChangeDescription={(val: string) => {
            setUpdateDescription(val);
          }}
        />
      )}
      <div className="relative w-full min-h-screen flex justify-center items-start p-5 pt-10 ">
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
                  setOpenMenu((prev) => !prev);
                }}
              />
              {openMenu && (
                <div className=" z-10 absolute w-[150px] flex flex-col gap-1 p-2 bg-gray-900  rounded-sm -bottom-24 right-3 ">
                  <button
                    className="cursor-pointer  rounded-sm select-none py-1 px-3 bg-slate-800 w-full"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                  <button
                    className="cursor-pointer  rounded-sm select-none py-1 px-3 bg-slate-800 w-full"
                    onClick={clearTasksHandler}
                  >
                    Clear Tasks
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Search Section  */}
          <div className="mt-8 mb-4  w-full flex gap-2">
            <div className="sm:w-3/4 w-full">
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  autoHighlight
                  options={tasks.map((option) => option.title)}
                  onChange={onChangeSearchInput}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Task"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                        style: {
                          border: "1px solid rgba(255, 255, 255, 0.5)",
                          color: "white",
                        },
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: "white",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "white",
                          bgcolor: "#1e2c46",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.5)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.5)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "rgba(255, 255, 255, 0.5)",
                          },
                        },
                      }}
                    />
                  )}
                  PaperComponent={(props) => <SearchBarCss {...props} />}
                />
              </Stack>
            </div>
            <button
              className="sm:w-1/4 w-1/3 py-2 px-3 font-bold text-white  bg-[#e66744] rounded-lg sm:text-base text-sm"
              onClick={toggleAddTaskDialog}
            >
              Add Task
            </button>
          </div>

          {/* Task Section */}
          {selectedTask.length > 0 ? (
            selectedTask.map((task: any) => {
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
                    updateTaskHandler={() => {
                      setUpdateTaskId(task.id);
                      setUpdateTitle(task.title);
                      setUpdateDescription(task.description);
                      toggleUpdateTaskDialog();
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
        <footer className="w-full text-center absolute bottom-1 text-sm  text-[#ffffffb7] px-10">
          Created By Jayash |{" "}
          <a
            target="_blank"
            className="text-blue-400"
            href="https://www.linkedin.com/in/jayash-saini-371bb0267/"
          >
            Linked in
          </a>{" "}
          |{" "}
          <a
            target="_blank"
            className="text-blue-400"
            href="https://github.com/JayashSaini/"
          >
            Github
          </a>{" "}
          |{" "}
          <a
            target="_blank"
            className="text-blue-400"
            href="mailto:Jayash%20Saini%20%3cjayashysaini7361@gmail.com%3e"
          >
            Mail
          </a>{" "}
          | June-10-2024
        </footer>
      </div>
    </div>
  );
};

export default Task;
