import { useContext } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import AppDispatch from '../context/AppDispatch';
import { QuestionRadioCorrect, QuestionRadioWrong } from './QuestionRadio';

function QuestionControl(props) {
  const questionId = props.questionId;
  const questionObject = props.questionObject;

  const answer = props.appState.userAnswers[questionId] ? props.appState.userAnswers[questionId].answer : null;
  const answerChecked = props.appState.userAnswers[questionId] ? props.appState.userAnswers[questionId].isChecked : null;
  const dispatch = useContext(AppDispatch);

  function handleChange(event) {
    if (answer === null) {
      const answer = { answer: parseInt(event.target.value), isChecked: false }
      dispatch({ type: 'SET_USER_ANSWER', payload: { questionId, answer } });

      setTimeout(() => {
        const answer = { answer: parseInt(event.target.value), isChecked: true }
        dispatch({ type: 'SET_USER_ANSWER', payload: { questionId, answer } });
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
        <FormLabel component="legend">
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

export default QuestionControl;
