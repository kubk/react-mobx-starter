import { action, makeAutoObservable } from "mobx";
import { makeLoggable } from "mobx-log";
import { CheckboxInput, TextInput } from "./mobx-form";
import { api } from "../api/api";
import { v4 } from "uuid";

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

  constructor() {
    makeAutoObservable(this);
    makeLoggable(this);
  }

  load() {
    this.tasksLoading = true;
    this.usersLoading = true;

    api
      .getTasks()
      .then(
        action((tasks) => {
          this.tasks = tasks.map((task) => ({
            id: task.id,
            form: {
              title: new TextInput(task.title),
              isDone: new CheckboxInput(task.isDone),
              userId: new TextInput(task.userId || ""),
            },
          }));
        }),
      )
      .finally(action(() => (this.tasksLoading = false)));

    api
      .getUsers()
      .then(
        action((users) => {
          this.users = users.map((user) => ({
            id: user.id,
            form: {
              name: new TextInput(user.name),
            },
          }));
        }),
      )
      .finally(action(() => (this.usersLoading = false)));
  }

  addUser(name: string) {
    this.users.unshift({
      id: v4(),
      form: { name: new TextInput(name) },
    });
  }

  removeUser(userId: string) {
    this.users = this.users.filter((user) => user.id !== userId);
    this.tasks = this.tasks.filter((task) => task.form.userId.value !== userId);
  }

  get usersWithTasks() {
    return this.users.map((user) => ({
      id: user.id,
      form: user.form,
      taskTotal: this.tasks.filter((todo) => todo.form.userId.value === user.id)
        .length,
      taskCompleted: this.tasks.filter(
        (todo) =>
          todo.form.userId.value === user.id && todo.form.isDone.checked,
      ).length,
    }));
  }

  addTask(title: string) {
    this.tasks.unshift({
      id: v4(),
      form: {
        title: new TextInput(title),
        isDone: new CheckboxInput(false),
        userId: new TextInput(""),
      },
    });
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}

export const taskStore = new TaskStore();
