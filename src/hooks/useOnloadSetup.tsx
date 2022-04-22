import { ref } from "firebase/database";
import { useEffect } from "react";
import { useList } from "react-firebase-hooks/database";
import { Action, ActionType } from "../types/context";
import { Quizzes } from "../types/types";
import { firebaseDb } from "../utils/firebase";
import { loadFromStorage } from "../utils/storage";

/**
 * Setup data on app load
 */
const useOnloadSetup = (dispatch: React.Dispatch<Action>): void => {
  const [availableQuizzesSource, loading] = useList(
    ref(firebaseDb, "availableQuizzes")
  );

  /**
   * If there are no quizzes in AppState, set data from BE
   */
  useEffect(() => {
    if (!loading && availableQuizzesSource?.length) {
      const availableQuizzes = availableQuizzesSource?.reduce(
        (result: Quizzes, i) => ({
          ...result,
          [i.key as string]: i.val(),
        }),
        {}
      );
      dispatch({
        type: ActionType.SetAvailableQuizzes,
        payload: { availableQuizzes },
      });
    }
  }, [dispatch, availableQuizzesSource, loading]);

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
