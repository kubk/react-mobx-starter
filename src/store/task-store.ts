import { action, makeAutoObservable } from 'mobx';
import { Task, TaskApi, User } from '../api/task-api';
import { assert } from '../utils/assert';
import { nanoid } from 'nanoid';

type UsersWithTasks = Array<User & { taskTotal: number; taskCompleted: number }>;

export class TaskStore {
  usersLoading = false;
  users: User[] = [];
  tasksLoading = false;
  tasks: Task[] = [];

  constructor(private tasksApi: TaskApi) {
    makeAutoObservable(this);
  }

  load() {
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

  addUser(name: string): void {
    this.users.unshift({ id: nanoid(), name });
  }

  removeUser(userId: string): void {
    this.users = this.users.filter((user) => user.id !== userId);
    this.tasks = this.tasks.filter((task) => task.userId !== userId);
  }

  editUser<Key extends keyof User>(id: string, key: Key, value: User[Key]): void {
    const user = this.users.find((user) => user.id === id);
    assert(user, `User ${id} not found`);
    user[key] = value;
  }

  assign(todoId: string, userId: string | null): void {
    const todo = this.tasks.find((task) => task.id === todoId);
    assert(todo, `Task ${todoId} not found`);
    todo.userId = userId;
  }

  get usersWithTasks(): UsersWithTasks {
    return this.users.map((user) => ({
      ...user,
      taskTotal: this.tasks.filter((todo) => todo.userId === user.id).length,
      taskCompleted: this.tasks.filter((todo) => todo.userId === user.id && todo.isDone).length,
    }));
  }

  addTask(title: string): void {
    this.tasks.unshift({
      id: nanoid(),
      title,
      isDone: false,
      userId: null,
    });
  }

  editTask<Key extends keyof Task>(id: string, key: Key, value: Task[Key]): void {
    const task = this.tasks.find((task) => task.id === id);
    assert(task, `Task ${id} not found`);
    task[key] = value;
  }

  toggleDone(id: string): void {
    const task = this.tasks.find((task) => task.id === id);
    assert(task, `Task ${id} not found`);
    task.isDone = !task.isDone;
  }

  removeTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
