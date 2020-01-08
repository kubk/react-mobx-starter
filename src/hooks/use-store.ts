import React from 'react';
import { stores } from '../store/stores';

export const StoreContext = React.createContext(stores);

export const useStore = () => React.useContext(StoreContext);
