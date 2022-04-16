import { AppState } from "../../types/context";
import QuizCard from "./QuizCard";

interface QuizListPageProps {
  appState: AppState;
}

const QuizListPage = ({ appState }: QuizListPageProps) => {
  const { availableQuizzes } = appState;

  return availableQuizzes ? (
    <>
      {Object.entries(availableQuizzes).map(([quizId, quizObj]) => (
        <QuizCard key={quizId} quizId={quizId} quizObj={quizObj} />
      ))}
    </>
  ) : null;
};

export default QuizListPage;
