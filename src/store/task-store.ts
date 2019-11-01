import { action, computed, observable } from 'mobx';
import { Task, TaskApi, User } from './task-api';

type UsersWithTasks = Array<User & { taskTotal: number; taskCompleted: number }>;

export class TaskStore {
  @observable usersLoading = false;
  @observable users: User[] = [];
  @observable tasksLoading = false;
  @observable tasks: Task[] = [];

  constructor(private tasksApi: TaskApi) {}

  @action load(): void {
    this.tasksLoading = true;
    this.usersLoading = true;

    this.tasksApi.getTasks().then(
      action((tasks: Task[]) => {
        this.tasks = tasks;
        this.tasksLoading = false;
      })
    );

    this.tasksApi.getUsers().then(
      action((users: User[]) => {
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
    if (user) {
      user[key] = value;
    }
  }

  @action assign(todoId: number, userId: number | null): void {
    const todo = this.tasks.find(task => task.id === todoId);
    if (!todo) {
      throw new Error('Invalid todo ID');
    }
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

  editTask<Key extends keyof Task>(id: number, key: Key, value: Task[Key]): void {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task[key] = value;
    }
  }

  @action toggleDone(taskId: number): void {
    const task = this.tasks.find(task => task.id === taskId);
    if (task) {
      task.isDone = !task.isDone;
    }
  }

  @action removeTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }
}
