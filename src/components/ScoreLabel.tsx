import React, { useContext } from "react";
import Alert from "@mui/material/Alert";
import { QuizContext } from "../context/QuizContext";

type TScoreLabelProps = {
  currentQuestionIndex: number;
};

const ScoreLabel = ({ currentQuestionIndex }: TScoreLabelProps) => {
  const value: any = useContext(QuizContext);

  return (
    <div className="score">
      <Alert variant="outlined" severity="success">
        Question {currentQuestionIndex + 1}/{value?.length}
      </Alert>
    </div>
  );
};

export { ScoreLabel };
