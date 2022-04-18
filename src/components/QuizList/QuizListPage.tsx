import { useContext } from "react";
import AppContext from "../../store/context";
import QuizCard from "./QuizCard";

const QuizListPage = () => {
  const {
    appState: { availableQuizzes },
  } = useContext(AppContext);

  return availableQuizzes ? (
    <>
      {Object.entries(availableQuizzes).map(([quizId, quizObj]) => (
        <QuizCard key={quizId} quizId={quizId} quizObj={quizObj} />
      ))}
    </>
  ) : null;
};

export default QuizListPage;
