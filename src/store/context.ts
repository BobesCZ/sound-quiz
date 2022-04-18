import { createContext } from "react";
import { ContextProps } from "../types/context";

const AppContext = createContext<ContextProps>(undefined as any);

export default AppContext;
