import React from "react";
import styles from "./TaskList.module.scss";
import { useStore } from "../index";
import checkCircle from "../icons/check-circle.svg";
import trash from "../icons/trash.svg";
import { observer } from "mobx-react-lite";

export const TaskList = observer(() => {
  const { demoStore } = useStore();

  return (
    <div className={styles.tasks}>
      {demoStore.tasks.map(task => (
        <div className={styles.task + (task.isDone ? " " + styles.done : "")}>
          <img
            src={checkCircle}
            className={[styles.icon, styles.svg, styles.check].join(" ")}
            alt={"check"}
            onClick={() => demoStore.editTask(task.id, "isDone", !task.isDone)}
          />

          <input
            className={styles.input}
            value={task.title}
            placeholder='Type in the title of the task!'
            readOnly={task.isDone}
            onChange={e => {
              demoStore.editTask(task.id, "title", e.target.value);
            }}
          />

          <img
            src={trash}
            alt={"remove task"}
            className={styles.trash}
            onClick={() => demoStore.removeTask(task.id)}
          />
        </div>
      ))}
    </div>
  );
});
