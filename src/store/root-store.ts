import { TaskStore } from './task-store';
import { TaskApi } from '../api/task-api';
import { addToDevtools } from './add-to-devtools';

export class RootStore {
  taskStore = new TaskStore(new TaskApi());

  constructor() {
    Object.values(this).forEach(store => {
      addToDevtools(store);
    });
  }
}
