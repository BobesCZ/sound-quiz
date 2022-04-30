import { Answer, QuizId } from "../types/types";

const STORAGE_KEY_USER_DATA = "userQuizzesData";

const saveAnswersToStorage = (quizId: QuizId, answer: Partial<Answer>) => {
  if (window.localStorage) {
    const data =
      JSON.parse(localStorage.getItem(STORAGE_KEY_USER_DATA) ?? "{}") || {};

    data.userAnswers = {
      ...data.userAnswers,
      [quizId]: {
        ...data?.userAnswers?.[quizId],
        ...answer,
      },
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

export { clearStorage, loadFromStorage, saveAnswersToStorage };
