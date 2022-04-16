import { Quiz, QuizId } from "../types/types";

const STORAGE_KEY_USER_ANSWERS = "userQuizzesData";

const saveToStorage = (quizId: QuizId, quiz: Quiz) => {
  if (window.localStorage) {
    const { userAnswers, finalScore, questions } = quiz;
    const userQuizzesData =
      JSON.parse(localStorage.getItem(STORAGE_KEY_USER_ANSWERS) ?? "{}") || {};
    userQuizzesData[quizId] = { userAnswers, finalScore, questions };
    localStorage.setItem(
      STORAGE_KEY_USER_ANSWERS,
      JSON.stringify(userQuizzesData)
    );
  }
};

const loadFromStorage = () => {
  if (window.localStorage) {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_USER_ANSWERS) ?? "{}");
  }
  return null;
};

const clearStorage = () => {
  if (window.localStorage) {
    localStorage.removeItem(STORAGE_KEY_USER_ANSWERS);
  }
};

export { clearStorage, loadFromStorage, saveToStorage };
