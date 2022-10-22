import {
  saveFinalScore,
  saveQuestionsToQuiz,
  saveUserAnswer,
  saveUserNickName,
} from "../fetch/updateUtils";
import { Action, ActionType, AppState } from "../types/context";
import {
  AnswerDetail,
  AnswerList,
  Questions,
  QuizId,
  QuizzesSource,
  UserData,
} from "../types/types";
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

      const resultAnswer = state?.userAnswers?.[quizId] ?? {
        questionArray,
        answerList,
        finalScore: -1,
      };

      saveQuestionsToQuiz(quizId, resultAnswer);

      return {
        ...state,
        availableQuestions: {
          ...state.availableQuestions,
          [quizId]: questionObj,
        },
        userAnswers: {
          ...state.userAnswers,
          [quizId]: resultAnswer,
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
      const oldFinalScore = state?.userAnswers?.[quizId]?.finalScore ?? -1;

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

      if (answer.isChecked) {
        saveUserAnswer(quizId, questionId, answer);
      }

      return {
        ...state,
        userAnswers: {
          ...state.userAnswers,
          [quizId]: {
            questionArray: oldQuestionArray,
            answerList,
            finalScore: oldFinalScore,
          },
        },
      };
    }
    /**
     * Process user score
     */
    case ActionType.SetFinalScore: {
      const {
        quizId,
        nickName,
      }: { quizId: QuizId; nickName?: UserData["nickName"] } = payload;

      const quiz = state.availableQuizzes?.[quizId];
      const questionObj = state.availableQuestions?.[quizId];
      const answerObj = state?.userAnswers?.[quizId];
      const answerList = state?.userAnswers?.[quizId]?.answerList;

      if (!quiz || !questionObj || !answerObj || !answerList) {
        return { ...state };
      }

      const answersCount = getEnteredAnswersCount(answerList);

      if (answersCount !== Object.keys(questionObj).length) {
        return { ...state };
      }

      let finalScore = getFinalScore(answerList, questionObj);

      saveFinalScore(quizId, finalScore);

      if (nickName) {
        saveUserNickName(nickName);
      }

      return {
        ...state,
        userAnswers: {
          ...state.userAnswers,
          [quizId]: {
            ...answerObj,
            finalScore,
          },
        },
      };
    }

    /**
     * Set user data from external source to state
     */
    case ActionType.SetUserData: {
      const { userAnswers, userData }: AppState = payload;
      return { ...state, userAnswers, userData };
    }

    /**
     * Delete all user quiz data from external source and state
     */
    case ActionType.DeleteUserData: {
      return {
        ...state,
        userAnswers: undefined,
        userData: undefined,
      };
    }
    default:
      throw new Error();
  }
};

export default reducer;
