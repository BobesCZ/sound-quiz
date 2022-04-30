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
    const { userAnswers } = loadFromStorage();
    if (!!userAnswers) {
      dispatch({
        type: ActionType.SetUserData,
        payload: { userAnswers },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Setup;
