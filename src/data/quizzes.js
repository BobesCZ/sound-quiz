import questions from '../data/questions';

const setQuestionsCount = (questionsObj, quizzesObj) => {
  Object.keys(quizzesObj).map(key => (
    quizzesObj[key].questionsCount = questionsObj[key] ? questionsObj[key].length : 0
  ))
  return quizzesObj;
}

const quizzes = {
  'f8b5b078': {
    type: 'sound',
    name: 'Metal',
    estimatedMinutes: 3,
    difficulty: 'Hard',
    questionsCount: 0,
    questions: [],
  },
  'b0fe33b7': {
    type: 'sound',
    name: 'Jazz',
    estimatedMinutes: 1,
    difficulty: 'Easy',
    questionsCount: 0,
    questions: [],
  },
  'c4082e41': {
    type: 'sound',
    name: 'Classical music',
    estimatedMinutes: 5,
    difficulty: 'Medium',
    questionsCount: 0,
    questions: [],
  },
};

const availableQuizzes = setQuestionsCount(questions, quizzes)

export default availableQuizzes;
