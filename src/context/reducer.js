import getAnswers from '../utils/getAnswers';
import getVideoEndSeconds from '../utils/getVideoEndSeconds';
import shuffleArray from '../utils/shuffleArray';
import { clearStorage, saveToStorage } from '../utils/storage';

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER_ANSWER': {
      const { quizId, questionId, answer } = action.payload;
      const quiz = state.availableQuizzes[quizId];
      quiz.userAnswers[questionId] = answer;

      let answersCount = Object.keys(quiz.userAnswers).length;
      if (answersCount === quiz.questions.length) {
        let correctAnswersCount = 0;

        Object.keys(quiz.userAnswers).forEach(item => {
          const isCorrect = quiz.userAnswers[item].answer === quiz.questions[item].correctAnswer ? 1 : 0;
          correctAnswersCount += isCorrect;
        })

        quiz.finalScore = correctAnswersCount / quiz.questions.length * 100;
      };

      if (answer.isChecked) {
        saveToStorage(quizId, quiz)
      }

      return { ...state };
    }
    case 'SET_AVAILABLE_QUIZZES': {
      const { quizzes } = action.payload
      state.availableQuizzes = quizzes;
      return { ...state };
    }
    case 'SET_QUESTIONS_TO_QUIZ': {
      const { quizId, questions } = action.payload;
      const options = state.availableQuizzes[quizId].options || {};
      shuffleArray(questions);

      questions.forEach(questionObj => {
        const { finalAnswersArray, finalCorrectAnswerIndex } = getAnswers(questionObj.sourceAnswers, options.randomizeAnswers);
        questionObj.answers = finalAnswersArray;
        questionObj.correctAnswer = finalCorrectAnswerIndex;

        questionObj.video.endSeconds = getVideoEndSeconds(questionObj.video.startSeconds, options.videoDuration)
        delete questionObj.sourceAnswers;
      })

      state.availableQuizzes[quizId].questions = questions;
      return { ...state };
    }
    case 'SET_LOADED_ANSWERS': {
      const { loadedUserAnswers } = action.payload;
      Object.keys(loadedUserAnswers).forEach(quizId => {
        if (state.availableQuizzes[quizId]) {
          const { finalScore, userAnswers } = loadedUserAnswers[quizId];
          state.availableQuizzes[quizId].finalScore = finalScore;
          state.availableQuizzes[quizId].userAnswers = userAnswers;
        }
      })
      return { ...state };
    }
    case 'RESET_AVAILABLE_QUIZZES': {
      Object.keys(state.availableQuizzes).forEach(quizId => {
        state.availableQuizzes[quizId].finalScore = null;
        state.availableQuizzes[quizId].userAnswers = [];
      })

      clearStorage();
      return { ...state };
    }
    default:
      throw new Error();
  }
}

export default reducer;
