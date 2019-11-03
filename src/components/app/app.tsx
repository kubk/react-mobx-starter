import React from 'react';
import { hot } from 'react-hot-loader/root';
import { RouterView, ViewMap } from 'mobx-state-router';
import { ExtendedRoute, routes } from '../../routes';
import { useStore } from '../../store';

const createViewMap = (routes: ExtendedRoute[]): ViewMap => {
  return routes.reduce<ViewMap>((viewMap, route) => {
    viewMap[route.name] = route.component;
    return viewMap;
  }, {});
};

export const App = hot(() => {
  const { routerStore } = useStore();
  const viewMap = createViewMap(routes);

  return <RouterView routerStore={routerStore} viewMap={viewMap} />;
});
