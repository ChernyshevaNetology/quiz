import React from "react";
import Alert from "@mui/material/Alert";
import { Typography } from "@mui/material";

type TTimerProps = {
  timer: number;
};

const Timer = ({ timer }: TTimerProps) => {
  return (
    <div className={"timer"}>
      <Alert
        sx={{ width: "10%" }}
        className={"question-info"}
        icon={false}
        variant={"outlined"}
        severity={timer < 4 ? "error" : "info"}
      >
        <Typography variant={"h4"}>{timer}</Typography>
      </Alert>
      {timer === 0 && (
        <Alert
          sx={{ width: "70%" }}
          className={"question-info"}
          severity={"warning"}
        >
          <Typography variant={"h6"}>
            Timer expired, please proceed to next question
          </Typography>
        </Alert>
      )}
    </div>
  );
};

export { Timer };
