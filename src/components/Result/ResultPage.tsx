import { useContext, useEffect } from "react";
import useCurrentQuiz from "../../hooks/useCurrentQuiz";
import AppContext from "../../store/context";
import { ActionType } from "../../types/context";
import ResultControl from "./ResultControl";
import ResultForm from "./ResultForm";

const ResultPage = () => {
  const {
    dispatch,
    appState: { userData },
  } = useContext(AppContext);
  const { quizId, answerObj } = useCurrentQuiz();

  const finalScore = answerObj?.finalScore ?? -1;
  const nickName = userData?.nickName;

  useEffect(() => {
    if (finalScore === -1 && quizId) {
      dispatch({
        type: ActionType.SetFinalScore,
        payload: { quizId },
      });
    }
  }, [dispatch, finalScore, quizId]);

  return finalScore >= 0 && nickName ? <ResultControl /> : <ResultForm />;
};

export default ResultPage;
