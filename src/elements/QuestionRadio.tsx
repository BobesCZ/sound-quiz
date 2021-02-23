import { green, grey, red } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import { QuestionRadioProps } from '../types/elements';

const stylesCorrect = {
  "@keyframes pulseGreen": {
    "0%": {
      transform: "rotate3d(1, 1, 1, 0deg) scale(1)"
    },
    "70%": {
      transform: "rotate3d(0.3, 0.3, 0.3, 540deg) scale(0.2)",
      boxShadow: `0 0 0 0 ${green[500]}`,
      backgroundColor: "transparent"
    },
    "80%": {
      transform: "rotate3d(1, 1, 1, 0deg) scale(1.0)",
      backgroundColor: green[200]
    },
    "90%": {
      transform: "rotate3d(1, 1, 1, 0deg) scale(1.2)"
    },
    "100%": {
      transform: "rotate3d(1, 1, 1, 0deg) scale(1)",
      boxShadow: "0 0 15px 5px transparent",
      backgroundColor: "transparent"
    }
  },
  root: {
    color: (props: QuestionRadioProps) =>
      (!props.waitingAnimation && props.isCorrect)
        ? green[500]
        : grey[500]
  },
  checked: {
    color: (props: QuestionRadioProps) =>
      props.waitingAnimation
        ? grey[500]
        : props.isCorrect
          ? green[500]
          : red[500],
    animation: "$pulseGreen ease-in",
    animationDuration: (props: QuestionRadioProps) =>
      props.waitingAnimation
        ? "1.5s"
        : "0",
  },
};

const stylesWrong = {
  "@keyframes pulseRed": {
    "0%": {
      transform: "rotate3d(1, 1, 1, 0deg) scale(1)"
    },
    "70%": {
      transform: "rotate3d(0.3, 0.3, 0.3, 540deg) scale(0.2)",
      boxShadow: `0 0 0 0 ${red[500]}`,
      backgroundColor: "transparent"
    },
    "80%": {
      transform: "rotate3d(1, 1, 1, 0deg) scale(1.0)",
      backgroundColor: red[200]
    },
    "90%": {
      transform: "rotate3d(1, 1, 1, 0deg) scale(1.2)"
    },
    "100%": {
      transform: "rotate3d(1, 1, 1, 0deg) scale(1)",
      boxShadow: "0 0 15px 5px transparent",
      backgroundColor: "transparent"
    }
  },
  root: {
    color: grey[500],
  },
  checked: {
    color: (props: QuestionRadioProps) =>
      props.waitingAnimation
        ? grey[500]
        : props.isCorrect
          ? green[500]
          : red[500],
    animation: "$pulseRed ease-in",
    animationDuration: (props: QuestionRadioProps) =>
      props.waitingAnimation
        ? "1.5s"
        : "0",
  },
};

function QuestionRadio(props: QuestionRadioProps) {
  const { waitingAnimation, isCorrect, ...other } = props;
  return <Radio color="default" {...other} />
}

const QuestionRadioCorrect = withStyles(stylesCorrect)(QuestionRadio);
const QuestionRadioWrong = withStyles(stylesWrong)(QuestionRadio);

export { QuestionRadioCorrect, QuestionRadioWrong };