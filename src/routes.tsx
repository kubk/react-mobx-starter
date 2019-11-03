import * as React from 'react';
import { ReactNode } from 'react';
import { Route } from 'mobx-state-router';
import { Main } from './components/main/main';

export type ExtendedRoute = Route & { component: ReactNode };

export const routes: ExtendedRoute[] = [
  { name: 'main', pattern: '/', component: <Main /> },
  { name: 'about', pattern: '/about', component: <h1>About</h1> },
  { name: 'notFound', pattern: '/not-found', component: <h1>Not found</h1> }
];
