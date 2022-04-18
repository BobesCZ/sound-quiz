import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Alert from "@material-ui/lab/Alert";
import { useContext } from "react";
import AppContext from "../../store/context";
import { ActionType } from "../../types/context";
import { filterUserQuizzes } from "../../utils/utils";
import UserQuizList from "./UserQuizList";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(2, 0),
  },
  buttonRow: {
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
}));

const UserPage = () => {
  const classes = useStyles();
  const {
    appState: { availableQuizzes },
    dispatch,
  } = useContext(AppContext);

  const { completedQuizzes, incompletedQuizzes } =
    filterUserQuizzes(availableQuizzes);

  const handleDeleteClick = () => {
    dispatch({ type: ActionType.ResetAvailableQuizzes, payload: {} });
  };

  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        Your quizzes
      </Typography>

      {completedQuizzes.length || incompletedQuizzes.length ? (
        <>
          <UserQuizList quizzes={completedQuizzes} />
          <UserQuizList quizzes={incompletedQuizzes} />

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
