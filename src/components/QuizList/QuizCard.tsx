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
import { QuizId, Quiz } from "../../types/quiz";

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

interface QuizCardProps {
  quizId: QuizId;
  quizObj: Quiz;
}

const QuizCard = ({
  quizId,
  quizObj: { finalScore, name, description, estimatedMinutes, difficulty },
}: QuizCardProps) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(
        classes.root,
        finalScore !== null && classes.rootCompleted
      )}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {name}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="text"
          className={classes.infoButton}
          startIcon={<TimerIcon />}
        >
          {estimatedMinutes} min
        </Button>
        <Button
          variant="text"
          className={classes.infoButton}
          startIcon={<EqualizerIcon />}
        >
          {difficulty[0].toUpperCase() + difficulty.slice(1)}
        </Button>
        {finalScore !== null ? (
          <Button
            variant="text"
            className={clsx(classes.infoButton, classes.conversionButton)}
            startIcon={<CheckIcon />}
            component={RouterLink}
            to={`/quiz/${quizId}`}
          >
            Your score: {finalScore}%
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
};

export default QuizCard;
