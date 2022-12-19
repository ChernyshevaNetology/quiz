import React, { useState, useContext, useEffect } from "react";
import { Question } from "components/Question";
import { Answer } from "components/Answer";
import { QuizContext } from "context/QuizContext";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Step } from "components/Step";
import { ScoreLabel } from "../components/ScoreLabel";
import { TSavedQuizData } from "types/types";
import { Typography } from "@mui/material";
import { AnswerResult } from "../components/AnswerResult";
import Alert from "@mui/material/Alert";

const quizDataToSave = [...new Array(10)].map((_, idx) => ({
  question: null,
  idx,
  correctAnswer: null,
  selectedAnswer: null,
  isAnswerCorrect: null,
}));

const QuizPage = () => {
  const quiz: any = useContext(QuizContext);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<null | string>(null);
  const [savedQuizData, setSavedQuizData] =
    useState<TSavedQuizData[]>(quizDataToSave);

  const onSelectNextQuestion = () => {
    const currentIdx =
      currentQuestionIndex >= quiz.length
        ? currentQuestionIndex
        : currentQuestionIndex + 1;

    setCurrentQuestionIndex(currentIdx);
    const quizDataToUpdate = savedQuizData.map((data: TSavedQuizData) => {
      if (data.idx === currentQuestionIndex) {
        return {
          question: quiz[currentQuestionIndex].question,
          idx: data.idx,
          currentQuestionIndex,
          selectedAnswer,
          correctAnswer: quiz[currentQuestionIndex].correctAnswer,
          isAnswerCorrect:
            selectedAnswer === quiz[currentQuestionIndex].correctAnswer,
        };
      }

      return {
        ...data,
      };
    });

    setSavedQuizData(quizDataToUpdate);
    setSelectedAnswer(null);
  };

  const onSelectAnswer = (answer: string) => {
    if (selectedAnswer) {
      return;
    }

    setSelectedAnswer(answer);
  };

  const onQuizRestart = () => {
    localStorage.removeItem("quiz");
    setCurrentQuestionIndex(0);
    setSavedQuizData(quizDataToSave);
  };

  const handleButtonTitle = () =>
    currentQuestionIndex >= 9 && selectedAnswer
      ? "View Results"
      : "Next Question";

  const correctAnswersCount = savedQuizData.filter(
    ({ isAnswerCorrect }: TSavedQuizData) => Boolean(isAnswerCorrect)
  ).length;

  return (
    <div className="quiz">
      <div className={"steps"}>
        {savedQuizData.map((elem: TSavedQuizData) => (
          <Step
            currentQuestionIndex={currentQuestionIndex}
            idx={elem.idx}
            correctAnswer={elem.correctAnswer}
            isAnswerCorrect={elem.isAnswerCorrect}
          />
        ))}
      </div>
      <Divider />
      {currentQuestionIndex >= quiz.length ? (
        <>
          <Alert
            className={"question-info"}
            variant={"outlined"}
            severity="info"
            icon={false}
          >
            <Typography className={"question-info"} variant={"h5"}>
              Congratulations, you have completed the quiz!
            </Typography>
            <Typography className={"question-info"} variant={"h5"}>
              You've got {correctAnswersCount} correct answers out of{" "}
              {quiz.length}
            </Typography>
          </Alert>
          {savedQuizData.map((data: any, idx: number) => {
            return (
              <AnswerResult
                question={data.question}
                answer={data.correctAnswer}
                selectedAnswer={data.selectedAnswer}
                idx={idx}
              />
            );
          })}
          <div className="buttons">
            <Button onClick={onQuizRestart} variant="contained">
              restart quiz
            </Button>
          </div>
        </>
      ) : (
        <div>
          <ScoreLabel currentQuestionIndex={currentQuestionIndex} />
          <Question currentQuestionIndex={currentQuestionIndex} />
          <div className="answers">
            {quiz.length > 0 &&
              quiz[currentQuestionIndex].answers.map(
                (answer: string, idx: number) => (
                  <Answer
                    answer={answer}
                    index={idx}
                    currentQuestionIndex={currentQuestionIndex}
                    onSelectAnswer={onSelectAnswer}
                    key={idx}
                    selectedAnswer={selectedAnswer}
                    correctAnswer={quiz[currentQuestionIndex].correctAnswer}
                  />
                )
              )}
          </div>
          <div className="buttons">
            <Button
              onClick={onSelectNextQuestion}
              disabled={selectedAnswer === null}
              variant="contained"
            >
              {handleButtonTitle()}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export { QuizPage };
