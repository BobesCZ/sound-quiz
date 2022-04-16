import { AnswerObject } from "./answer";

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
