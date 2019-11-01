import { TaskStore } from './task-store';
import { TaskApi } from './task-api';
import { when } from 'mobx';

const createTaskStore = () => {
  const taskApi = new TaskApi();
  return new TaskStore(taskApi);
};

describe('TaskStore', () => {
  it('is empty by default', () => {
    const taskStore = createTaskStore();
    expect(taskStore.users).toHaveLength(0);
    expect(taskStore.tasks).toHaveLength(0);
    const usersWithTasks = taskStore.usersWithTasks;
    expect(usersWithTasks).toHaveLength(0);
  });

  it('calculates completed/total task count', (done) => {
    const taskStore = createTaskStore();
    taskStore.load();
    expect(taskStore.usersLoading).toBe(true);
    expect(taskStore.tasksLoading).toBe(true);

    when(
      () => !taskStore.usersLoading && !taskStore.tasksLoading,
      () => {
        expect(taskStore.usersWithTasks[0].name).toBe('John Doe');
        expect(taskStore.usersWithTasks[0].taskTotal).toBe(2);
        expect(taskStore.usersWithTasks[0].taskCompleted).toBe(1);

        expect(taskStore.usersWithTasks[1].name).toBe('Jane Snow');
        expect(taskStore.usersWithTasks[1].taskTotal).toBe(1);
        expect(taskStore.usersWithTasks[1].taskCompleted).toBe(0);

        taskStore.assign(1, 2);
        // Completed task 1 removed from user 1
        expect(taskStore.usersWithTasks[0].taskTotal).toBe(1);
        expect(taskStore.usersWithTasks[0].taskCompleted).toBe(0);
        // Task 1 added to added to user 2 as completed
        expect(taskStore.usersWithTasks[1].taskTotal).toBe(2);
        expect(taskStore.usersWithTasks[1].taskCompleted).toBe(1);

        taskStore.toggleDone(1);
        // User 2 now has no completed tasks
        expect(taskStore.usersWithTasks[1].taskCompleted).toBe(0);
        done();
      }
    );
  });
});
