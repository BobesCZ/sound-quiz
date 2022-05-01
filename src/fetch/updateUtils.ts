import { ref, set, update } from "firebase/database";
import { Answer, AnswerDetail, QuizId } from "../types/types";
import { firebaseAuth, firebaseDb } from "./firebase";

const getUserAnswersReference = (quizId: QuizId) => {
  const userId = firebaseAuth.currentUser?.uid;
  const dbPath =
    userId && quizId ? `users/${userId}/userAnswers/${quizId}` : undefined;
  return dbPath ? ref(firebaseDb, `${dbPath}`) : undefined;
};

/**
 * Save whole `answer` object
 */
const saveQuestionsToQuiz = (quizId: QuizId, answer: Partial<Answer>): void => {
  const dbReference = getUserAnswersReference(quizId);

  if (dbReference) {
    set(dbReference, answer);
  }
};

/**
 * Save answer for only 1 specific question
 */
const saveUserAnswer = (
  quizId: QuizId,
  questionId: string,
  { isChecked, enteredAnswerId }: AnswerDetail,
  finalScore: Answer["finalScore"]
): void => {
  const dbReference = getUserAnswersReference(quizId);

  if (questionId && dbReference) {
    update(dbReference, {
      [`/answerList/${questionId}/isChecked`]: isChecked,
      [`/answerList/${questionId}/enteredAnswerId`]: enteredAnswerId,
      finalScore,
    });
  }
};

export { saveQuestionsToQuiz, saveUserAnswer };
