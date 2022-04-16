export enum ActionType {
  SetUserAnswer = "SET_USER_ANSWER",
  SetAvailableQuizzes = "SET_AVAILABLE_QUIZZES",
  SetQuestionsToQuiz = "SET_QUESTIONS_TO_QUIZ",
  SetLoadedAnswers = "SET_LOADED_ANSWERS",
  ResetAvailableQuizzes = "RESET_AVAILABLE_QUIZZES",
}

export interface Action {
  type: ActionType;
  payload: any;
}
