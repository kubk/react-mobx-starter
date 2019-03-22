import { HistoryAdapter, RouterState, RouterStore } from 'mobx-state-router';
import { routes } from '../routes';
import { createBrowserHistory } from 'history';

export class RootStore {
  routerStore = new RouterStore(this, routes, new RouterState('notFound'));

  constructor() {
    const history = createBrowserHistory();
    const historyAdapter = new HistoryAdapter(this.routerStore, history);
    historyAdapter.observeRouterStateChanges();
  }
}
