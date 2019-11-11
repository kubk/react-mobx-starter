import { TaskStore } from './task-store';
import { TaskApi } from '../api/task-api';

export class RootStore {
  taskStore = new TaskStore(new TaskApi());
}
