import { TextField, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { FormEvent, useContext, useState } from "react";
import useCurrentQuiz from "../../hooks/useCurrentQuiz";
import AppContext from "../../store/context";
import { ActionType } from "../../types/context";

const useStyles = makeStyles((theme) => ({
  subheader: {
    marginBottom: theme.spacing(3),
  },
  textfield: {
    width: "100%",
  },
}));

const ResultForm = () => {
  const classes = useStyles();
  const { dispatch } = useContext(AppContext);
  const { quizId } = useCurrentQuiz();
  const [nickName, setNickName] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!!nickName) {
      dispatch({
        type: ActionType.SetFinalScore,
        payload: { quizId, nickName },
      });
    }
  };

  return (
    <Box
      my={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Please enter your nickname to see the result
        </Typography>
        <Typography
          variant="body2"
          className={classes.subheader}
          color="textSecondary"
        >
          Only author of this page will see it
        </Typography>
        <TextField
          className={classes.textfield}
          label="Nickname"
          variant="outlined"
          onChange={handleChange}
          onSubmit={handleChange}
          value={nickName}
        />
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={!nickName}
          >
            View your results
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ResultForm;
