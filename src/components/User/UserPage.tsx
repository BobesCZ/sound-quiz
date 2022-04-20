import { List } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Alert from "@material-ui/lab/Alert";
import { useContext } from "react";
import AppContext from "../../store/context";
import { ActionType } from "../../types/context";
import UserQuizItem from "./UserQuizItem";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(2, 0),
  },
  buttonRow: {
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const UserPage = () => {
  const classes = useStyles();
  const {
    appState: { availableQuizzes, userAnswers, userQuestions },
    dispatch,
  } = useContext(AppContext);

  const handleDeleteClick = () => {
    dispatch({ type: ActionType.DeleteUserData, payload: {} });
  };

  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        Your quizzes
      </Typography>

      {!!Object.keys(userQuestions || {}).length ? (
        <>
          <List className={classes.list}>
            {Object.entries(availableQuizzes || {}).map(([quizId, quizObj]) => {
              const hasQuestions = !!userQuestions?.[quizId];
              const finalScore = userAnswers?.[quizId]?.finalScore ?? null;

              return hasQuestions ? (
                <UserQuizItem
                  key={quizId}
                  quizId={quizId}
                  quizObj={quizObj}
                  finalScore={finalScore}
                />
              ) : null;
            })}
          </List>

          <Box className={classes.buttonRow}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<DeleteOutlineIcon />}
              onClick={handleDeleteClick}
            >
              Delete all quizzes
            </Button>
          </Box>
        </>
      ) : (
        <Alert variant="outlined" severity="info">
          There you would see your results of completed quizzes... if you had
          any!
        </Alert>
      )}
    </div>
  );
};

export default UserPage;
