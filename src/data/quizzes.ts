import { Difficulty, Quizzes } from "../types/types";

export const availableQuizzesSource: Quizzes = {
  "metal-subgenres-8b5b078": {
    name: "Metal subgenres",
    description:
      "Can you guess music genre only by listening a short demonstration?",
    estimatedMinutes: 3,
    difficulty: Difficulty.Medium,
    options: {},
    questionsCount: 10,
    questions: [],
    userAnswers: {},
    finalScore: null,
  },
  "classical-music-c4082e41": {
    name: "Classical music (rock version)",
    description:
      "Can you guess author or song name of famous classical music works of art? And can you handle with demonstrations played by modern rock/metal bands?",
    estimatedMinutes: 3,
    difficulty: Difficulty.Hard,
    options: {},
    questionsCount: 10,
    questions: [],
    userAnswers: {},
    finalScore: null,
  },
  "rock-history-kcca86d2": {
    name: "Rock history ('60s - '90s)",
    description:
      "Can you guess, which decade of 19th centrury the song belongs to?",
    estimatedMinutes: 3,
    difficulty: Difficulty.Easy,
    options: {
      randomizeAnswers: false,
    },
    questionsCount: 10,
    questions: [],
    userAnswers: {},
    finalScore: null,
  },
};
