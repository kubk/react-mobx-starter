import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Main } from '../main/main';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export const App = hot(() => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/'} exact component={Main} />
        <Route path={'/about'} component={() => <h1>About</h1>} />
      </Switch>
    </BrowserRouter>
  );
});
