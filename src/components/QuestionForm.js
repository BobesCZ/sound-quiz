import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import AppDispatch from '../context/AppDispatch';
import {
  QuestionRadioCorrect, QuestionRadioWrong,
} from '../elements/QuestionRadio';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    '&$focused': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
  focused: {}
}));

function QuestionForm(props) {
  const questionId = props.questionId;
  const questionObject = props.questionObject;
  const { id: quizId } = useParams();

  const answer = props.appState.availableQuizzes[quizId].userAnswers[questionId] ? props.appState.availableQuizzes[quizId].userAnswers[questionId].answer : null;
  const answerChecked = props.appState.availableQuizzes[quizId].userAnswers[questionId] ? props.appState.availableQuizzes[quizId].userAnswers[questionId].isChecked : null;
  const dispatch = useContext(AppDispatch);
  const classes = useStyles();

  function handleChange(event) {
    if (answer === null) {
      const answer = { answer: parseInt(event.target.value), isChecked: false }
      dispatch({ type: 'SET_USER_ANSWER', payload: { quizId, questionId, answer } });

      setTimeout(() => {
        const answer = { answer: parseInt(event.target.value), isChecked: true }
        dispatch({ type: 'SET_USER_ANSWER', payload: { quizId, questionId, answer } });
      }, 1400)
    }
  }

  function getControl(id) {
    if (questionObject.correctAnswer === id) {
      return <QuestionRadioCorrect waitingAnimation={answerChecked ? false : true} isCorrect={questionObject.correctAnswer === id ? true : false} />;
    } else {
      return <QuestionRadioWrong waitingAnimation={answerChecked ? false : true} isCorrect={questionObject.correctAnswer === id ? true : false} />;
    }
  }

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel classes={{ root: classes.root, focused: classes.focused }} component="legend">
          {questionObject.questionText}
        </FormLabel>
        <RadioGroup aria-label="question" name="question1" value={answer} onChange={handleChange}>
          {questionObject.answers.map((answerObject) => (
            <FormControlLabel key={answerObject.id} value={answerObject.id} control={getControl(answerObject.id)} label={answerObject.answerText} />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
}

export default QuestionForm;
