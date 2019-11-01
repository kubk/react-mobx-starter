import React from 'react';
import { hot } from 'react-hot-loader/root';
import { RouterView } from 'mobx-state-router';
import { viewMap } from '../routes';
import { useStore } from '../store';

export const App = hot(() => {
  const { routerStore } = useStore();

  return <RouterView routerStore={routerStore} viewMap={viewMap} />;
});
