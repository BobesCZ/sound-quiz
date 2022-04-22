import { useReducer } from "react";
import useOnloadSetup from "../hooks/useOnloadSetup";
import { AppState } from "../types/context";
import AppContext from "./context";
import reducer from "./reducer";

const initialState: AppState = {};

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [appState, dispatch] = useReducer(reducer, initialState);

  useOnloadSetup(dispatch);

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
