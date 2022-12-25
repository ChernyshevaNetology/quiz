export interface IQuestionApiProps {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface IQuestionPrepared {
  question: string;
  answers: string[];
  correctAnswer: string;
}

export type TSavedQuizData = {
  question: null | string;
  idx: number;
  correctAnswer: string | null;
  selectedAnswer: string | null;
  isAnswerCorrect: null | boolean;
};
