import questions from '../data/questions';

const setQuestionsCount = (questionsObj, quizzesObj) => {
  Object.keys(quizzesObj).map(key => (
    quizzesObj[key].questionsCount = questionsObj[key] ? questionsObj[key].length : 0
  ))
  return quizzesObj;
}

const quizzes = {
  'f8b5b078': {
    name: 'Metal subgenres',
    description: 'Can you guess music genre only by listening a short demonstration?',
    estimatedMinutes: 3,
    difficulty: 'Medium',
    questionsCount: 0,
    questions: [],
    userAnswers: [],
    finalScore: null,
  },
  'c4082e41': {
    name: 'Classical music (rock version)',
    description: "Can you guess author or song name of famous classical music works of art? And can you handle with demonstrations played by modern rock/metal bands?",
    estimatedMinutes: 3,
    difficulty: 'Hard',
    questionsCount: 0,
    questions: [],
    userAnswers: [],
    finalScore: null,
  },
  // 'b0fe33b7': {
  //   name: 'Test quiz',
  //   description: 'Can you guess music genre only by listening a short demonstration?',
  //   estimatedMinutes: 3,
  //   difficulty: 'Easy',
  //   questionsCount: 0,
  //   questions: [],
  //   userAnswers: [],
  //   finalScore: null,
  // },
};

const availableQuizzes = setQuestionsCount(questions, quizzes)

export default availableQuizzes;
