import React, { EffectCallback, useContext, useEffect } from "react";
import { Question } from "./Question";
import { QuizContext } from "../context/QuizContext";

const API_URL =
  "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple&encode=url3986";

const Quiz = () => {
  // @ts-ignore
  const [quizState, dispatch] = useContext(QuizContext);

  useEffect((): any => {
    if (quizState.questions.length > 0) {
      return;
    }
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "LOADED_QUESTIONS", payload: data?.results });
      });
  });

  return (
    <div className="quiz">
      {quizState.showResults ? (
        <div className={"results"}>
          <div className="congratulations">Congratulations</div>
          <div className="results-info">
            <div>You have completed the quiz</div>
            <div>
              You've got {quizState.correctAnswersCount} of
              {quizState.questions.length}
            </div>
            <div
              onClick={() => dispatch({ type: "RESTART" })}
              className="next-button"
            >
              Restart
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="score">
            Question {quizState.currentQuestionIndex + 1}/
            {quizState.questions.length}
          </div>
          <Question />
          <div
            onClick={() => dispatch({ type: "NEXT_QUESTION" })}
            className={"next-button"}
          >
            Next Question
          </div>
        </div>
      )}
    </div>
  );
};

export { Quiz };
