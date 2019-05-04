import { computed, observable } from 'mobx';

interface User {
  id: number;
  name: string;
}

interface Task {
  id: number;
  title: string;
  isDone: boolean;
  userId: number | null;
}

export class DemoStore {
  @observable users: User[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'John Snow' }
  ];

  @observable tasks: Task[] = [
    {
      id: 1,
      userId: 1,
      title: 'Create awesome application!',
      isDone: false
    },
    {
      id: 2,
      userId: 1,
      title: 'Read the documentation',
      isDone: false
    },
    {
      id: 3,
      userId: 2,
      title: 'Star MobX repository',
      isDone: false
    }
  ];

  addUser(name: string) {
    this.users.unshift({
      id: this.users.length + 1,
      name
    });
  }

  removeUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }

  editUser<Key extends keyof User>(id: number, key: Key, value: User[Key]) {
    const user = this.users.find(user => user.id === id);
    if (user) {
      user[key] = value;
    }
  }

  @computed get usersWithTasks(): Array<User & { taskCount: number }> {
    return this.users.map(user => {
      return {
        ...user,
        taskCount: this.tasks.filter(todo => todo.userId === user.id).length
      };
    });
  }

  addTask(title: string) {
    this.tasks.unshift({
      id: this.tasks.length + 1,
      title,
      isDone: false,
      userId: null
    });
  }

  editTask<Key extends keyof Task>(id: number, key: Key, value: Task[Key]) {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task[key] = value;
    }
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
