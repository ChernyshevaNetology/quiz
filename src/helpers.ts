import { IQuestionApiProps } from "types/types";

export const shuffleAnswers = (question: IQuestionApiProps): string[] => {
  const unshuffled = [question.correct_answer, ...question.incorrect_answers];

  return unshuffled
    .map((answer) => ({
      sort: Math.random(),
      value: answer,
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((el) => decodeURIComponent(el.value));
};
