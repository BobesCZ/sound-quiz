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
import {
  getEnteredAnswersCount,
  getFinalScore,
  getQuestions,
} from "../utils/utils";

const reducer = (state: AppState, { type, payload }: Action) => {
  switch (type) {
    /**
     * Set available quizzes (read-only data)
     */
    case ActionType.SetAvailableQuizzes: {
      const { availableQuizzes }: { availableQuizzes: Quizzes } = payload;
      return { ...state, availableQuizzes };
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
      const { questionsArray, answerList } = getQuestions(
        questions,
        randomizeAnswers
      );

      saveQuestionsToStorage(quizId, questionsArray);
      saveAnswersToStorage(quizId, { answerList, finalScore: null });

      return {
        ...state,
        availableQuestions: {
          ...state.availableQuestions,
          [quizId]: questionsArray,
        },
        userAnswers: {
          ...state.userAnswers,
          [quizId]: {
            answerList,
            finalScore: null,
          },
        },
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
      const questionsArray = state.availableQuestions?.[quizId];
      const oldAnswerList = state?.userAnswers?.[quizId]?.answerList;

      if (!quiz || !questionsArray?.length || !oldAnswerList) {
        return { ...state };
      }

      const answerList: AnswerList = {
        ...oldAnswerList,
        [questionId]: {
          ...answer,
          userAnswers: oldAnswerList[questionId].userAnswers,
        },
      };

      const answersCount = getEnteredAnswersCount(answerList);

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
      const { availableQuestions, userAnswers }: AppState = payload;
      return { ...state, availableQuestions, userAnswers };
    }

    /**
     * Delete all user quiz data from external source and state
     */
    case ActionType.DeleteUserData: {
      clearStorage();
      return {
        ...state,
        availableQuestions: undefined,
        userAnswers: undefined,
      };
    }
    default:
      throw new Error();
  }
};

export default reducer;
