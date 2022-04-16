import { useEffect } from "react";
import quizzes from "../data/quizzes";
import { loadFromStorage } from "../utils/storage";
import { Action, ActionType } from "../types/action";
import { AppState } from "../types/appState";

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
      dispatch({ type: ActionType.SetAvailableQuizzes, payload: { quizzes } });
    }
  }, [availableQuizzes, dispatch]);

  /**
   * Load answers from localStorage
   */
  useEffect(() => {
    const loadedUserAnswers = loadFromStorage();
    if (loadedUserAnswers) {
      dispatch({
        type: ActionType.SetLoadedAnswers,
        payload: { loadedUserAnswers },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useOnloadSetup;
