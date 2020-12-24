import { useState } from 'react';
import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import data from '../data/data';
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
  const questionCount = data.length;
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isStepChecked = () => {
    return (appState.userAnswers.hasOwnProperty(activeStep) && appState.userAnswers[activeStep].isChecked);
  };

  return (
    <>
      {activeStep === questionCount
        ? <ResultControl appState={appState} questionCount={questionCount} />
        : <>
          <QuestionControl appState={appState} questionId={activeStep} />

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
