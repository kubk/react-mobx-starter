import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { RootStore } from './store/store';
import { Provider } from 'mobx-react';

const rootStore = new RootStore();

const render = () => (
  <Provider {...rootStore} rootStore={rootStore}>
    <App />
  </Provider>
);

ReactDOM.render(render(), document.getElementById('root'));

declare const module: any;
if (module.hot) {
  module.hot.accept('./store/store', render);
}
