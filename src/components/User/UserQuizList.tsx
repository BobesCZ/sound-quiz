import clsx from "clsx";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import { Quiz } from "../../types/quiz";

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.paper,
  },
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

interface UserQuizListProps {
  quizzes: Quiz[];
}

const UserQuizList = ({ quizzes }: UserQuizListProps) => {
  const classes = useStyles();

  return !!quizzes.length ? (
    <List className={classes.list}>
      {quizzes.map((quiz, index) => (
        <ListItem
          key={index}
          className={clsx(
            classes.secondaryAction,
            quiz.finalScore === null ? classes.incompleted : null
          )}
        >
          <ListItemText
            primary={
              <>
                <Typography component="span" className={classes.quizName}>
                  {quiz.name}
                </Typography>
                <Typography component="span" color="textSecondary">
                  ({quiz.difficulty})
                </Typography>
              </>
            }
          />
          <ListItemSecondaryAction>
            <Button
              variant="text"
              className={classes.scoreText}
              startIcon={quiz.finalScore !== null ? <CheckIcon /> : null}
            >
              {quiz.finalScore !== null ? `${quiz.finalScore}%` : "Incompleted"}
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  ) : null;
};

export default UserQuizList;
