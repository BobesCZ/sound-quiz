import { useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../store/context";
import { Answer, Questions, Quiz } from "../types/types";

interface HookReturn {
  quizId?: string;
  quizObj?: Quiz;
  questionObj?: Questions;
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
      questionObj: undefined,
      answerObj: undefined,
    };
  }

  return {
    quizId,
    quizObj: availableQuizzes?.[quizId],
    questionObj: availableQuestions?.[quizId],
    answerObj: userAnswers?.[quizId],
  };
};

export default useCurrentQuiz;
