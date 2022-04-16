import QuizCard from "./QuizCard";
import { AppState } from "../types/appState";
import { QuizId } from "../types/quiz";

const QuizListPage = ({ appState }: { appState: AppState }) => {
  const { availableQuizzes } = appState;

  if (!availableQuizzes) {
    return null;
  }

  return (
    <>
      {Object.keys(availableQuizzes).map((quizId: QuizId) => (
        <QuizCard
          key={quizId}
          quizId={quizId}
          quizObj={availableQuizzes[quizId]}
        />
      ))}
    </>
  );
};

export default QuizListPage;
