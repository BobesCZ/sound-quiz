import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import clsx from "clsx";
import { Answer, Quiz, QuizId } from "../../types/types";

const useStyles = makeStyles((theme) => ({
  scoreText: {
    textTransform: "none",
    padding: 0,
  },
  quizName: {
    paddingRight: theme.spacing(0.75),
  },
  secondaryAction: {
    paddingRight: theme.spacing(10),
  },
  incompleted: {
    paddingRight: theme.spacing(13),
  },
}));

interface UserQuizItemProps {
  quizId: QuizId;
  quizObj: Quiz;
  finalScore: Answer["finalScore"];
}

const UserQuizItem = ({ quizId, quizObj, finalScore }: UserQuizItemProps) => {
  const classes = useStyles();

  return (
    <ListItem
      key={quizId}
      className={clsx(
        classes.secondaryAction,
        finalScore === null ? classes.incompleted : null
      )}
    >
      <ListItemText
        primary={
          <>
            <Typography component="span" className={classes.quizName}>
              {quizObj.name}
            </Typography>
            <Typography component="span" color="textSecondary">
              ({quizObj.difficulty})
            </Typography>
          </>
        }
      />
      <ListItemSecondaryAction>
        <Button
          variant="text"
          className={classes.scoreText}
          startIcon={finalScore !== null ? <CheckIcon /> : null}
        >
          {finalScore !== null ? `${finalScore}%` : "Incompleted"}
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default UserQuizItem;
