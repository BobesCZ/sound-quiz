import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth, loginUser } from "./firebase";

/**
 * Authenticate user
 */
const useAuthentication = (): { loading: boolean } => {
  const [, loading] = useAuthState(firebaseAuth);

  useEffect(() => {
    loginUser();
  }, []);

  return { loading };
};

export default useAuthentication;
