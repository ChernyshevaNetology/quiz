import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext";
import { TSavedQuizData } from "types/types";

const ResultsPage = ({ savedQuizData }: any) => {
  const quiz: any = useContext(QuizContext);
  return (
    <div>
      <div className="congratulations">Congratulations</div>
      <div className="results-info">
        <div>You have completed the quiz</div>
        <div>
          You've got some answers of
          {quiz.length}
        </div>
        <div className="next-button">Restart</div>
      </div>
    </div>
  );
};

export { ResultsPage };
