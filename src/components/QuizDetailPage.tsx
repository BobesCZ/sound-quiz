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
import { ActionType } from '../types/action';
import { AppState } from '../types/appState';
import { Quiz } from '../types/quiz';

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

export default function QuizDetailPage({appState}: {appState: AppState}) {
  const { availableQuizzes } = appState;
  const { id: quizId } = useParams<{ id: string }>();
  const quizObj : Quiz | undefined = availableQuizzes?.[quizId];
  
  const [activeStep, setActiveStep] = useState(0);
  const [redirectTo, setRedirectTo] = useState(false);
  
  const { dispatch } = useContext(AppDispatch);
  const classes = useStyles();

  useEffect(() => {
    if (!quizObj) {
      setRedirectTo(true);
    }
    if (!quizObj?.questions.length) {
      dispatch({ type: ActionType.SetQuestionsToQuiz, payload: { quizId, questions: questions[quizId] } });
    }
  }, [quizId, quizObj, dispatch])

  if (!quizObj || redirectTo) {
    return <Redirect to={`/quiz/${quizId}`} />;
  }

  const questionsArray = quizObj.questions;
  if (!questionsArray || questionsArray.length === 0) {
    return null
  }

  const questionCount = questionsArray.length;
  const showResultText = quizObj.finalScore !== null && quizObj.userAnswers[activeStep] && quizObj.userAnswers[activeStep].isChecked ? true : false;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  if (!availableQuizzes) {
    return <></>;
  }

  const isQuestionChecked = availableQuizzes[quizId].userAnswers.hasOwnProperty(activeStep) && availableQuizzes[quizId].userAnswers[activeStep].isChecked;

  return (
    <>
      {activeStep === questionCount
        ? <ResultControl appState={appState} />
        : <>

          <QuestionControl appState={appState} questionsArray={questionsArray} questionId={activeStep} isQuestionChecked={isQuestionChecked} />

          <Box my={3} className={classes.nextButtonWrap}>
            <Button size="large" variant="contained" color="primary" onClick={handleNext} disabled={!isQuestionChecked} endIcon={<KeyboardArrowRight />}>
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
                backButton={null}
                nextButton={null}
              />
            </Container>
          </AppBar>

        </>
      }
    </>
  );
}
