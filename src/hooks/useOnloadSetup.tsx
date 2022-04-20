import { useEffect } from "react";
import { availableQuizzesSource } from "../data/quizzes";
import { Action, ActionType, AppState } from "../types/context";
import { loadFromStorage } from "../utils/storage";

/**
 * Setup data on app load
 */
const useOnloadSetup = (
  { availableQuizzes }: AppState,
  dispatch: React.Dispatch<Action>
): void => {
  /**
   * If there are no quizzes in AppState, set data from static file
   */
  useEffect(() => {
    if (!Object.keys(availableQuizzes || []).length) {
      dispatch({
        type: ActionType.SetAvailableQuizzes,
        payload: { availableQuizzesSource },
      });
    }
  }, [availableQuizzes, dispatch]);

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
