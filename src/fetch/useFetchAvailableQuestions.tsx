import { ref } from "firebase/database";
import { useContext, useEffect } from "react";
import { useList } from "react-firebase-hooks/database";
import AppContext from "../store/context";
import { ActionType } from "../types/context";
import { Questions, QuizId } from "../types/types";
import { firebaseDb } from "./firebase";

/**
 * Fetch data from BE (questions for 1 specific quiz only) and set it to AppState
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
  const [questionsSource, loading] = useList(dbReference);

  useEffect(() => {
    if (isEnabled && quizId && !loading && questionsSource?.length) {
      const questions = questionsSource?.reduce(
        (result: Questions, i) => ({
          ...result,
          [i.key as string]: i.val(),
        }),
        {}
      );

      dispatch({
        type: ActionType.SetQuestionsToQuiz,
        payload: { quizId, questions },
      });
    }
  }, [isEnabled, quizId, loading, questionsSource, dispatch]);
};

export default useFetchAvailableQuestions;
