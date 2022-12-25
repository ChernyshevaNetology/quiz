import React from "react";
import cn from "classnames";

type TStepProps = {
  currentQuestionIndex: null | number;
  isAnswerCorrect: null | boolean;
  idx: number;
};

const Step = ({ currentQuestionIndex, isAnswerCorrect, idx }: TStepProps) => {
  const stepClasses = cn("step", {
    "current-step": currentQuestionIndex === idx,
    "right-answer": isAnswerCorrect,
    "wrong-answer": isAnswerCorrect === false,
  });

  return <div className={stepClasses} />;
};

export { Step };
