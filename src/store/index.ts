import React from 'react';
import { storeContext } from '../index';

export const useStore = () => React.useContext(storeContext);
