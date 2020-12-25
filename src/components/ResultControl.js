import { Link as RouterLink } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ResultGraph from './ResultGraph';

function ResultControl(props) {
  const userAnswers = props.appState.userAnswers;
  const questionsArray = props.questionsArray;
  const questionCount = questionsArray.length;

  let correctAnswersCount = 0;

  Object.keys(userAnswers).map(item => {
    const isCorrect = userAnswers[item].answer === questionsArray[item].correctAnswer ? 1 : 0;
    correctAnswersCount += isCorrect;
    return 0;
  })

  const score = correctAnswersCount / questionCount * 100;

  return (
    <Box
      my={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <ResultGraph value={score} />
      Correct answers: {correctAnswersCount} / {questionCount}

      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to="/"
        >
          Choose another quiz
        </Button>
      </Box>
    </Box>
  );
}

export default ResultControl;
