import { Action, ActionType, AppState } from "../types/context";
import { Answer, Questions, Quizzes } from "../types/types";
import { shuffleArray } from "../utils/common";
import { clearStorage, saveToStorage } from "../utils/storage";
import { getAnswers, getVideoEndSeconds } from "../utils/utils";

const reducer = (state: AppState, { type, payload }: Action) => {
  switch (type) {
    /**
     * Set available quizzes (read-only data)
     */
    case ActionType.SetAvailableQuizzes: {
      const { availableQuizzesSource } = payload;
      return { ...state, availableQuizzes: availableQuizzesSource };
    }

    case ActionType.SetUserAnswer: {
      const {
        quizId,
        questionId,
        answer,
      }: { quizId: string; questionId: string; answer: Answer } = payload;
      const quiz = state.availableQuizzes?.[quizId];

      if (!quiz) {
        return { ...state };
      }

      quiz.userAnswers[questionId] = answer;

      let answersCount = Object.keys(quiz.userAnswers).length;
      if (answersCount === quiz.questions.length) {
        let correctAnswersCount = 0;

        Object.values(quiz.userAnswers).forEach((answer, index) => {
          const isCorrect =
            answer.answer === quiz.questions[index].correctAnswer ? 1 : 0;
          correctAnswersCount += isCorrect;
        });

        quiz.finalScore = (correctAnswersCount / quiz.questions.length) * 100;
      }

      if (answer.isChecked) {
        saveToStorage(quizId, quiz);
      }

      return { ...state };
    }

    case ActionType.SetQuestionsToQuiz: {
      const { quizId, questions }: { quizId: string; questions: Questions } =
        payload;

      if (!state.availableQuizzes) {
        return { ...state };
      }

      const options = state.availableQuizzes[quizId].options || {};
      shuffleArray(questions);

      questions.forEach((questionObj) => {
        if (!questionObj.sourceAnswers) {
          return;
        }
        const { finalAnswersArray, finalCorrectAnswerIndex } = getAnswers(
          questionObj?.sourceAnswers,
          options.randomizeAnswers
        );
        questionObj.answers = finalAnswersArray;
        questionObj.correctAnswer = finalCorrectAnswerIndex;

        questionObj.video.endSeconds = getVideoEndSeconds(
          questionObj.video.startSeconds,
          options.videoDuration
        );
        delete questionObj.sourceAnswers;
      });

      state.availableQuizzes[quizId].questions = questions;
      return { ...state };
    }
    case ActionType.SetLoadedAnswers: {
      const { loadedUserAnswers }: { loadedUserAnswers: Quizzes } = payload;
      Object.entries(loadedUserAnswers).forEach(([quizId, quizObjValue]) => {
        const quizObj = state.availableQuizzes?.[quizId];

        if (quizObj) {
          const { finalScore, userAnswers, questions } = quizObjValue;
          quizObj.finalScore = finalScore;
          quizObj.userAnswers = userAnswers;
          quizObj.questions = questions;
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
