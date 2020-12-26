import QuizCard from './QuizCard';

function QuizListPage(props) {
  const availableQuizzes = props.appState.availableQuizzes;

  return (
    <>
      {Object.keys(availableQuizzes).map((quizId) => (
        <QuizCard key={quizId} quizId={quizId} quizObj={availableQuizzes[quizId]} />
      ))}
    </>
  );
}

export default QuizListPage;
