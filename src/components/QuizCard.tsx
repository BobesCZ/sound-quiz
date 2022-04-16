import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import TimerIcon from "@material-ui/icons/Timer";
import { QuizId, Quiz } from "../types/quiz";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  rootCompleted: {
    backgroundColor: green[800],
  },
  title: {
    fontSize: 14,
  },
  infoButton: {
    textTransform: "none",
  },
  conversionButton: {
    marginLeft: "auto",
  },
}));

export default function QuizCard({
  quizId,
  quizObj,
}: {
  quizId: QuizId;
  quizObj: Quiz;
}) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(
        classes.root,
        quizObj.finalScore !== null ? classes.rootCompleted : null
      )}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {quizObj.name}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          {quizObj.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="text"
          className={classes.infoButton}
          startIcon={<TimerIcon />}
        >
          {quizObj.estimatedMinutes} min
        </Button>
        <Button
          variant="text"
          className={classes.infoButton}
          startIcon={<EqualizerIcon />}
        >
          {quizObj.difficulty[0].toUpperCase() + quizObj.difficulty.slice(1)}
        </Button>
        {quizObj.finalScore !== null ? (
          <Button
            variant="text"
            className={clsx(classes.infoButton, classes.conversionButton)}
            startIcon={<CheckIcon />}
            component={RouterLink}
            to={`/quiz/${quizId}`}
          >
            Your score: {quizObj.finalScore}%
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            className={classes.conversionButton}
            component={RouterLink}
            to={`/quiz/${quizId}`}
          >
            Take a quiz
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
