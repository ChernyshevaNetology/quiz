import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext";
import Alert from "@mui/material/Alert";
import { Typography } from "@mui/material";

type TQuestionProps = {
  currentQuestionIndex: number;
};

const Question = ({ currentQuestionIndex }: TQuestionProps) => {
  const value: any = useContext(QuizContext);
  return (
    <div>
      <Alert className={"question-info"} variant={"outlined"} severity="info">
        <Typography className={"question-info"} variant={"h5"}>
          {value[currentQuestionIndex]?.question}
        </Typography>
      </Alert>
    </div>
  );
};

export { Question };
