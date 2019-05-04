import React from 'react';
import { hot } from 'react-hot-loader/root';
import DevTools from 'mobx-react-devtools';
import { RouterView } from 'mobx-state-router';
import { viewMap } from '../routes';
import { useStore } from '../index';

export const App = hot(() => {
  const { routerStore } = useStore();

  return (
    <>
      {process.env.NODE_ENV === 'development' && <DevTools />}
      <RouterView routerStore={routerStore} viewMap={viewMap} />
    </>
  );
});
