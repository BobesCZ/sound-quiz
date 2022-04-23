import { ref } from "firebase/database";
import { useContext, useEffect } from "react";
import { useList } from "react-firebase-hooks/database";
import AppContext from "../store/context";
import { ActionType } from "../types/context";
import { Quizzes } from "../types/types";
import { firebaseDb } from "./firebase";

/**
 * Fetch data from BE and set it to AppState
 */
const useFetchAvailableQuizzes = (): void => {
  const { dispatch } = useContext(AppContext);

  const [availableQuizzesSource, loading] = useList(
    ref(firebaseDb, "availableQuizzes")
  );

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
  }, [loading, availableQuizzesSource, dispatch]);
};

export default useFetchAvailableQuizzes;
