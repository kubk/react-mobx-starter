import { HistoryAdapter, RouterState, RouterStore } from 'mobx-state-router';
import { routes } from '../routes';
import { createBrowserHistory } from 'history';
import { TaskStore } from './task-store';
import { TaskApi } from './task-api';

export class RootStore {
  routerStore = new RouterStore(this, routes, new RouterState('notFound'));
  taskStore = new TaskStore(new TaskApi());

  constructor() {
    const history = createBrowserHistory();
    const historyAdapter = new HistoryAdapter(this.routerStore, history);
    historyAdapter.observeRouterStateChanges();
  }
}
