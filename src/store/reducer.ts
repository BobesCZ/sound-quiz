import { Action, ActionType, AppState } from "../types/context";
import { Answer, Question, QuizId, Quizzes } from "../types/types";
import { clearStorage, saveQuestionsToStorage } from "../utils/storage";
import { getQuestions } from "../utils/utils";

const reducer = (state: AppState, { type, payload }: Action) => {
  switch (type) {
    /**
     * Set available quizzes (read-only data)
     */
    case ActionType.SetAvailableQuizzes: {
      const { availableQuizzesSource }: { availableQuizzesSource: Quizzes } =
        payload;
      return { ...state, availableQuizzes: availableQuizzesSource };
    }

    /**
     * Resolve Question objects, shuffle questions and answers (user data)
     */
    case ActionType.SetQuestionsToQuiz: {
      const { quizId, questions }: { quizId: QuizId; questions: Question[] } =
        payload;

      const quizObj = state?.availableQuizzes?.[quizId];

      if (!quizObj) {
        return { ...state };
      }

      const { randomizeAnswers } = quizObj.options || {};
      const questionsArray = getQuestions(questions, randomizeAnswers);

      saveQuestionsToStorage(quizId, questionsArray);

      return {
        ...state,
        userQuestions: { ...state.userQuestions, [quizId]: questionsArray },
      };
    }

    case ActionType.SetUserAnswer: {
      const {
        quizId,
        questionId,
        answer,
      }: { quizId: QuizId; questionId: string; answer: Answer } = payload;

      const quiz = state.availableQuizzes?.[quizId];
      const questionsArray = state.userQuestions?.[quizId];

      if (!quiz || !questionsArray?.length) {
        return { ...state };
      }

      quiz.userAnswers[questionId] = answer;

      let answersCount = Object.keys(quiz.userAnswers).length;
      if (answersCount === questionsArray.length) {
        let correctAnswersCount = 0;

        Object.values(quiz.userAnswers).forEach((answer, index) => {
          const isCorrect =
            answer.answer === questionsArray[index].correctAnswer ? 1 : 0;
          correctAnswersCount += isCorrect;
        });

        quiz.finalScore = (correctAnswersCount / questionsArray.length) * 100;
      }

      if (answer.isChecked) {
        // TODO
        // saveToStorage(quizId, quiz);
      }

      return { ...state };
    }

    case ActionType.SetLoadedAnswers: {
      const { loadedUserAnswers }: { loadedUserAnswers: Quizzes } = payload;
      Object.entries(loadedUserAnswers).forEach(([quizId, quizObjValue]) => {
        const quizObj = state.availableQuizzes?.[quizId];

        if (quizObj) {
          const { finalScore, userAnswers } = quizObjValue;
          quizObj.finalScore = finalScore;
          quizObj.userAnswers = userAnswers;
          // TODO
          // quizObj.questions = questions;
        }
      });
      return { ...state };
    }
    case ActionType.ResetAvailableQuizzes: {
      if (!state.availableQuizzes) {
        return { ...state };
      }

      Object.values(state.availableQuizzes).forEach((quizObj) => {
        quizObj.finalScore = null;
        quizObj.userAnswers = {};
      });

      clearStorage();
      return { ...state };
    }
    default:
      throw new Error();
  }
};

export default reducer;
