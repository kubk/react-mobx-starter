import React from 'react';
import styles from './tasks.module.scss';
import { observer } from 'mobx-react';
import { useStore } from '../store';
import { Button } from './button';
import checkCircle from '../icons/check-circle.svg';
import trash from '../icons/trash.svg';
import cn from 'classnames';

export const Tasks = observer(() => {
  const { taskStore } = useStore();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Tasks</h2>
        <Button onClick={() => taskStore.addTask('')}>Add task</Button>
      </div>

      <div className={styles.tasks}>
        {taskStore.tasks.map((task, i) => (
          <div key={i} className={cn(styles.task, { [styles.done]: task.isDone })}>
            <span className={styles.taskInfo}>
              <img
                src={checkCircle}
                className={cn([styles.icon, styles.svg, styles.check])}
                alt={'check'}
                onClick={() => taskStore.toggleDone(task.id)}
              />

              <input
                className={styles.input}
                value={task.title}
                placeholder="Type in the title of the task!"
                readOnly={task.isDone}
                onChange={e => {
                  taskStore.editTask(task.id, 'title', e.target.value);
                }}
              />
            </span>

            <select
              className={styles.selectAssignee}
              value={task.userId || ''}
              onChange={e => {
                const userId = Number(e.target.value) || null;
                taskStore.assign(task.id, userId);
              }}
            >
              <option value="">No assignee</option>
              {taskStore.users.map((user, i) => (
                <option key={i} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            <img
              src={trash}
              alt={'remove task'}
              className={styles.trash}
              onClick={() => taskStore.removeTask(task.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
});
