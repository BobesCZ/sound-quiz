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

export type QuestionsSource = Record<QuizId, Question[]>;

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
  answerList: AnswerList;
  finalScore: number | null;
}

export type AnswerId = string;

export type AnswersSource = Record<QuizId, Answer>;

export interface AnswerList {
  [key: string]: AnswerDetail;
}

export interface AnswerDetail {
  userAnswers: AnswerId[];
  enteredAnswerId?: AnswerId;
  isChecked: boolean;
}
