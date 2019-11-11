import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { App } from './components/app/app';
import { RootStore } from './store/root-store';
import { configure } from 'mobx';
import { StoreContext } from './store';

configure({ enforceActions: 'always' });

const rootStore = new RootStore();

const render = () => (
  <StoreContext.Provider value={rootStore}>
    <App />
  </StoreContext.Provider>
);

ReactDOM.render(render(), document.getElementById('root'));

declare const module: any;
if (module.hot) {
  module.hot.accept('./store/root-store', render);
}
