function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER_ANSWER':
      const { questionId, answer } = action.payload
      state.userAnswers[questionId] = answer;
      return { ...state };
    default:
      throw new Error();
  }
}

export default reducer;
