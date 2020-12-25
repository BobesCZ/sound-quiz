import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TimerIcon from '@material-ui/icons/Timer';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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

function QuizCard(props) {
  // const quizId = props.quizId;
  const quizObj = props.quizObj;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Sound quiz: {quizObj.name}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          Can you guess music genre only by listening a short demonstration?
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
          {quizObj.difficulty}
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.conversionButton}
        >
          Take a quiz
        </Button>
      </CardActions>
    </Card>
  );
}

export default QuizCard;
