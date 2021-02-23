import { createContext } from 'react';
import { ContextProps } from '../types/contextProps';

const AppDispatch = createContext<ContextProps>(undefined as any);

export default AppDispatch;