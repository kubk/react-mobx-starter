import { TaskStore } from './task-store';
import { TaskApi } from '../api/task-api';
import { configureDevtools } from 'mobx-log';

configureDevtools()

export const stores = {
  taskStore: new TaskStore(new TaskApi()),
};
