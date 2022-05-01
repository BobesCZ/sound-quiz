import { signInAnonymously } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "./firebase";

/**
 * Authenticate user
 */
const useAuthentication = (): { loading: boolean } => {
  const [, loading] = useAuthState(firebaseAuth);

  useEffect(() => {
    signInAnonymously(firebaseAuth);
  }, []);

  return { loading };
};

export default useAuthentication;
