import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import AppDispatch from "../../context/AppDispatch";
import useCurrentQuiz from "../../hooks/useCurrentQuiz";
import { ActionType, AppState } from "../../types/context";
import { Question } from "../../types/types";
import {
  QuestionRadioCorrect,
  QuestionRadioWrong,
} from "../elements/QuestionRadio";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    lineHeight: 1.5,
    "&$focused": {
      color: "rgba(255, 255, 255, 0.7)",
    },
  },
  focused: {},
}));

interface QuestionFormProps {
  appState: AppState;
  questionId: number;
  questionObject: Question;
}

const QuestionForm = ({
  appState,
  questionId,
  questionObject,
}: QuestionFormProps) => {
  const classes = useStyles();
  const { dispatch } = useContext(AppDispatch);
  const { quizId, quizObj } = useCurrentQuiz(appState);

  const answer = quizObj?.userAnswers[questionId]?.answer ?? null;
  const isAnswerChecked = !!quizObj?.userAnswers[questionId]?.isChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (answer === null) {
      const answer = { answer: parseInt(event.target.value), isChecked: false };
      dispatch({
        type: ActionType.SetUserAnswer,
        payload: { quizId, questionId, answer },
      });

      setTimeout(() => {
        const answer = {
          answer: parseInt(event.target.value),
          isChecked: true,
        };
        dispatch({
          type: ActionType.SetUserAnswer,
          payload: { quizId, questionId, answer },
        });
      }, 1400);
    }
  };

  const getControl = (id: number) => {
    if (questionObject.correctAnswer === id) {
      return (
        <QuestionRadioCorrect
          waitingAnimation={!isAnswerChecked}
          isCorrect={questionObject.correctAnswer === id}
        />
      );
    } else {
      return (
        <QuestionRadioWrong
          waitingAnimation={!isAnswerChecked}
          isCorrect={questionObject.correctAnswer === id}
        />
      );
    }
  };
  return (
    <>
      <FormControl component="fieldset">
        <FormLabel
          classes={{ root: classes.root, focused: classes.focused }}
          component="legend"
        >
          {questionObject.questionText}
        </FormLabel>
        <RadioGroup
          aria-label="question"
          name="question1"
          value={answer}
          onChange={handleChange}
        >
          {Object.values(questionObject.answers).map(({ id, answerText }) => (
            <FormControlLabel
              key={id}
              value={id}
              control={getControl(id)}
              label={answerText}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default QuestionForm;
