import quizzes from '../data/quizzes';
import QuizCard from './QuizCard';

function QuizListPage(props) {
  return (
    <>
      {Object.keys(quizzes).map((quizId) => (
        <QuizCard quizId={quizId} quizObj={quizzes[quizId]} />
      ))}
    </>
  );
}

export default QuizListPage;
