import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

type AnswerResultProps = {
  question: string;
  answer: string;
  selectedAnswer: string;
  idx: number;
};

const AnswerResult = ({
  question,
  answer,
  selectedAnswer,
  idx,
}: AnswerResultProps) => {
  return (
    <Stack className={"answer-result"}>
      <Alert severity={"info"}>
        <span className={"answer-highlight"}>Question {idx + 1}</span>
        {question}
      </Alert>
      {answer === selectedAnswer ? (
        <div>
          <Alert severity={"success"}>
            <span className={"answer-highlight"}>You answered correctly:</span>
            {answer}
          </Alert>
        </div>
      ) : (
        <div>
          <Alert severity={"error"}>
            <span className={"answer-highlight"}>Your answer:</span>
            {selectedAnswer}
          </Alert>
          <Alert severity={"success"}>
            <span className={"answer-highlight"}>correct answer:</span> {answer}
          </Alert>
        </div>
      )}
    </Stack>
  );
};

export { AnswerResult };
