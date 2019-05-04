import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { App } from './components/App';
import { RootStore } from './store/RootStore';
import { Provider } from 'mobx-react';

const rootStore = new RootStore();
const storeContext = React.createContext(rootStore);
export const useStore = () => React.useContext(storeContext);

const render = () => (
  <Provider rootStore={rootStore}>
    <App />
  </Provider>
);

ReactDOM.render(render(), document.getElementById('root'));

declare const module: any;
if (module.hot) {
  module.hot.accept('./store/RootStore', render);
}
