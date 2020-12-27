import { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import MobileStepper from '@material-ui/core/MobileStepper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import AppDispatch from '../context/AppDispatch';
import questions from '../data/questions';
import QuestionControl from './QuestionControl';
import ResultControl from './ResultControl';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    padding: 0,
  },
  progress: {
    width: "100%",
  },
  title: {
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
  nextButtonWrap: {
    textAlign: "center",
  },
  bottomBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: theme.palette.background.paper,
  },
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
  const showResultText = quiz.finalScore && quiz.userAnswers[activeStep] && quiz.userAnswers[activeStep].isChecked ? true : false;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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

          <Box my={3} className={classes.nextButtonWrap}>
            <Button size="large" variant="contained" color="primary" onClick={handleNext} disabled={!isStepChecked()} endIcon={<KeyboardArrowRight />}>
              {showResultText
                ? "View your results"
                : "Next question"
              }
            </Button>
          </Box>

          <AppBar position="fixed" className={classes.bottomBar}>
            <Container maxWidth="sm">
              <Typography variant="subtitle2" color="textSecondary" className={classes.title} gutterBottom>
                Question {activeStep + 1}/{questionsArray.length}
              </Typography>

              <MobileStepper
                variant="progress"
                steps={questionCount}
                position="static"
                activeStep={activeStep}
                classes={{ root: classes.root, progress: classes.progress }}
              />
            </Container>
          </AppBar>

        </>
      }
    </>
  );
}

export default QuizDetailPage;
