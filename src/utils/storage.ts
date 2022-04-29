import { Answer, Question, QuizId } from "../types/types";

const STORAGE_KEY_USER_DATA = "userQuizzesData";

const saveQuestionsToStorage = (quizId: QuizId, questionsArray: Question[]) => {
  if (window.localStorage) {
    const data =
      JSON.parse(localStorage.getItem(STORAGE_KEY_USER_DATA) ?? "{}") || {};

    data.availableQuestions = {
      ...data.availableQuestions,
      [quizId]: questionsArray,
    };

    localStorage.setItem(STORAGE_KEY_USER_DATA, JSON.stringify(data));
  }
};

const saveAnswersToStorage = (quizId: QuizId, answers: Answer) => {
  if (window.localStorage) {
    const data =
      JSON.parse(localStorage.getItem(STORAGE_KEY_USER_DATA) ?? "{}") || {};

    data.userAnswers = {
      ...data.userAnswers,
      [quizId]: answers,
    };

    localStorage.setItem(STORAGE_KEY_USER_DATA, JSON.stringify(data));
  }
};

const loadFromStorage = () => {
  if (window.localStorage) {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_USER_DATA) ?? "{}");
  }
  return null;
};

const clearStorage = () => {
  if (window.localStorage) {
    localStorage.removeItem(STORAGE_KEY_USER_DATA);
  }
};

export {
  clearStorage,
  loadFromStorage,
  saveQuestionsToStorage,
  saveAnswersToStorage,
};
