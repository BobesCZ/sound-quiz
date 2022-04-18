import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import TimerIcon from "@material-ui/icons/Timer";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import clsx from "clsx";
import { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useCurrentQuiz from "../../hooks/useCurrentQuiz";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
  },
  infoRow: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  scoreTextColor: {
    color: theme.palette.primary.main,
    fill: theme.palette.primary.main,
  },
  infoText: {
    marginRight: theme.spacing(1),
  },
  infoIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  instructionBox: {
    marginBottom: theme.spacing(1),
  },
  buttonRow: {
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
}));

const QuizDetailPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { quizId, quizObj } = useCurrentQuiz();

  useEffect(() => {
    if (!quizObj) {
      navigate("/");
    }
  }, [quizObj, navigate]);

  if (quizObj === undefined) {
    return null;
  }

  const {
    name,
    questionsCount,
    estimatedMinutes,
    difficulty,
    description,
    finalScore,
  } = quizObj;

  return (
    <Box my={2}>
      <Typography variant="h5" component="h2" className={classes.title}>
        {name}
      </Typography>

      <Box my={1} className={classes.infoRow}>
        <FormatListBulletedIcon className={classes.infoIcon} fontSize="small" />

        <Typography className={classes.infoText} color="textSecondary">
          Number of questions:
        </Typography>

        {questionsCount}
      </Box>

      <Box my={1} className={classes.infoRow}>
        <TimerIcon className={classes.infoIcon} fontSize="small" />
        <Typography className={classes.infoText} color="textSecondary">
          Estimated time:
        </Typography>
        {estimatedMinutes} min
      </Box>

      <Box my={1} className={classes.infoRow}>
        <EqualizerIcon className={classes.infoIcon} fontSize="small" />

        <Typography className={classes.infoText} color="textSecondary">
          Difficulty:
        </Typography>

        {difficulty}
      </Box>

      <Box mt={3} mb={1}>
        <Typography>{description}</Typography>
      </Box>

      {finalScore !== null && (
        <Box my={1} className={clsx(classes.infoRow, classes.scoreTextColor)}>
          <EqualizerIcon
            className={clsx(classes.infoIcon, classes.scoreTextColor)}
            fontSize="small"
          />
          <Typography
            className={clsx(classes.infoText, classes.scoreTextColor)}
          >
            Your result:
          </Typography>
          {finalScore}%
        </Box>
      )}

      <Divider className={classes.divider} />

      {finalScore !== null ? (
        <Box my={3}>
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            variant="outlined"
            severity="success"
          >
            <AlertTitle>Quiz completed</AlertTitle>
            You have already taken this quiz with <strong>
              {finalScore}%
            </strong>{" "}
            success. Unfortunately it's not possible to repeat the quiz at the
            moment.
          </Alert>
        </Box>
      ) : (
        <>
          <Typography variant="h6" className={classes.title}>
            Instructions
          </Typography>

          <Typography className={classes.instructionBox}>
            1. Click Play button to play a short (10s) snippet of a song. You
            can play it unlimited times.
          </Typography>

          <Typography className={classes.instructionBox}>
            2. Choose the most suitable answer. You'll instantly see if your
            answer is correct.
          </Typography>

          <Typography className={classes.instructionBox}>
            3. Continue to next question until you reach the end.
          </Typography>

          <Box my={3}>
            <Alert
              icon={<VolumeUpIcon fontSize="inherit" />}
              variant="outlined"
              severity="info"
            >
              <AlertTitle>Turn on the sound</AlertTitle>
              You need to use your headphones (or audio speakers) to complete
              the quiz!
            </Alert>
          </Box>
        </>
      )}

      <Box className={classes.buttonRow}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to={`/quiz/${quizId}/questions`}
        >
          {finalScore !== null ? "View your answers" : "Start a quiz"}
        </Button>
      </Box>
    </Box>
  );
};

export default QuizDetailPage;
