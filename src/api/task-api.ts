export interface User {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  isDone: boolean;
  userId: string | null;
}

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export class TaskApi {
  async getUsers(): Promise<User[]> {
    await sleep(700);
    return [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Snow' },
      { id: '3', name: 'Richard Roe' },
    ];
  }

  async getTasks(): Promise<Task[]> {
    await sleep(600);
    return [
      {
        id: '1',
        userId: '1',
        title: 'Create awesome application!',
        isDone: true,
      },
      {
        id: '2',
        userId: '1',
        title: 'Read the documentation',
        isDone: false,
      },
      {
        id: '3',
        userId: '2',
        title: 'Star MobX repository',
        isDone: false,
      },
    ];
  }
}
