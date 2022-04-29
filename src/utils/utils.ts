import { shuffle } from "lodash";
import { Question, AnswerList } from "../types/types";
import { shuffleArray } from "./common";

const getVideoEndSeconds = (startSeconds: number, videoDuration = 10) =>
  startSeconds + videoDuration;

const getQuestions = (
  questions: Question[],
  randomizeAnswers = true
): { questionsArray: Question[]; answerList: AnswerList } => {
  shuffleArray(questions);

  const questionsArray = questions.map(({ video, ...rest }) => ({
    ...rest,
    video: {
      ...video,
      endSeconds: getVideoEndSeconds(video.startSeconds),
    },
  }));

  const answerList = questions.reduce((result, { answers }, index) => {
    const keys = Object.keys(answers);
    const userAnswers = randomizeAnswers ? shuffle(keys) : keys;
    return {
      ...result,
      [index]: {
        userAnswers,
        isChecked: false,
      },
    };
  }, {});

  return { questionsArray, answerList };
};

const getEnteredAnswersCount = (answerList: AnswerList) =>
  Object.values(answerList).reduce(
    (sum, { enteredAnswerId }) => sum + (!!enteredAnswerId ? 1 : 0),
    0
  );

const getFinalScore = (answerList: AnswerList, questionsArray: Question[]) => {
  const correctAnswersCount = Object.entries(answerList).reduce(
    (sum, [index, answer]) => {
      const isCorrect =
        answer.enteredAnswerId ===
        questionsArray[parseInt(index)].correctAnswerId
          ? 1
          : 0;
      return (sum += isCorrect);
    },
    0
  );

  return (correctAnswersCount / questionsArray.length) * 100;
};

export { getQuestions, getEnteredAnswersCount, getFinalScore };
