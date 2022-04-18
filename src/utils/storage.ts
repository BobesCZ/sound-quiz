import { Question, Quiz, QuizId } from "../types/types";

const STORAGE_KEY_USER_ANSWERS = "userQuizzesData";

const saveQuestionsToStorage = (quizId: QuizId, questionsArray: Question[]) => {
  if (window.localStorage) {
    const data =
      JSON.parse(localStorage.getItem(STORAGE_KEY_USER_ANSWERS) ?? "{}") || {};

    data.userQuestions = {
      ...data.userQuestions,
      [quizId]: questionsArray,
    };

    localStorage.setItem(STORAGE_KEY_USER_ANSWERS, JSON.stringify(data));
  }
};

const saveToStorage = (quizId: QuizId, quiz: Quiz) => {
  if (window.localStorage) {
    const { userAnswers, finalScore } = quiz;
    const userQuizzesData =
      JSON.parse(localStorage.getItem(STORAGE_KEY_USER_ANSWERS) ?? "{}") || {};
    userQuizzesData[quizId] = { userAnswers, finalScore };
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

export { clearStorage, loadFromStorage, saveQuestionsToStorage, saveToStorage };
