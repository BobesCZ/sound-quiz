import { Box, CircularProgress } from "@material-ui/core";
import { useContext, useEffect } from "react";
import useAuthentication from "../fetch/useAuthentication";
import useFetchAvailableQuizzes from "../fetch/useFetchAvailableQuizzes";
import AppContext from "../store/context";
import { ActionType } from "../types/context";
import { loadFromStorage } from "../utils/storage";

const Setup = () => {
  useFetchAvailableQuizzes();
  const { loading } = useAuthentication();

  /**
   * Load answers from localStorage
   */
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    const { userAnswers } = loadFromStorage();
    if (!!userAnswers) {
      dispatch({
        type: ActionType.SetUserData,
        payload: { userAnswers },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Box my={10} display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  ) : null;
};

export default Setup;
