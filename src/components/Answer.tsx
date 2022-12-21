import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import cn from "classnames";

type TAnswerProps = {
  answer?: string;
  timer: number;
  index: number;
  onSelectAnswer: (answer: string) => void;
  selectedAnswer: null | string;
  correctAnswer: string;
};

const letterMapping = ["A", "B", "C", "D"];

const handleAnswerColor = (
  answer: string,
  correctAnswer: string,
  selectedAnswer: string | null
) => {
  if (!selectedAnswer) {
    return "info";
  }

  if (selectedAnswer === correctAnswer && answer === selectedAnswer) {
    return "success";
  }

  if (selectedAnswer !== correctAnswer && answer === selectedAnswer) {
    return "error";
  }

  if (answer === correctAnswer) {
    return "success";
  }

  return "info";
};

const Answer = ({
  answer,
  index,
  timer,
  onSelectAnswer,
  selectedAnswer,
  correctAnswer,
}: TAnswerProps) => {
  const answerClasses = cn("answer-item", {
    "answer-wrong__highlight": timer === 0,
  });

  return (
    <Stack
      sx={{ width: "50%" }}
      // @ts-ignore
      onClick={() => onSelectAnswer(answer)}
    >
      <Alert
        className={answerClasses}
        icon={false}
        // @ts-ignore
        severity={handleAnswerColor(answer, correctAnswer, selectedAnswer)}
      >
        <Chip
          size="small"
          className={cn("answer-letter", {
            "answer-letter__disabled": timer === 0,
          })}
          label={letterMapping[index]}
          color="primary"
        />
        {answer}
      </Alert>
    </Stack>
  );
};

export { Answer };
