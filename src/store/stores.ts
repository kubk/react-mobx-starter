import { TaskStore } from './task-store';
import { TaskApi } from '../api/task-api';
import { configureMakeLoggable } from 'mobx-log';

configureMakeLoggable({
  storeConsoleAccess: true,
});

export const stores = {
  taskStore: new TaskStore(new TaskApi()),
};
