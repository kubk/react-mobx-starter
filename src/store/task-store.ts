import { action, computed, observable } from 'mobx';
import { Task, TaskApi, User } from '../api/task-api';
import { assert } from './assert';

type UsersWithTasks = Array<User & { taskTotal: number; taskCompleted: number }>;

export class TaskStore {
  @observable usersLoading = false;
  @observable users: User[] = [];
  @observable tasksLoading = false;
  @observable tasks: Task[] = [];

  constructor(private tasksApi: TaskApi) {}

  @action load() {
    this.tasksLoading = true;
    this.usersLoading = true;

    this.tasksApi.getTasks().then(
      action('getTasks', (tasks: Task[]) => {
        this.tasks = tasks;
        this.tasksLoading = false;
      })
    );

    this.tasksApi.getUsers().then(
      action('getUsers', (users: User[]) => {
        this.users = users;
        this.usersLoading = false;
      })
    );
  }

  @action addUser(name: string): void {
    this.users.unshift({
      id: this.users.length + 1,
      name
    });
  }

  @action removeUser(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
    this.tasks = this.tasks.filter(task => task.userId !== userId);
  }

  @action editUser<Key extends keyof User>(id: number, key: Key, value: User[Key]): void {
    const user = this.users.find(user => user.id === id);
    assert(user, `User ${id} not found`);
    user[key] = value;
  }

  @action assign(todoId: number, userId: number | null): void {
    const todo = this.tasks.find(task => task.id === todoId);
    assert(todo, `Task ${todoId} not found`);
    todo.userId = userId;
  }

  @computed get usersWithTasks(): UsersWithTasks {
    return this.users.map(user => ({
      ...user,
      taskTotal: this.tasks.filter(todo => todo.userId === user.id).length,
      taskCompleted: this.tasks.filter(todo => todo.userId === user.id && todo.isDone).length
    }));
  }

  @action addTask(title: string): void {
    this.tasks.unshift({
      id: this.tasks.length + 1,
      title,
      isDone: false,
      userId: null
    });
  }

  @action editTask<Key extends keyof Task>(id: number, key: Key, value: Task[Key]): void {
    const task = this.tasks.find(task => task.id === id);
    assert(task, `Task ${id} not found`);
    task[key] = value;
  }

  @action toggleDone(id: number): void {
    const task = this.tasks.find(task => task.id === id);
    assert(task, `Task ${id} not found`);
    task.isDone = !task.isDone;
  }

  @action removeTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
