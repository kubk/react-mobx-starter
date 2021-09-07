import React from 'react';
import { Main } from '../main/main';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/'} exact component={Main} />
        <Route path={'/about'} component={() => <h1>About</h1>} />
      </Switch>
    </BrowserRouter>
  );
};
