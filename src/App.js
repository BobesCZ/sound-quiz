import './App.css';
import QuestionComponent from './components/QuestionComponent';
import Container from '@material-ui/core/Container';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useReducer } from 'react';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import data from './data/data';
import AppDispatch from './context/AppDispatch';
import reducer from './context/reducer';
import initialState from './context/initialState';

function App() {
  const [appState, dispatch] = useReducer(reducer, initialState);

  const useStyles = makeStyles({
    root: {
      maxWidth: 400,
      flexGrow: 1,
    },
  });

  const classes = useStyles();
  const questionCount = data.length;
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <AppDispatch.Provider value={dispatch}>
      <Container>
        <QuestionComponent appState={appState} questionId={activeStep} />

        <MobileStepper
          variant="progress"
          steps={questionCount}
          position="static"
          activeStep={activeStep}
          className={classes.root}
          nextButton={
            <Button size="small" variant="contained" color="primary" onClick={handleNext} disabled={(activeStep + 1) === questionCount}>
              Next <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" variant="contained" color="primary" onClick={handleBack} disabled={activeStep === 0}>
              <KeyboardArrowLeft /> Back
            </Button>
          }
        />
      </Container>
    </AppDispatch.Provider>
  );
}

export default App;
