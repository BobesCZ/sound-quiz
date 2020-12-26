function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER_ANSWER':
      const { questionId, answer } = action.payload
      state.userAnswers[questionId] = answer;
      return { ...state };
    case 'SET_AVAILABLE_QUIZZES':
      const { quizzes } = action.payload
      state.availableQuizzes = quizzes;
      return { ...state };
    case 'SET_QUESTIONS_TO_QUIZ':
      const { quizId, questions } = action.payload;
      state.availableQuizzes[quizId].questions = questions;
      return { ...state };
    default:
      throw new Error();
  }
}

export default reducer;
