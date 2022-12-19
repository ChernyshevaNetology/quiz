interface IQuestion {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export const shuffleAnswers = (question: IQuestion): string[] => {
  const unshuffled = [question.correct_answer, ...question.incorrect_answers];

  return unshuffled
    .map((answer) => ({
      sort: Math.random(),
      value: answer,
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((el) => decodeURIComponent(el.value));
};
