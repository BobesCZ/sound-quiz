import { useContext } from "react";
import AppContext from "../../store/context";
import QuizCard from "./QuizCard";

const QuizListPage = () => {
  const {
    appState: { availableQuizzes, userAnswers },
  } = useContext(AppContext);

  return availableQuizzes ? (
    <>
      {Object.entries(availableQuizzes).map(([quizId, quizObj]) => (
        <QuizCard
          key={quizId}
          quizId={quizId}
          quizObj={quizObj}
          finalScore={userAnswers?.[quizId]?.finalScore ?? null}
        />
      ))}
    </>
  ) : null;
};

export default QuizListPage;
