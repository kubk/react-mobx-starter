import { describe, expect, it, vi } from "vitest";
import { TaskStore } from "./task-store";
import { when } from "mobx";

vi.mock("../api/api", () => {
  return {
    api: {
      async getUsers() {
        return [
          { id: "1", name: "John Doe" },
          { id: "2", name: "Jane Snow" },
          { id: "3", name: "Richard Roe" },
        ];
      },
      async getTasks() {
        return [
          {
            id: "1",
            userId: "1",
            title: "Read the documentation",
            isDone: true,
          },
          {
            id: "2",
            userId: "1",
            title: "Create awesome application",
            isDone: false,
          },
          {
            id: "3",
            userId: "2",
            title: "Star MobX repository",
            isDone: false,
          },
        ];
      },
    },
  };
});

describe("TaskStore", () => {
  it("is empty by default", () => {
    const taskStore = new TaskStore();
    expect(taskStore.users).toHaveLength(0);
    expect(taskStore.tasks).toHaveLength(0);
    expect(taskStore.usersWithTasks).toHaveLength(0);
  });

  it("calculates completed/total task count", async () => {
    const taskStore = new TaskStore();
    taskStore.load();
    expect(taskStore.usersLoading).toBe(true);
    expect(taskStore.tasksLoading).toBe(true);

    await when(() => !taskStore.usersLoading && !taskStore.tasksLoading);

    expect(taskStore.usersWithTasks[0].form.name.value).toBe("John Doe");
    expect(taskStore.usersWithTasks[0].taskTotal).toBe(2);
    expect(taskStore.usersWithTasks[0].taskCompleted).toBe(1);

    expect(taskStore.usersWithTasks[1].form.name.value).toBe("Jane Snow");
    expect(taskStore.usersWithTasks[1].taskTotal).toBe(1);
    expect(taskStore.usersWithTasks[1].taskCompleted).toBe(0);

    taskStore.tasks.find((task) => task.id === "1")?.form.userId.setValue("2");
    // Completed task 1 removed from user 1
    expect(taskStore.usersWithTasks[0].taskTotal).toBe(1);
    expect(taskStore.usersWithTasks[0].taskCompleted).toBe(0);
    // Task 1 added to added to user 2 as completed
    expect(taskStore.usersWithTasks[1].taskTotal).toBe(2);
    expect(taskStore.usersWithTasks[1].taskCompleted).toBe(1);

    taskStore.tasks.find((task) => task.id === "1")?.form.isDone.toggle();
    // User 2 now has no completed tasks
    expect(taskStore.usersWithTasks[1].taskCompleted).toBe(0);
  });

  it("removes related tasks after removing user", async () => {
    const taskStore = new TaskStore();
    taskStore.load();

    await when(() => !taskStore.usersLoading && !taskStore.tasksLoading);

    const initialUserCount = taskStore.usersWithTasks.length;
    taskStore.removeUser("1");
    expect(taskStore.users.length).toBe(2);
    expect(taskStore.tasks.length).toBe(1);
    expect(taskStore.usersWithTasks).toHaveLength(initialUserCount - 1);
  });
});
