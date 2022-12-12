import { createContext, useReducer } from "react";
import { shuffleAnswers, normalizeQuestions } from "../helpers";

interface IQuestion {
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
}

interface IInitialStateProps {
  questions: IQuestion[] | [];
  currentQuestionIndex: number;
  showResults: boolean;
  answers: string[] | [];
  currentAnswer: string;
  correctAnswersCount: number;
}

type TActionType = {
  action: () => IInitialStateProps;
  type: string;
  payload: any;
};

const initialState: IInitialStateProps = {
  questions: [],
  currentQuestionIndex: 0,
  showResults: false,
  answers: [],
  currentAnswer: "",
  correctAnswersCount: 0,
};

const reducer = (state: IInitialStateProps, action: TActionType) => {
  switch (action.type) {
    case "SELECT_ANSWER": {
      const correctAnswersCount =
        action.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer
          ? state.correctAnswersCount + 1
          : state.correctAnswersCount;
      return {
        ...state,
        currentAnswer: action.payload,
        correctAnswersCount,
      };
    }
    case "NEXT_QUESTION": {
      const showResults =
        state.currentQuestionIndex === state.questions.length - 1;
      const currentQuestionIndex = showResults
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1;
      const answers = showResults
        ? []
        : shuffleAnswers(state.questions[currentQuestionIndex]);
      return {
        ...state,
        currentQuestionIndex,
        showResults,
        answers,
        currentAnswer: "",
      };
    }
    case "RESTART": {
      return initialState;
    }
    case "LOADED_QUESTIONS": {
      const normalizedQuestions = normalizeQuestions(action.payload);
      return {
        ...state,
        questions: normalizedQuestions,
        answers: shuffleAnswers(normalizedQuestions[0]),
      };
    }

    default:
      return state;
  }
};

export const QuizContext = createContext<IInitialStateProps>(initialState);

export const QuizProvider = ({ children }: any) => {
  const value = useReducer(reducer, initialState);
  // @ts-ignore
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
