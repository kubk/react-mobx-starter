import * as React from 'react';
import { Route, ViewMap } from 'mobx-state-router';
import { ReactNode } from 'react';
import { About } from './components/about';
import { NotFound } from './components/not-found';
import { Main } from './components/main';

interface ExtendedRoute extends Route {
  component: ReactNode;
}

export const routes: ExtendedRoute[] = [
  {
    name: 'main',
    pattern: '/',
    component: <Main />
  },
  {
    name: 'about',
    pattern: '/about',
    component: <About />
  },
  {
    name: 'notFound',
    pattern: '/not-found',
    component: <NotFound />
  }
];

export const viewMap = routes.reduce<ViewMap>((viewMap, route) => {
  viewMap[route.name] = route.component;
  return viewMap;
}, {});
