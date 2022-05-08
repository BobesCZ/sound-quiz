/**
 * Quiz
 */
export interface Quiz {
  name: string;
  description: string;
  estimatedMinutes: number;
  difficulty: Difficulty;
  options?: Options;
  questionsCount: number;
}

export type QuizId = string;
export type QuizzesSource = Record<QuizId, Quiz>;

export enum Difficulty {
  Easy = "EASY",
  Medium = "MEDIUM",
  Hard = "HARD",
}

export interface Options {
  randomizeAnswers?: boolean;
  videoDuration?: number;
}

/**
 * Question
 */
export interface Question {
  questionText: string;
  video: Video;
  answerInfo: AnswerInfo;
  answers: Record<AnswerId, string>;
  correctAnswerId: string;
}

export type QuestionId = string;
export type QuestionArray = QuestionId[];
export type Questions = Record<QuestionId, Question>;
export type QuestionsSource = Record<QuizId, Questions>;

export interface Video {
  id: string;
  startSeconds: number;
  endSeconds: number;
}

export interface AnswerInfo {
  imgUrl: string;
  songName: string;
  albumName: string;
}

/**
 * Answer
 */
export interface Answer {
  questionArray: QuestionArray;
  answerList: AnswerList;
  finalScore: number;
}

export type AnswerId = string;
export type AnswerArray = AnswerId[];
export type AnswerList = Record<QuestionId, AnswerDetail>;
export type AnswersSource = Record<QuizId, Answer>;

export interface AnswerDetail {
  isChecked: boolean;
  answerArray: AnswerArray;
  enteredAnswerId?: AnswerId;
}
