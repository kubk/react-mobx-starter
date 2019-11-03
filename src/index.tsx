import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { App } from './components/app/app';
import { Provider } from 'mobx-react';
import { RootStore } from './store/root-store';

const rootStore = new RootStore();
export const storeContext = React.createContext(rootStore);

const render = () => (
  <Provider rootStore={rootStore}>
    <App />
  </Provider>
);

ReactDOM.render(render(), document.getElementById('root'));

declare const module: any;
if (module.hot) {
  module.hot.accept('./store/root-store', render);
}
