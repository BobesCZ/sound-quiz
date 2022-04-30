import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import MobileStepper from "@material-ui/core/MobileStepper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchAvailableQuestions from "../../fetch/useFetchAvailableQuestions";
import useCurrentQuiz from "../../hooks/useCurrentQuiz";
import QuestionControl from "./QuestionControl";
import ResultControl from "./ResultControl";

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

const QuestionsPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { quizId, quizObj, questionObj, answerObj } = useCurrentQuiz();
  const questionCount = Object.keys(questionObj || {})?.length;

  useFetchAvailableQuestions(!questionCount, quizId);

  useEffect(() => {
    if (!quizObj) {
      navigate(`/quiz/${quizId}`);
    }
  }, [navigate, quizId, quizObj]);

  const [activeStep, setActiveStep] = useState(0);

  const activeQuestionId = useMemo(
    () => answerObj?.questionArray?.[activeStep],
    [answerObj, activeStep]
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  if (activeStep === questionCount) {
    return <ResultControl />;
  } else if (
    !quizObj ||
    !questionCount ||
    !activeQuestionId ||
    !questionObj?.[activeQuestionId]
  ) {
    return null;
  }

  const showResultText =
    answerObj?.finalScore !== null &&
    !!answerObj?.answerList[activeQuestionId] &&
    answerObj?.answerList[activeQuestionId].isChecked;

  const isQuestionChecked =
    !!answerObj?.answerList.hasOwnProperty(activeQuestionId) &&
    !!answerObj?.answerList[activeQuestionId].isChecked;

  return (
    <>
      <QuestionControl
        questionObject={questionObj[activeQuestionId]}
        questionId={activeQuestionId}
        isQuestionChecked={isQuestionChecked}
      />

      <Box my={3} className={classes.nextButtonWrap}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={!isQuestionChecked}
          endIcon={<KeyboardArrowRight />}
        >
          {showResultText ? "View your results" : "Next question"}
        </Button>
      </Box>

      <AppBar position="fixed" className={classes.bottomBar}>
        <Container maxWidth="sm">
          <Typography
            variant="subtitle2"
            color="textSecondary"
            className={classes.title}
            gutterBottom
          >
            Question {activeStep + 1}/{questionCount}
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
  );
};

export default QuestionsPage;
