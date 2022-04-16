import { Question } from "./question";

export type QuizId = string;

export enum Difficulty {
  easy = "EASY",
  medium = "MEDIUM",
  hard = "HARD",
}

export interface Options {
  randomizeAnswers?: boolean;
  videoDuration?: number;
}

export interface Answer {
  answer: number;
  isChecked: boolean;
}

export interface Quiz {
  name: string;
  description: string;
  estimatedMinutes: number;
  difficulty: Difficulty;
  options: Options;
  questionsCount: number;
  questions: Question[];
  userAnswers: {
    [key: string]: Answer;
  };
  finalScore: number | null;
}

export interface Quizzes {
  [key: string]: Quiz;
}
