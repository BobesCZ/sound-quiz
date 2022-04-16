import { useParams } from "react-router-dom";
import { AppState } from "../types/context";
import { Quiz } from "../types/types";

interface HookReturn {
  quizId?: string;
  quizObj?: Quiz;
}

/**
 * Get `quizId` from URL and find corrensponding `quizObj`
 */
const useCurrentQuiz = ({ availableQuizzes }: AppState): HookReturn => {
  const { id: quizId } = useParams<{ id: string }>();

  if (!quizId) {
    return { quizId: undefined, quizObj: undefined };
  }

  return { quizId, quizObj: availableQuizzes?.[quizId] };
};

export default useCurrentQuiz;
