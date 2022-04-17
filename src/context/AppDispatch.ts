import { createContext } from "react";
import { ContextProps } from "../types/context";

const AppDispatch = createContext<ContextProps>(undefined as any);

export default AppDispatch;
