interface IQuestion {
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
}

export const shuffleAnswers = (question: IQuestion) => {
  const unshuffled = [question.correctAnswer, ...question.incorrectAnswers];

  return unshuffled
    .map((answer) => ({
      sort: Math.random(),
      value: answer,
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((el) => el.value);
};

export const normalizeQuestions = (questions: any) => {
  console.log("questions", questions);
  return questions.map((question: any) => {
    console.log("question", question);
    const incorrectAnswers = question.incorrect_answers.map(
      (incorrectAnswer: string) => decodeURIComponent(incorrectAnswer)
    );
    return {
      correctAnswer: decodeURIComponent(question.correct_answer),
      question: decodeURIComponent(question.question),
      incorrectAnswers,
    };
  });
};
