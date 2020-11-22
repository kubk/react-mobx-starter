import { TaskStore } from './task-store';
import { TaskApi } from '../api/task-api';

export const stores = {
  taskStore: new TaskStore(new TaskApi())
};
