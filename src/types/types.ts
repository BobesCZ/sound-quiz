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
  [key: QuizId]: Quiz;
}

export interface FilterUserQuizzesResult {
  completedQuizzes: Quiz[];
  incompletedQuizzes: Quiz[];
}

export interface Video {
  id: string;
  startSeconds: number;
  endSeconds?: number;
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

export interface Question {
  questionText: string;
  video: Video;
  sourceAnswers?: SourceAnswers;
  answerInfo: AnswerInfo;
  answers: AnswerObject[] | [];
  correctAnswer: number | null;
}

export type Questions = Question[];

export interface AnswerObject {
  id: number;
  answerText: string;
}
