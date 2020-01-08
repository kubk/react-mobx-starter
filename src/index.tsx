import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { App } from './components/app/app';
import { configure } from 'mobx';
import { StoreContext } from './hooks/use-store';
import { stores } from './store/stores';

configure({ enforceActions: 'always' });

const render = () => (
  <StoreContext.Provider value={stores}>
    <App />
  </StoreContext.Provider>
);

ReactDOM.render(render(), document.getElementById('root'));

declare const module: any;
if (module.hot) {
  module.hot.accept('./store/stores', render);
}
