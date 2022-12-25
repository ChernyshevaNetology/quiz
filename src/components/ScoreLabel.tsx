import React, { useContext } from "react";
import Alert from "@mui/material/Alert";
import { QuizContext } from "../context/QuizContext";
import { IQuestionPrepared } from "../types/types";

type TScoreLabelProps = {
  currentQuestionIndex: number;
};

const ScoreLabel = ({ currentQuestionIndex }: TScoreLabelProps) => {
  const value: IQuestionPrepared[] = useContext(QuizContext);

  return (
    <div className="score">
      <Alert variant="outlined" severity="success">
        Question {currentQuestionIndex + 1}/{value?.length}
      </Alert>
    </div>
  );
};

export { ScoreLabel };
