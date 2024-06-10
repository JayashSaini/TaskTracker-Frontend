import { IoIosClose } from "react-icons/io";
import TextField from "@mui/material/TextField";
import Button from "../Button";
import { Oval } from "react-loader-spinner";

const AddTask: React.FC<{
  toggleAddTaskDialog: () => void;
  addTaskHandler: () => void;
  title: string;
  description: string;
  isLoading: boolean;
  onChangeTitle: (val: string) => void;
  onChangeDescription: (val: string) => void;
}> = (props) => {
  return (
    <div className="w-full h-screen fixed z-50 bg-[#0008] flex items-center justify-center p-3">
      <div className="max-w-[600px] w-full border-[2px] border-[#ffffff3d] bg-[#172031dc] rounded-lg p-6 shadow-sm shadow-gray-600">
        <div className="flex justify-between items-center w-full">
          <h2 className="sm:text-2xl text-xl  text-[#ff7f5c] oxygen-bold ">
            Add Task
          </h2>
          <IoIosClose
            className="text-3xl cursor-pointer"
            onClick={props.toggleAddTaskDialog}
          />
        </div>
        <form
          className="mt-4 flex flex-col gap-4"
          onSubmit={(e: any) => {
            e.preventDefault();
            if (!props.isLoading) {
              props.addTaskHandler();
            }
          }}
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Title"
            multiline
            maxRows={4}
            defaultValue={props.title}
            required={true}
            onChange={(e) => {
              props.onChangeTitle(e.target.value);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "white",
                bgcolor: "#39465fe1",
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            defaultValue={props.description}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "white",
                bgcolor: "#39465fe1",
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
            onChange={(e) => {
              props.onChangeDescription(e.target.value);
            }}
            required={true}
          />
          <Button fullWidth>
            {props.isLoading ? (
              <Oval
                visible={true}
                height="30"
                width="30"
                color="#fff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Add Task"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
