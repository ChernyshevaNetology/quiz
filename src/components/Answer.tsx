import React from "react";
import cn from "classnames";

type TAnswerProps = {
  answer: string;
  onSelectAnswer: (answer: string) => void;
  index: number;
  correctAnswer: string;
  currentAnswer: string;
};

const letterMapping = ["A", "B", "C", "D"];

const Answer = ({
  answer,
  onSelectAnswer,
  index,
  correctAnswer,
  currentAnswer,
}: TAnswerProps) => {
  console.log(
    "answer",
    answer,
    "correctAnswer",
    correctAnswer,
    "currentAnswer",
    currentAnswer
  );

  const isCorrectAnswer = currentAnswer && answer === correctAnswer;

  const isWrongAnswer =
    currentAnswer === answer && currentAnswer !== correctAnswer;

  const answerClasses = cn("answer", {
    "correct-answer": isCorrectAnswer,
    "disabled-answer": currentAnswer,
    "wrong-answer": isWrongAnswer,
  });

  return (
    <div className={answerClasses} onClick={() => onSelectAnswer(answer)}>
      <div className="answer-letter">{letterMapping[index]}</div>
      <div className="answer-text">{answer}</div>
    </div>
  );
};

export { Answer };
