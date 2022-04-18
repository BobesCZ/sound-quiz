import { Difficulty, Quizzes } from "../types/types";
import { setQuestionsCount } from "../utils/utils";
import questions from "./questions";

const quizzes: Quizzes = {
  f8b5b078: {
    name: "Metal subgenres",
    description:
      "Can you guess music genre only by listening a short demonstration?",
    estimatedMinutes: 3,
    difficulty: Difficulty.Medium,
    options: {},
    questionsCount: 0,
    questions: [],
    userAnswers: {},
    finalScore: null,
  },
  c4082e41: {
    name: "Classical music (rock version)",
    description:
      "Can you guess author or song name of famous classical music works of art? And can you handle with demonstrations played by modern rock/metal bands?",
    estimatedMinutes: 3,
    difficulty: Difficulty.Hard,
    options: {},
    questionsCount: 0,
    questions: [],
    userAnswers: {},
    finalScore: null,
  },
  kcca86d2: {
    name: "Rock history ('60s - '90s)",
    description:
      "Can you guess, which decade of 19th centrury the song belongs to?",
    estimatedMinutes: 3,
    difficulty: Difficulty.Easy,
    options: {
      randomizeAnswers: false,
    },
    questionsCount: 0,
    questions: [],
    userAnswers: {},
    finalScore: null,
  },
};

const availableQuizzes = setQuestionsCount(questions, quizzes);

export default availableQuizzes;
