import { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import AppDispatch from '../context/AppDispatch';
import questions from '../data/questions';
import QuestionControl from './QuestionControl';
import ResultControl from './ResultControl';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
    padding: 0,
  },
  backButton: {
    minWidth: "auto",
  }
}));

function QuizDetailPage(props) {
  const appState = props.appState;
  const dispatch = useContext(AppDispatch);

  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();

  const { id: quizId } = useParams();
  const quiz = appState.availableQuizzes[quizId];

  useEffect(() => {
    if (!quiz) {
      return <Redirect to={`/quiz/${quizId}`} />;
    }

    if (!quiz.questions.length) {
      dispatch({ type: 'SET_QUESTIONS_TO_QUIZ', payload: { quizId, questions: questions[quizId] } });
    }
  }, [quizId, quiz, dispatch])

  if (!quiz) {
    return <Redirect to={`/quiz/${quizId}`} />;
  }

  const questionsArray = quiz.questions;
  if (!questionsArray || questionsArray.length === 0) {
    return null
  }

  const questionCount = questionsArray.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isStepChecked = () => {
    return (appState.availableQuizzes[quizId].userAnswers.hasOwnProperty(activeStep) && appState.availableQuizzes[quizId].userAnswers[activeStep].isChecked);
  };

  return (
    <>
      {activeStep === questionCount
        ? <ResultControl appState={appState} questionsArray={questionsArray} />
        : <>
          <QuestionControl appState={appState} questionsArray={questionsArray} questionId={activeStep} />

          <MobileStepper
            variant="progress"
            steps={questionCount}
            position="static"
            activeStep={activeStep}
            className={classes.root}
            nextButton={
              <Button size="small" variant="contained" color="primary" onClick={handleNext} disabled={!isStepChecked()} endIcon={<KeyboardArrowRight />}>
                Next
              </Button>
            }
            backButton={
              <Button className={classes.backButton} size="small" variant="outlined" color="primary" onClick={handleBack} disabled={activeStep === 0}>
                <KeyboardArrowLeft />
              </Button>
            }
          />
        </>
      }
    </>
  );
}

export default QuizDetailPage;
