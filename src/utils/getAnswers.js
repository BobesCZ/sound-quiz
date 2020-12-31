import shuffleArray from './shuffleArray';

function createAnswerObject(id, text) {
  const answerObj = {};
  answerObj.id = id;
  answerObj.answerText = text;
  return answerObj;
}

function getAnswers(answersObj, randomizeAnswers = true) {
  const correctAnswerText = answersObj.correctAnswer;
  const answersTextArray = [...answersObj.otherAnswerArray];
  const answersLimit = 4;

  const finalAnswersArray = [];
  let finalCorrectAnswerIndex;

  if (correctAnswerText && answersTextArray.length) {
    // Pop random items from array until there are (answersLimit -1) items
    for (let i = answersTextArray.length - 1; i >= answersLimit - 1; i--) {
      answersTextArray.splice(Math.floor(Math.random() * answersTextArray.length), 1);
    }

    if (randomizeAnswers) {
      // Shuffle items 
      shuffleArray(answersTextArray);

      // Correct answer with random index
      finalCorrectAnswerIndex = Math.floor(Math.random() * answersLimit);

      // Push item with correct answer
      answersTextArray.splice(finalCorrectAnswerIndex, 0, correctAnswerText);
    }
    else {
      // Push item with correct answer
      answersTextArray.push(correctAnswerText);

      // Sort items
      answersTextArray.sort();

      // Correct answer
      finalCorrectAnswerIndex = answersTextArray.indexOf(correctAnswerText);
    }

    // Create answers object
    answersTextArray.forEach((item, index) => {
      finalAnswersArray.push(createAnswerObject(index, item));
    })
  }
  return { finalAnswersArray, finalCorrectAnswerIndex };
}
export default getAnswers