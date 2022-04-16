import { Link as RouterLink } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ResultGraph from "./ResultGraph";
import { AppState } from "../../types/context";
import useCurrentQuiz from "../../hooks/useCurrentQuiz";

const useStyles = makeStyles((theme) => ({
  text: {
    textAlign: "center",
  },
}));

interface ResultControlProps {
  appState: AppState;
}

const ResultControl = ({ appState }: ResultControlProps) => {
  const classes = useStyles();
  const { quizObj } = useCurrentQuiz(appState);

  const score = quizObj?.finalScore ?? 0;
  const scoreLevel =
    score >= 90 ? "excellent" : score >= 60 ? "good" : "nevermind";

  const titleTextObj = {
    excellent: "Excellent result",
    good: "Good job",
    nevermind: "Nevermind",
  };
  const paragraphTextObj = {
    excellent: "Wow, you have to be a real expert in this genre!",
    good: "It seems that you feel comfortable with this kind of music!",
    nevermind: "This isn't your favourite cup of music anyway, right?",
  };

  return (
    <Box
      my={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <ResultGraph score={score} />

      <Typography variant="h6" className={classes.text} gutterBottom>
        {titleTextObj[scoreLevel]}
      </Typography>

      <Typography variant="subtitle1" className={classes.text} gutterBottom>
        {paragraphTextObj[scoreLevel]}
      </Typography>

      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to="/"
        >
          Choose another quiz
        </Button>
      </Box>
    </Box>
  );
};

export default ResultControl;
