import { Box, CircularProgress } from "@material-ui/core";
import useAuthentication from "../fetch/useAuthentication";
import useFetchAvailableQuizzes from "../fetch/useFetchAvailableQuizzes";
import useFetchUserAnswers from "../fetch/useFetchUserAnswers";

const Setup = () => {
  const { loading } = useAuthentication();

  /**
   * Load all availableQuizzes
   */
  useFetchAvailableQuizzes();

  /**
   * Load user answers
   */
  useFetchUserAnswers();

  return loading ? (
    <Box my={10} display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  ) : null;
};

export default Setup;
