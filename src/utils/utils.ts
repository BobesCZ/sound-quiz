import { DataSnapshot } from "firebase/database";
import { shuffle } from "lodash";
import { AnswerList, QuestionArray, Questions } from "../types/types";

const getVideoEndSeconds = (startSeconds: number, videoDuration = 10) =>
  startSeconds + videoDuration;

/**
 * From `questions` source:
 * 1. resolve objects in `questions`
 * 2. Generates random order of questions
 * 3. Generates random order of answers in each question
 */
const getQuestions = (
  questions: Questions,
  randomizeAnswers = true
): {
  questionObj: Questions;
  questionArray: QuestionArray;
  answerList: AnswerList;
} => {
  const questionObj = Object.entries(questions).reduce(
    (result: Questions, [questionId, { video, ...rest }]) => ({
      ...result,
      [questionId]: {
        ...rest,
        video: {
          ...video,
          endSeconds: getVideoEndSeconds(video.startSeconds),
        },
      },
    }),
    {}
  );

  const questionArray: QuestionArray = shuffle(Object.keys(questions));

  const answerList = Object.entries(questions).reduce(
    (result: AnswerList, [questionId, { answers }]) => {
      const keys = Object.keys(answers);
      const answerArray = randomizeAnswers ? shuffle(keys) : keys;
      return {
        ...result,
        [questionId]: {
          answerArray,
          isChecked: false,
        },
      };
    },
    {}
  );

  return { questionObj, questionArray, answerList };
};

const getEnteredAnswersCount = (answerList: AnswerList) =>
  Object.values(answerList).reduce(
    (sum, { enteredAnswerId }) => sum + (!!enteredAnswerId ? 1 : 0),
    0
  );

const getFinalScore = (answerList: AnswerList, questionObj: Questions) => {
  const correctAnswersCount = Object.entries(answerList).reduce(
    (sum, [questionId, answer]) => {
      const isCorrect =
        answer.enteredAnswerId === questionObj[questionId].correctAnswerId
          ? 1
          : 0;
      return (sum += isCorrect);
    },
    0
  );

  return (correctAnswersCount / Object.keys(questionObj).length) * 100;
};

const resolveFetchedData = <T>(source: DataSnapshot[]): T =>
  source?.reduce(
    (result: T, i) => ({
      ...result,
      [i.key as string]: i.val(),
    }),
    {} as T
  );

export {
  getQuestions,
  getEnteredAnswersCount,
  getFinalScore,
  resolveFetchedData,
};
