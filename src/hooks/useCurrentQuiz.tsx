import { useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../store/AppContext";
import { Quiz } from "../types/types";

interface HookReturn {
  quizId?: string;
  quizObj?: Quiz;
}

/**
 * Get `quizId` from URL and find corrensponding `quizObj`
 */
const useCurrentQuiz = (): HookReturn => {
  const {
    appState: { availableQuizzes },
  } = useContext(AppContext);

  const { id: quizId } = useParams<{ id: string }>();

  if (!quizId) {
    return { quizId: undefined, quizObj: undefined };
  }

  return { quizId, quizObj: availableQuizzes?.[quizId] };
};

export default useCurrentQuiz;
