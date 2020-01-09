import { TaskStore } from './task-store';
import { TaskApi } from '../api/task-api';
import { configure } from 'mobx';

configure({ enforceActions: 'always' });

export const stores = {
  taskStore: new TaskStore(new TaskApi())
};
