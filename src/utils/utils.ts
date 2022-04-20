import {
  AnswerObject,
  SourceAnswers,
  Question,
  AnswerList,
} from "../types/types";
import { shuffleArray } from "./common";

const getVideoEndSeconds = (startSeconds: number, videoDuration = 10) =>
  startSeconds + videoDuration;

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

const getQuestions = (
  questions: Question[],
  randomizeAnswers?: boolean
): Question[] => {
  shuffleArray(questions);

  return questions
    .map(({ questionText, video, sourceAnswers, answerInfo }) => {
      if (!sourceAnswers) {
        return undefined;
      }

      const { finalAnswersArray, finalCorrectAnswerIndex } = getAnswers(
        sourceAnswers,
        randomizeAnswers
      );

      return {
        questionText,
        video: {
          ...video,
          endSeconds: getVideoEndSeconds(video.startSeconds),
        },
        answerInfo,
        answers: finalAnswersArray,
        correctAnswer: finalCorrectAnswerIndex,
      };
    })
    .filter((item): item is Question => !!item);
};

const getFinalScore = (answerList: AnswerList, questionsArray: Question[]) => {
  const correctAnswersCount = Object.entries(answerList).reduce(
    (sum, [index, answer]) => {
      const isCorrect =
        answer.answer === questionsArray[parseInt(index)].correctAnswer ? 1 : 0;
      return (sum += isCorrect);
    },
    0
  );

  return (correctAnswersCount / questionsArray.length) * 100;
};

export { getVideoEndSeconds, getAnswers, getQuestions, getFinalScore };
