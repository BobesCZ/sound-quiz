function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER_ANSWER': {
      const { quizId, questionId, answer } = action.payload;
      const quiz = state.availableQuizzes[quizId];
      quiz.userAnswers[questionId] = answer;

      let answersCount = Object.keys(quiz.userAnswers).length;
      if (answersCount === quiz.questions.length) {
        let correctAnswersCount = 0;

        Object.keys(quiz.userAnswers).forEach(item => {
          const isCorrect = quiz.userAnswers[item].answer === quiz.questions[item].correctAnswer ? 1 : 0;
          correctAnswersCount += isCorrect;
        })

        quiz.finalScore = correctAnswersCount / quiz.questions.length * 100;
      };

      return { ...state };
    }
    case 'SET_AVAILABLE_QUIZZES': {
      const { quizzes } = action.payload
      state.availableQuizzes = quizzes;
      return { ...state };
    }
    case 'SET_QUESTIONS_TO_QUIZ': {
      const { quizId, questions } = action.payload;
      state.availableQuizzes[quizId].questions = questions;
      return { ...state };
    }
    default:
      throw new Error();
  }
}

export default reducer;
