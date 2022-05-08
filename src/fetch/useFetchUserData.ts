import { ref } from "firebase/database";
import { useContext, useEffect } from "react";
import { useList } from "react-firebase-hooks/database";
import AppContext from "../store/context";
import { ActionType } from "../types/context";
import { AnswerList } from "../types/types";
import { resolveFetchedData } from "../utils/utils";
import { firebaseAuth, firebaseDb } from "./firebase";

const getUserAnswersReference = () => {
  const userId = firebaseAuth.currentUser?.uid;
  const dbPath = userId ? `users/${userId}/userAnswers/` : undefined;
  return dbPath ? ref(firebaseDb, `${dbPath}`) : undefined;
};

/**
 * Fetch data from BE (all entered user answers) and set it to AppState
 */
const useFetchUserAnswers = (): void => {
  const { dispatch } = useContext(AppContext);

  const dbReference = getUserAnswersReference();
  const [userAnswersSource, loading] = useList(dbReference);

  useEffect(() => {
    if (!loading && userAnswersSource?.length) {
      const userAnswers = resolveFetchedData<AnswerList>(userAnswersSource);

      dispatch({
        type: ActionType.SetUserData,
        payload: { userAnswers },
      });
    }
  }, [loading, userAnswersSource, dispatch]);
};

export default useFetchUserAnswers;
