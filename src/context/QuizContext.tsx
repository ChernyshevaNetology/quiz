import { createContext, useEffect, useState } from "react";
import { shuffleAnswers } from "../helpers";
import { IQuestionApiProps, IQuestionPrepared } from "../types/types";

const initialState: IQuestionPrepared[] | [] = [];

export const QuizContext = createContext(initialState);

const API_URL =
  "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple&encode=url3986";

export const QuizProvider = ({ children }: any) => {
  const [quizData, setQuizData] = useState(initialState);

  useEffect(() => {
    const savedData: string | null = localStorage.getItem("quiz");

    if (savedData) {
      setQuizData(JSON.parse(savedData));
      return;
    }

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const preparedQuizData = data.results.reduce(
          (acc: IQuestionPrepared[], curr: IQuestionApiProps) => {
            return [
              ...acc,
              {
                question: decodeURIComponent(curr.question),
                correctAnswer: decodeURIComponent(curr.correct_answer),
                answers: shuffleAnswers(curr),
              },
            ];
          },
          []
        );
        setQuizData(preparedQuizData);
        localStorage.setItem("quiz", JSON.stringify(preparedQuizData));
      });
  }, []);

  console.log("quizDate from context", quizData);

  return (
    <QuizContext.Provider value={quizData}>{children}</QuizContext.Provider>
  );
};
