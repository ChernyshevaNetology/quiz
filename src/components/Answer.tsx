import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import cn from "classnames";

type TAnswerProps = {
  answer?: string;
  currentQuestionIndex: number;
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
  currentQuestionIndex,
  onSelectAnswer,
  selectedAnswer,
  correctAnswer,
}: TAnswerProps) => {
  // const isCorrectAnswer = currentAnswer && answer === correctAnswer;
  //
  // const isWrongAnswer =
  //   currentAnswer === answer && currentAnswer !== correctAnswer;
  //
  // const answerClasses = cn("answer", {
  //   "correct-answer": isCorrectAnswer,
  //   "disabled-answer": currentAnswer,
  //   "wrong-answer": isWrongAnswer,
  // });
  console.log("correctAnswer", correctAnswer);
  return (
    // @ts-ignore
    <Stack sx={{ width: "50%" }} onClick={() => onSelectAnswer(answer)}>
      <Alert
        className={"answer-item"}
        icon={false}
        // @ts-ignore
        severity={handleAnswerColor(answer, correctAnswer, selectedAnswer)}
      >
        <Chip
          size="small"
          className={"answer-letter"}
          label={letterMapping[index]}
          color="primary"
        />
        {answer}
      </Alert>
    </Stack>
  );
};

export { Answer };
