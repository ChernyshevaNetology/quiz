import React from "react";
import cn from "classnames";
import { TSavedQuizData } from "../types/types";

type TStepProps = {
  currentQuestionIndex: null | number;
  correctAnswer: string | null;
  isAnswerCorrect: null | boolean;
  idx: number;
};

const Step = ({
  currentQuestionIndex,
  correctAnswer,
  isAnswerCorrect,
  idx,
}: TStepProps) => {
  const stepClasses = cn("step", {
    "current-step": currentQuestionIndex === idx,
    "right-answer": isAnswerCorrect,
    "wrong-answer": isAnswerCorrect === false,
  });

  return <div className={stepClasses} />;
};

export { Step };
