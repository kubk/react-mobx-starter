import { action, computed, observable } from 'mobx';
import { Task, TaskApi, User } from '../api/task-api';
import { assert } from '../utils/assert';
import id from 'nanoid';
import remotedev from 'mobx-remotedev';

type UsersWithTasks = Array<User & { taskTotal: number; taskCompleted: number }>;

@remotedev({ global: true })
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
      action('getTasks', tasks => {
        this.tasks = tasks;
        this.tasksLoading = false;
      })
    );

    this.tasksApi.getUsers().then(
      action('getUsers', users => {
        this.users = users;
        this.usersLoading = false;
      })
    );
  }

  @action addUser(name: string): void {
    this.users.unshift({ id: id(), name });
  }

  @action removeUser(userId: string): void {
    this.users = this.users.filter(user => user.id !== userId);
    this.tasks = this.tasks.filter(task => task.userId !== userId);
  }

  @action editUser<Key extends keyof User>(id: string, key: Key, value: User[Key]): void {
    const user = this.users.find(user => user.id === id);
    assert(user, `User ${id} not found`);
    user[key] = value;
  }

  @action assign(todoId: string, userId: string | null): void {
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
      id: id(),
      title,
      isDone: false,
      userId: null
    });
  }

  @action editTask<Key extends keyof Task>(id: string, key: Key, value: Task[Key]): void {
    const task = this.tasks.find(task => task.id === id);
    assert(task, `Task ${id} not found`);
    task[key] = value;
  }

  @action toggleDone(id: string): void {
    const task = this.tasks.find(task => task.id === id);
    assert(task, `Task ${id} not found`);
    task.isDone = !task.isDone;
  }

  @action removeTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
