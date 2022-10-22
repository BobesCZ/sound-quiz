import { ref } from "firebase/database";
import { useContext, useEffect } from "react";
import { useList } from "react-firebase-hooks/database";
import AppContext from "../store/context";
import { ActionType } from "../types/context";
import { AnswerList, UserData } from "../types/types";
import { resolveFetchedData } from "../utils/utils";
import { firebaseAuth, firebaseDb } from "./firebase";

const getUserAnswersReference = () => {
  const userId = firebaseAuth.currentUser?.uid;
  const dbPath = userId ? `users/${userId}/userAnswers/` : undefined;
  return dbPath ? ref(firebaseDb, `${dbPath}`) : undefined;
};

const getUserDataReference = () => {
  const userId = firebaseAuth.currentUser?.uid;
  const dbPath = userId ? `users/${userId}/userData/` : undefined;
  return dbPath ? ref(firebaseDb, `${dbPath}`) : undefined;
};

/**
 * Fetch data from BE (all entered user answers) and set it to AppState
 */
const useFetchUserAnswers = (): void => {
  const { dispatch } = useContext(AppContext);

  const dbReference = getUserAnswersReference();
  const dbDataReference = getUserDataReference();
  const [userAnswersSource, loading] = useList(dbReference);
  const [userDataSource, dataLoading] = useList(dbDataReference);

  useEffect(() => {
    if (
      !loading &&
      !dataLoading &&
      userAnswersSource?.length &&
      userDataSource?.length
    ) {
      const userAnswers = resolveFetchedData<AnswerList>(userAnswersSource);
      const userData = resolveFetchedData<UserData>(userDataSource);

      dispatch({
        type: ActionType.SetUserData,
        payload: { userAnswers, userData },
      });
    }
  }, [loading, dataLoading, userAnswersSource, userDataSource, dispatch]);
};

export default useFetchUserAnswers;
