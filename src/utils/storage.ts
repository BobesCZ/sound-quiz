import { Quiz, QuizId } from "../types/quiz";

const STORAGE_KEY_USER_ANSWERS = "allUserAnswers";

const saveToStorage = (quizId: QuizId, quiz: Quiz) => {
  if (window.localStorage) {
    const { userAnswers, finalScore } = quiz;
    const allUserAnswers =
      JSON.parse(localStorage.getItem(STORAGE_KEY_USER_ANSWERS) ?? "{}") || {};
    allUserAnswers[quizId] = { userAnswers, finalScore };
    localStorage.setItem(
      STORAGE_KEY_USER_ANSWERS,
      JSON.stringify(allUserAnswers)
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
