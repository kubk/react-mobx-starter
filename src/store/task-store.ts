import { action, makeAutoObservable } from 'mobx';
import { TaskApi } from '../api/task-api';
import { nanoid } from 'nanoid';
import { makeLoggable } from 'mobx-log';
import { CheckboxInput, TextInput } from './mobx-form';

type UserForm = {
  name: TextInput;
};

type TaskForm = {
  title: TextInput;
  isDone: CheckboxInput;
  userId: TextInput;
};

export class TaskStore {
  usersLoading = false;
  users: Array<{ id: string; form: UserForm }> = [];
  tasksLoading = false;
  tasks: Array<{ id: string; form: TaskForm }> = [];

  constructor(private tasksApi: TaskApi) {
    makeAutoObservable(this);
    makeLoggable(this);
  }

  load() {
    this.tasksLoading = true;
    this.usersLoading = true;

    this.tasksApi
      .getTasks()
      .then(
        action((tasks) => {
          this.tasks = tasks.map((task) => ({
            id: task.id,
            form: {
              title: new TextInput(task.title),
              isDone: new CheckboxInput(task.isDone),
              userId: new TextInput(task.userId || ''),
            },
          }));
        })
      )
      .finally(action(() => (this.tasksLoading = false)));

    this.tasksApi
      .getUsers()
      .then(
        action((users) => {
          this.users = users.map((user) => ({
            id: user.id,
            form: {
              name: new TextInput(user.name),
            },
          }));
        })
      )
      .finally(action(() => (this.usersLoading = false)));
  }

  addUser(name: string) {
    this.users.unshift({ id: nanoid(), form: { name: new TextInput(name) } });
  }

  removeUser(userId: string) {
    this.users = this.users.filter((user) => user.id !== userId);
    this.tasks = this.tasks.filter((task) => task.form.userId.value !== userId);
  }

  get usersWithTasks() {
    return this.users.map((user) => ({
      id: user.id,
      form: user.form,
      taskTotal: this.tasks.filter((todo) => todo.form.userId.value === user.id).length,
      taskCompleted: this.tasks.filter(
        (todo) => todo.form.userId.value === user.id && todo.form.isDone.checked
      ).length,
    }));
  }

  addTask(title: string) {
    this.tasks.unshift({
      id: nanoid(),
      form: {
        title: new TextInput(title),
        isDone: new CheckboxInput(false),
        userId: new TextInput(''),
      },
    });
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
