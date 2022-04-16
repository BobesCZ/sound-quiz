import { AnswerObject } from "../types/answer";
import { SourceAnswers } from "../types/question";
import { shuffleArray } from "./common";
import { Questions } from "../types/question";
import { Quiz, Quizzes } from "../types/quiz";

const getVideoEndSeconds = (startSeconds: number, videoDuration = 10) =>
  startSeconds + videoDuration;

const setQuestionsCount = (
  questionsObj: Record<string, Questions>,
  quizzesObj: Quizzes
) => {
  Object.keys(quizzesObj).map(
    (key) =>
      (quizzesObj[key].questionsCount = questionsObj[key]
        ? questionsObj[key].length
        : 0)
  );
  return quizzesObj;
};

const createAnswerObject = (id: number, text: string) => {
  const answerObj: AnswerObject = {
    id,
    answerText: text,
  };
  return answerObj;
};

const getAnswers = (sourceAnswers: SourceAnswers, randomizeAnswers = true) => {
  const correctAnswerText = sourceAnswers.correctAnswer;
  const answersTextArray = [...sourceAnswers.otherAnswerArray];
  const answersLimit = 4;

  const finalAnswersArray: AnswerObject[] = [];
  let finalCorrectAnswerIndex = null;

  if (correctAnswerText && answersTextArray.length) {
    // Pop random items from array until there are (answersLimit -1) items
    for (let i = answersTextArray.length - 1; i >= answersLimit - 1; i--) {
      answersTextArray.splice(
        Math.floor(Math.random() * answersTextArray.length),
        1
      );
    }

    if (randomizeAnswers) {
      // Shuffle items
      shuffleArray(answersTextArray);

      // Correct answer with random index
      finalCorrectAnswerIndex = Math.floor(Math.random() * answersLimit);

      // Push item with correct answer
      answersTextArray.splice(finalCorrectAnswerIndex, 0, correctAnswerText);
    } else {
      // Push item with correct answer
      answersTextArray.push(correctAnswerText);

      // Sort items
      answersTextArray.sort();

      // Correct answer
      finalCorrectAnswerIndex = answersTextArray.indexOf(correctAnswerText);
    }

    // Create answers object
    answersTextArray.forEach((item, index) => {
      finalAnswersArray.push(createAnswerObject(index, item));
    });
  }
  return { finalAnswersArray, finalCorrectAnswerIndex };
};

interface FilterUserQuizzesResult {
  completedQuizzes: Quiz[];
  incompletedQuizzes: Quiz[];
}

const filterUserQuizzes = (
  availableQuizzes?: Quizzes
): FilterUserQuizzesResult =>
  Object.values(availableQuizzes || {}).reduce(
    (result: FilterUserQuizzesResult, quiz) => {
      if (quiz.finalScore !== null) {
        return {
          ...result,
          completedQuizzes: [...result.completedQuizzes, quiz],
        };
      } else if (quiz.userAnswers.length) {
        return {
          ...result,
          incompletedQuizzes: [...result.incompletedQuizzes, quiz],
        };
      }
      return { ...result };
    },
    {
      completedQuizzes: [],
      incompletedQuizzes: [],
    }
  );

export { getVideoEndSeconds, setQuestionsCount, getAnswers, filterUserQuizzes };
