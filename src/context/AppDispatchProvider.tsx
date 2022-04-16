import { useReducer } from "react";
import AppDispatch from "./AppDispatch";
import initialState from "./initialState";
import reducer from "./reducer";

export function AppDispatchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [appState, dispatch] = useReducer(reducer, initialState);

  const value = { appState, dispatch };

  return <AppDispatch.Provider value={value}>{children}</AppDispatch.Provider>;
}
