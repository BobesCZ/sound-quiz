import QuizCard from "./QuizCard";
import { AppState } from "../../types/appState";

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
