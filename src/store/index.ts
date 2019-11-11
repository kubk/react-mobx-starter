import React, { Context } from 'react';
import { RootStore } from './root-store';

export const StoreContext = React.createContext<RootStore | null>(null);
export const useStore = () => React.useContext(StoreContext as Context<RootStore>);
