import { Action, ActionType } from "../types/action";
import { AppState } from "../types/appState";
import { Questions } from "../types/question";
import { Answer, Quizzes } from "../types/quiz";
import { getAnswers, getVideoEndSeconds } from "../utils/utils";
import { shuffleArray } from "../utils/common";
import { clearStorage, saveToStorage } from "../utils/storage";

const reducer = (state: AppState, action: Action) => {
  const { type, payload } = action;

  switch (type) {
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

        Object.keys(quiz.userAnswers).forEach((item: any) => {
          const isCorrect =
            quiz.userAnswers[item].answer === quiz.questions[item].correctAnswer
              ? 1
              : 0;
          correctAnswersCount += isCorrect;
        });

        quiz.finalScore = (correctAnswersCount / quiz.questions.length) * 100;
      }

      if (answer.isChecked) {
        saveToStorage(quizId, quiz);
      }

      return { ...state };
    }
    case ActionType.SetAvailableQuizzes: {
      const { quizzes }: { quizzes: Quizzes } = payload;
      state.availableQuizzes = quizzes;
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
      Object.keys(loadedUserAnswers).forEach((quizId) => {
        const quizObj = state.availableQuizzes?.[quizId];

        if (quizObj) {
          const { finalScore, userAnswers } = loadedUserAnswers[quizId];
          quizObj.finalScore = finalScore;
          quizObj.userAnswers = userAnswers;
        }
      });
      return { ...state };
    }
    case ActionType.ResetAvailableQuizzes: {
      if (!state.availableQuizzes) {
        return { ...state };
      }

      Object.keys(state.availableQuizzes).forEach((quizId) => {
        const quizObj = state.availableQuizzes?.[quizId];

        if (quizObj) {
          quizObj.finalScore = null;
          quizObj.userAnswers = {};
        }
      });

      clearStorage();
      return { ...state };
    }
    default:
      throw new Error();
  }
};

export default reducer;
