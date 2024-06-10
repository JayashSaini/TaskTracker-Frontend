import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FiEdit } from "react-icons/fi";
import { Oval } from "react-loader-spinner";

export default function AccordionTransition(data: {
  title: string;
  description: string;
  isCompleted: boolean;
  isLoading: boolean;
  delete: () => void;
  createdAt: string;
  toggleIsCompleted: () => void;
  updateTaskHandler: () => void;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [isCompletedState, setIsCompleted] = React.useState<boolean>(
    data.isCompleted
  );

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className="overflow-hidden">
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slotProps={{ transition: { timeout: 400 } }}
        sx={{
          "& .MuiAccordionSummary-root": {
            backgroundColor: "#39465f",
            color: "#d9dad7",
            height: "55px",
          },
          "& .MuiAccordionDetails-root": {
            backgroundColor: "#39465f",
            color: "#d9dad7",
          },
          "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="text-white" />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography
            sx={{
              fontSize: "1.2rem", // Change font size
              fontWeight: "bold", // Change font weight
            }}
          >
            {data.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            sx={{
              fontSize: "1rem", // Change font size
              fontWeight: "500", // Change font weight
            }}
          >
            {data.description}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.8rem", // Change font size
              fontWeight: "500",
            }}
          >
            Created At : {data.createdAt}
          </Typography>

          <div className="flex justify-between w-full items-center mt-4">
            <div className="flex gap-2 items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isCompletedState}
                  onChange={() => {
                    setIsCompleted((prev) => !prev);
                  }}
                  onClick={data.toggleIsCompleted}
                  className="form-checkbox h-4 w-4 "
                />
                <label
                  htmlFor="complete"
                  onClick={() => {
                    setIsCompleted((prev) => !prev);
                    data.toggleIsCompleted();
                  }}
                  className="ml-1 text-white text-sm cursor-pointer select-none hover:underline"
                >
                  Completed
                </label>
              </div>

              <div
                className="flex items-center justify-center gap-1 cursor-pointer"
                onClick={data.updateTaskHandler}
              >
                <FiEdit />
                <span className="text-white text-sm cursor-pointer select-none hover:underline">
                  Update Task
                </span>
              </div>
            </div>
            <button
              className="bg-[#c24d2c] text-white font-bold py-2 px-4 rounded-lg text-sm mt-2 flex justify-center items-center min-w-28"
              onClick={() => {
                if (!data.isLoading) {
                  data.delete();
                }
              }}
            >
              {data.isLoading ? (
                <Oval
                  visible={true}
                  height="25"
                  width="25"
                  color="#fff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Delete Task"
              )}
            </button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
