import { HistoryAdapter, RouterState, RouterStore } from 'mobx-state-router';
import { routes } from '../routes';
import { createBrowserHistory } from 'history';
import { DemoStore } from './DemoStore';

export class RootStore {
  routerStore = new RouterStore(this, routes, new RouterState('notFound'));
  demoStore = new DemoStore();

  constructor() {
    const history = createBrowserHistory();
    const historyAdapter = new HistoryAdapter(this.routerStore, history);
    historyAdapter.observeRouterStateChanges();
  }
}
