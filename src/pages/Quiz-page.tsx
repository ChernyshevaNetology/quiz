import React, { useState, useContext, useEffect, useRef } from "react";
import { Question } from "components/Question";
import { Answer } from "components/Answer";
import { QuizContext } from "context/QuizContext";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Step } from "components/Step";
import { ScoreLabel } from "../components/ScoreLabel";
import { IQuestionPrepared, TSavedQuizData } from "types/types";
import { Typography } from "@mui/material";
import { AnswerResult } from "../components/AnswerResult";
import Alert from "@mui/material/Alert";
import { Timer } from "components/timer";

const quizDataToSave = [...new Array(10)].map((_, idx) => ({
  question: null,
  idx,
  correctAnswer: null,
  selectedAnswer: null,
  isAnswerCorrect: null,
}));

const timerLength = 15;

const QuizPage = () => {
  const quiz: IQuestionPrepared[] = useContext(QuizContext);
  console.log("quiz from quizPage", quiz);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<null | string>(null);
  const [savedQuizData, setSavedQuizData] =
    useState<TSavedQuizData[]>(quizDataToSave);
  const [timer, setTimer] = useState(timerLength);
  const isTimerStarted = useRef(false);
  const [showResults, setShowResults] = useState(false);
  let id: any = useRef(null);

  useEffect(() => {
    if (isTimerStarted.current) {
      return;
    }

    if (timer === 0 || showResults) {
      clearInterval(id.current);
      return;
    }

    id.current = setInterval(() => {
      setTimer((c) => c - 1);
    }, 1000);

    return () => clearInterval(id.current);
  }, [timer, isTimerStarted.current, currentQuestionIndex]);

  const onSelectNextQuestion = () => {
    const currentIdx =
      currentQuestionIndex >= quiz.length
        ? currentQuestionIndex
        : currentQuestionIndex + 1;

    setCurrentQuestionIndex(currentIdx);
    if (currentIdx === savedQuizData.length) {
      setShowResults(true);
      clearInterval(id.current);
    }
    setTimer(timerLength);
    const quizDataToUpdate = savedQuizData?.map((data: TSavedQuizData) => {
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
    isTimerStarted.current = false;
  };

  const onSelectAnswer = (answer: string) => {
    if (selectedAnswer || timer === 0) {
      return;
    }

    if (timer > 0) {
      clearInterval(id.current);
    }
    isTimerStarted.current = true;
    setSelectedAnswer(answer);
  };

  const onQuizRestart = () => {
    localStorage.removeItem("quiz");
    setCurrentQuestionIndex(0);
    setSavedQuizData(quizDataToSave);
    setTimer(timerLength);
    setShowResults(false);
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
            isAnswerCorrect={elem.isAnswerCorrect}
          />
        ))}
      </div>
      <Divider />
      {showResults ? (
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
          <Timer timer={timer} />
          <div className="answers">
            {quiz.length > 0 &&
              quiz[currentQuestionIndex].answers.map(
                (answer: string, idx: number) => (
                  <Answer
                    answer={answer}
                    index={idx}
                    timer={timer}
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
              disabled={selectedAnswer === null && timer > 0}
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
