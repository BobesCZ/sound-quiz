import { useContext, useEffect } from "react";
import useFetchAvailableQuizzes from "../fetch/useFetchAvailableQuizzes";
import AppContext from "../store/context";
import { ActionType } from "../types/context";
import { loadFromStorage } from "../utils/storage";

const Setup = () => {
  useFetchAvailableQuizzes();

  /**
   * Load answers from localStorage
   */
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    const { userQuestions, userAnswers } = loadFromStorage();
    if (!!userQuestions || !!userAnswers) {
      dispatch({
        type: ActionType.SetUserData,
        payload: { userQuestions, userAnswers },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Setup;
