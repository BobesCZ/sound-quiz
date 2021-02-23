import { Action } from "./action";
import { AppState } from "./appState";

export interface ContextProps {
  appState: AppState;
  dispatch: React.Dispatch<Action>;
}
