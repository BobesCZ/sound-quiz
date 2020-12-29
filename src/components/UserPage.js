import { useContext } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Alert from '@material-ui/lab/Alert';
import AppDispatch from '../context/AppDispatch';
import UserQuizList from './UserQuizList';

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(2, 0),
  },
  buttonRow: {
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
}));

function UserPage(props) {
  const quizzes = props.appState.availableQuizzes;
  const completedQuizzes = [];
  const incompletedQuizzes = [];
  const classes = useStyles();

  Object.keys(quizzes).forEach(key => {
    const quiz = quizzes[key];
    if (quiz.finalScore !== null) {
      completedQuizzes.push(quiz);
    }
    else if (quiz.userAnswers.length) {
      incompletedQuizzes.push(quiz);
    }
  })
  const dispatch = useContext(AppDispatch);

  const handleDeleteClick = () => {
    dispatch({ type: 'RESET_AVAILABLE_QUIZZES', payload: {} });
  };

  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        Your quizzes
      </Typography>

      {(completedQuizzes.length || incompletedQuizzes.length)
        ? <>
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
        : <Alert variant="outlined" severity="info">
          There you would see your results of completed quizzes... if you had any!
        </Alert>
      }
    </div>
  );
}

export default UserPage;
