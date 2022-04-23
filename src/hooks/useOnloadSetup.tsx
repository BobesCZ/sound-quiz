import { useEffect } from "react";
import useFetchAvailableQuizzes from "../fetch/useFetchAvailableQuizzes";
import { Action, ActionType } from "../types/context";
import { loadFromStorage } from "../utils/storage";

/**
 * Setup data on app load
 */
const useOnloadSetup = (dispatch: React.Dispatch<Action>): void => {
  useFetchAvailableQuizzes();

  /**
   * Load answers from localStorage
   */
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
};

export default useOnloadSetup;
