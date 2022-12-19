import { createContext, useEffect, useState } from "react";
import { shuffleAnswers } from "../helpers";
import { IInitialStateProps } from "../types/types";

const initialState: IInitialStateProps = {
  questions: [],
  currentQuestionIndex: 0,
  showResults: false,
  answers: [],
  currentAnswer: "",
  correctAnswersCount: 0,
};

const API_URL =
  "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple&encode=url3986";

export const QuizContext = createContext(initialState);

export const QuizProvider = ({ children }: any) => {
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const savedData: string | null = localStorage.getItem("quiz");

    if (savedData) {
      setQuizData(JSON.parse(savedData));
      return;
    }

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const preparedQuizData = data.results.reduce((acc: any, curr: any) => {
          return [
            ...acc,
            {
              question: decodeURIComponent(curr.question),
              correctAnswer: decodeURIComponent(curr.correct_answer),
              answers: shuffleAnswers(curr),
            },
          ];
        }, []);
        setQuizData(preparedQuizData);
        localStorage.setItem("quiz", JSON.stringify(preparedQuizData));
      });
  }, []);

  return (
    // @ts-ignore
    <QuizContext.Provider value={quizData}>{children}</QuizContext.Provider>
  );
};
