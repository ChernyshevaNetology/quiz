export interface IQuestion {
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
}

export interface IInitialStateProps {
  questions: IQuestion[] | [];
  currentQuestionIndex: number;
  showResults: boolean;
  answers: string[] | [];
  currentAnswer: string;
  correctAnswersCount: number;
}

export type TSavedQuizData = {
  question: null | string;
  idx: number;
  correctAnswer: string | null;
  selectedAnswer: string | null;
  isAnswerCorrect: null | boolean;
};
