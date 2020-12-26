import { Link as RouterLink, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import TimerIcon from '@material-ui/icons/Timer';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
  },
  infoRow: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
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

function QuizDetailPage(props) {
  const classes = useStyles();

  const { id: quizId } = useParams();
  const quizObj = props.appState.availableQuizzes[quizId];

  if (quizObj === undefined) {
    return null;
  }

  return (
    <Box my={2}>
      <Typography variant="h5" component="h2" className={classes.title}>
        Sound quiz: {quizObj.name}
      </Typography>

      <Box my={1} className={classes.infoRow}>
        <FormatListBulletedIcon className={classes.infoIcon} fontSize="small" />

        <Typography className={classes.infoText} color="textSecondary">
          Number of questions:
        </Typography>

        {quizObj.questionsCount}
      </Box>

      <Box my={1} className={classes.infoRow}>
        <TimerIcon className={classes.infoIcon} fontSize="small" />

        <Typography className={classes.infoText} color="textSecondary">
          Estimated time:
        </Typography>

        {quizObj.estimatedMinutes} min
      </Box>

      <Box my={1} className={classes.infoRow}>
        <EqualizerIcon className={classes.infoIcon} fontSize="small" />

        <Typography className={classes.infoText} color="textSecondary">
          Difficulty:
        </Typography>

        {quizObj.difficulty}
      </Box>

      <Divider className={classes.divider} />

      <Typography variant="h6" className={classes.title}>
        Instructions
      </Typography>

      <Typography className={classes.instructionBox}>
        1. Click Play button to play a short (10s) snippet of a song. You can play it unlimited times.
      </Typography>

      <Typography className={classes.instructionBox}>
        2. Choose the most suitable answer. You'll instantly see if your answer is correct.
      </Typography>

      <Typography className={classes.instructionBox}>
        3. Continue to next question until you reach the end.
      </Typography>

      <Divider className={classes.divider} />

      <Alert icon={<VolumeUpIcon fontSize="inherit" />} variant="outlined" severity="info">
        <AlertTitle>Turn on the sound</AlertTitle>
        You need to use your headphones (or audio speakers) to complete the quiz!
      </Alert>

      <Box className={classes.buttonRow}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to={`/quiz/${quizId}/questions`}
        >
          Start a quiz
      </Button>
      </Box>
    </Box >
  );
}

export default QuizDetailPage;
