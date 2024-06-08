import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionTransition(data: {
  title: string;
  description: string;
  isCompleted: boolean;
  delete: () => void;
  createdAt: string;
  toggleIsCompleted: () => void;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [isCompletedState, setIsCompleted] = React.useState<boolean>(
    data.isCompleted
  );

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
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
            <label className="ml-2 text-white text-sm">Completed</label>
          </div>
          <button
            className="bg-[#c24d2c] text-white font-bold py-2 px-4 rounded-lg text-sm mt-2"
            onClick={data.delete}
          >
            {" "}
            Delete Task
          </button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
