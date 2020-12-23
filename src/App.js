import { useReducer, useState } from 'react';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import MobileStepper from '@material-ui/core/MobileStepper';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { ThemeProvider } from '@material-ui/styles';
import QuestionComponent from './components/QuestionComponent';
import ResultComponent from './components/ResultComponent';
import AppDispatch from './context/AppDispatch';
import initialState from './context/initialState';
import reducer from './context/reducer';
import data from './data/data';

function App() {
  const [appState, dispatch] = useReducer(reducer, initialState);

  const theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: orange[800],
      },
    }
  });

  const useStyles = makeStyles({
    root: {
      maxWidth: 400,
      flexGrow: 1,
      marginTop: 32,
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

  const isStepChecked = () => {
    return (appState.userAnswers.hasOwnProperty(activeStep) && appState.userAnswers[activeStep].isChecked);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppDispatch.Provider value={dispatch}>
        <Container maxWidth="sm">
          {activeStep === questionCount
            ? <ResultComponent appState={appState} questionCount={questionCount} />
            : <>
              <QuestionComponent appState={appState} questionId={activeStep} />

              <MobileStepper
                variant="progress"
                steps={questionCount}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton={
                  <Button size="small" variant="contained" color="primary" onClick={handleNext} disabled={!isStepChecked()}>
                    Next <KeyboardArrowRight />
                  </Button>
                }
                backButton={
                  <Button size="small" variant="contained" color="primary" onClick={handleBack} disabled={activeStep === 0}>
                    <KeyboardArrowLeft /> Back
              </Button>
                }
              />
            </>
          }
        </Container>
      </AppDispatch.Provider>
    </ThemeProvider>
  );
}

export default App;
