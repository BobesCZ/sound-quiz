import { useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../store/context";
import { Answer, Question, Quiz } from "../types/types";

interface HookReturn {
  quizId?: string;
  quizObj?: Quiz;
  questionsArray?: Question[];
  answerObj?: Answer;
}

/**
 * Get `quizId` from URL and find corrensponding `quizObj`
 */
const useCurrentQuiz = (): HookReturn => {
  const {
    appState: { availableQuizzes, availableQuestions, userAnswers },
  } = useContext(AppContext);

  const { id: quizId } = useParams<{ id: string }>();

  if (!quizId) {
    return {
      quizId: undefined,
      quizObj: undefined,
      questionsArray: undefined,
      answerObj: undefined,
    };
  }

  return {
    quizId,
    quizObj: availableQuizzes?.[quizId],
    questionsArray: availableQuestions?.[quizId],
    answerObj: userAnswers?.[quizId],
  };
};

export default useCurrentQuiz;
