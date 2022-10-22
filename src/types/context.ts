import {
  AnswersSource,
  QuestionsSource,
  QuizzesSource,
  UserData,
} from "./types";

export interface AppState {
  availableQuizzes?: QuizzesSource;
  availableQuestions?: QuestionsSource;
  userAnswers?: AnswersSource;
  userData?: UserData;
}

export interface ContextProps {
  appState: AppState;
  dispatch: React.Dispatch<Action>;
}

export enum ActionType {
  SetUserAnswer = "SET_USER_ANSWER",
  SetFinalScore = "SET_FINAL_SCORE",
  SetAvailableQuizzes = "SET_AVAILABLE_QUIZZES",
  SetQuestionsToQuiz = "SET_QUESTIONS_TO_QUIZ",
  SetUserData = "SET_USER_DATA",
  DeleteUserData = "DELETE_USER_DATA",
}

export interface Action {
  type: ActionType;
  payload: any;
}
