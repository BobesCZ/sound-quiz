import { ref } from "firebase/database";
import { useContext, useEffect } from "react";
import { useList } from "react-firebase-hooks/database";
import AppContext from "../store/context";
import { ActionType } from "../types/context";
import { QuizzesSource } from "../types/types";
import { resolveFetchedData } from "../utils/utils";
import { firebaseDb } from "./firebase";

/**
 * Fetch data from BE (all availableQuizzes) and set it to AppState
 */
const useFetchAvailableQuizzes = (): void => {
  const { dispatch } = useContext(AppContext);

  const [availableQuizzesSource, loading] = useList(
    ref(firebaseDb, "availableQuizzes")
  );

  useEffect(() => {
    if (!loading && availableQuizzesSource?.length) {
      const availableQuizzes = resolveFetchedData<QuizzesSource>(
        availableQuizzesSource
      );

      dispatch({
        type: ActionType.SetAvailableQuizzes,
        payload: { availableQuizzes },
      });
    }
  }, [loading, availableQuizzesSource, dispatch]);
};

export default useFetchAvailableQuizzes;
