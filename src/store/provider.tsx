import { useReducer } from "react";
import useOnloadSetup from "../hooks/useOnloadSetup";
import AppContext from "./AppContext";
import initialState from "./initialState";
import reducer from "./reducer";

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [appState, dispatch] = useReducer(reducer, initialState);

  useOnloadSetup(appState, dispatch);

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
