import { ref } from "firebase/database";
import { useContext, useEffect } from "react";
import { useList } from "react-firebase-hooks/database";
import AppContext from "../store/context";
import { ActionType } from "../types/context";
import { Question, QuizId } from "../types/types";
import { firebaseDb } from "./firebase";

/**
 * Fetch data from BE and set it to AppState
 */
const useFetchAvailableQuestions = (
  isEnabled: boolean,
  quizId?: QuizId
): void => {
  const { dispatch } = useContext(AppContext);

  const dbReference =
    isEnabled && quizId
      ? ref(firebaseDb, `availableQuestions/${quizId}`)
      : undefined;
  const [availableQuestionsSource, loading] = useList(dbReference);

  useEffect(() => {
    if (isEnabled && quizId && !loading && availableQuestionsSource?.length) {
      const availableQuestions: Question[] = availableQuestionsSource?.reduce(
        (result: Question[], i) => [...result, i.val()],
        []
      );

      dispatch({
        type: ActionType.SetQuestionsToQuiz,
        payload: { quizId, questions: availableQuestions },
      });
    }
  }, [isEnabled, quizId, loading, availableQuestionsSource, dispatch]);
};

export default useFetchAvailableQuestions;
