import Box from '@material-ui/core/Box';
import data from '../data/data';
import ResultGraph from './ResultGraph';

function ResultControl(props) {
  const userAnswers = props.appState.userAnswers;
  const questionCount = props.questionCount;

  let correctAnswersCount = 0;

  Object.keys(userAnswers).map(item => {
    const isCorrect = userAnswers[item].answer === data[item].correctAnswer ? 1 : 0;
    correctAnswersCount += isCorrect;
    return 0;
  })

  const score = correctAnswersCount / questionCount * 100;

  return (
    <>
      <Box
        my={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <ResultGraph value={score} />
        Correct answers: {correctAnswersCount} / {questionCount}
      </Box>
    </>
  );
}

export default ResultControl;
