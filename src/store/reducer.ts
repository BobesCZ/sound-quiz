import { Action, ActionType, AppState } from "../types/context";
import {
  AnswerDetail,
  AnswerList,
  Questions,
  QuizId,
  QuizzesSource,
} from "../types/types";
import { clearStorage, saveAnswersToStorage } from "../utils/storage";
import {
  getEnteredAnswersCount,
  getFinalScore,
  getQuestions,
} from "../utils/utils";

const reducer = (state: AppState, { type, payload }: Action): AppState => {
  switch (type) {
    /**
     * Set available quizzes (read-only data)
     */
    case ActionType.SetAvailableQuizzes: {
      const { availableQuizzes }: { availableQuizzes: QuizzesSource } = payload;
      return { ...state, availableQuizzes };
    }

    /**
     * Resolve Question objects, shuffle questions and answers (user data)
     */
    case ActionType.SetQuestionsToQuiz: {
      const { quizId, questions }: { quizId: QuizId; questions: Questions } =
        payload;

      const quizObj = state?.availableQuizzes?.[quizId];

      if (!quizObj) {
        return { ...state };
      }

      const { randomizeAnswers } = quizObj.options || {};
      const { questionObj, questionArray, answerList } = getQuestions(
        questions,
        randomizeAnswers
      );

      saveAnswersToStorage(quizId, {
        questionArray,
        answerList,
        finalScore: null,
      });

      return {
        ...state,
        availableQuestions: {
          ...state.availableQuestions,
          [quizId]: questionObj,
        },
        userAnswers: {
          ...state.userAnswers,
          [quizId]: {
            questionArray,
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
      const questionObj = state.availableQuestions?.[quizId];
      const oldAnswerList = state?.userAnswers?.[quizId]?.answerList;
      const oldQuestionArray = state?.userAnswers?.[quizId]?.questionArray;

      if (!quiz || !questionObj || !oldAnswerList || !oldQuestionArray) {
        return { ...state };
      }

      const answerList: AnswerList = {
        ...oldAnswerList,
        [questionId]: {
          ...answer,
          answerArray: oldAnswerList[questionId].answerArray,
        },
      };

      const answersCount = getEnteredAnswersCount(answerList);

      let finalScore =
        answersCount === Object.keys(questionObj).length
          ? getFinalScore(answerList, questionObj)
          : null;

      if (answer.isChecked) {
        saveAnswersToStorage(quizId, {
          answerList,
          finalScore,
        });
      }

      return {
        ...state,
        userAnswers: {
          ...state.userAnswers,
          [quizId]: {
            questionArray: oldQuestionArray,
            answerList,
            finalScore,
          },
        },
      };
    }

    /**
     * Set user data from external source to state
     */
    case ActionType.SetUserData: {
      const { userAnswers }: AppState = payload;
      return { ...state, userAnswers };
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
