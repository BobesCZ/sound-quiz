import { Action, ActionType, AppState } from "../types/context";
import {
  AnswerDetail,
  AnswerList,
  Question,
  QuizId,
  Quizzes,
} from "../types/types";
import {
  clearStorage,
  saveAnswersToStorage,
  saveQuestionsToStorage,
} from "../utils/storage";
import { getFinalScore, getQuestions } from "../utils/utils";

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

    /**
     * Process user answer
     */
    case ActionType.SetUserAnswer: {
      const {
        quizId,
        questionId,
        answer,
      }: { quizId: QuizId; questionId: string; answer: AnswerDetail } = payload;

      const quiz = state.availableQuizzes?.[quizId];
      const questionsArray = state.userQuestions?.[quizId];

      if (!quiz || !questionsArray?.length) {
        return { ...state };
      }

      const answerList: AnswerList = {
        ...state?.userAnswers?.[quizId]?.answerList,
        [questionId]: answer,
      };

      const answersCount = Object.keys(answerList).length;

      let finalScore =
        answersCount === questionsArray.length
          ? getFinalScore(answerList, questionsArray)
          : null;

      if (answer.isChecked) {
        saveAnswersToStorage(quizId, { answerList, finalScore });
      }

      return {
        ...state,
        userAnswers: {
          ...state.userAnswers,
          [quizId]: { answerList, finalScore },
        },
      };
    }

    /**
     * Set user data from external source to state
     */
    case ActionType.SetUserData: {
      const { userQuestions, userAnswers }: AppState = payload;
      return { ...state, userQuestions, userAnswers };
    }

    /**
     * Delete all user quiz data from external source and state
     */
    case ActionType.DeleteUserData: {
      clearStorage();
      return { ...state, userQuestions: undefined, userAnswers: undefined };
    }
    default:
      throw new Error();
  }
};

export default reducer;
