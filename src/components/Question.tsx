import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext";
import { Answer } from "./Answer";

const Question = () => {
  // @ts-ignore
  const [quizState, dispatch] = useContext(QuizContext);
  const currentQuestion =
    quizState.questions.length > 0
      ? quizState.questions[quizState.currentQuestionIndex]
      : {};
  return (
    <div>
      <div className={"question"}>{currentQuestion.question}</div>
      <div className={"answers"}>
        {quizState.answers.map((answer: string, idx: number) => (
          <Answer
            key={idx}
            index={idx}
            answer={answer}
            correctAnswer={currentQuestion.correctAnswer}
            currentAnswer={quizState.currentAnswer}
            onSelectAnswer={(answer: string) =>
              dispatch({ type: "SELECT_ANSWER", payload: answer })
            }
          />
        ))}
      </div>
    </div>
  );
};

export { Question };
