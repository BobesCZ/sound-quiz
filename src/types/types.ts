/**
 * Quiz
 */
export interface Quiz {
  name: string;
  description: string;
  estimatedMinutes: number;
  difficulty: Difficulty;
  options: Options;
  questionsCount: number;
}

export interface Quizzes {
  [key: QuizId]: Quiz;
}

export type QuizId = string;

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
  sourceAnswers?: SourceAnswers;
  answerInfo: AnswerInfo;
  answers: AnswerObject[] | [];
  correctAnswer: number | null;
}

export interface Questions {
  [key: QuizId]: Question[];
}

export interface Video {
  id: string;
  startSeconds: number;
  endSeconds: number;
}

export interface SourceAnswers {
  correctAnswer: string;
  otherAnswerArray: string[];
}

export interface AnswerInfo {
  imgUrl: string;
  songName: string;
  albumName: string;
}

export interface AnswerObject {
  id: number;
  answerText: string;
}

/**
 * Answer
 */

export interface Answer {
  answerList: AnswerList;
  finalScore: number | null;
}

export interface Answers {
  [key: QuizId]: Answer;
}

export interface AnswerList {
  [key: string]: AnswerDetail;
}

export interface AnswerDetail {
  answer: number;
  isChecked: boolean;
}
