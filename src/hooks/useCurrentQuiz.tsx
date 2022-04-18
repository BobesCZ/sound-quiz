import { useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../store/context";
import { Question, Quiz } from "../types/types";

interface HookReturn {
  quizId?: string;
  quizObj?: Quiz;
  questionsArray?: Question[];
}

/**
 * Get `quizId` from URL and find corrensponding `quizObj`
 */
const useCurrentQuiz = (): HookReturn => {
  const {
    appState: { availableQuizzes, userQuestions },
  } = useContext(AppContext);

  const { id: quizId } = useParams<{ id: string }>();

  if (!quizId) {
    return { quizId: undefined, quizObj: undefined, questionsArray: undefined };
  }

  return {
    quizId,
    quizObj: availableQuizzes?.[quizId],
    questionsArray: userQuestions?.[quizId],
  };
};

export default useCurrentQuiz;
