import React, { useState } from 'react';
import { QuestionRadioCorrect, QuestionRadioWrong } from './QuestionRadio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';

function QuestionControl(props) {
  const questionObject = props.questionObject;
  const [answer, setAnswer] = useState(null);
  const [answerChecked, setAnswerChecked] = useState(false);

  function handleChange(event) {
    if (answer === null) {
      setAnswer(parseInt(event.target.value));

      setTimeout(() => {
        setCorrectAnswer();
      }, 1500)
    }
  }

  function setCorrectAnswer(event) {
    // setAnswer(questionObject.correctAnswer);
    setAnswerChecked(true);
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
