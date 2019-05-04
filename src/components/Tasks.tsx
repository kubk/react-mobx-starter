import React from 'react';
import styles from './Tasks.module.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from '../index';
import { Button } from './Button';
import { TaskList } from './TaskList';

export const Tasks = observer(() => {
  const { demoStore } = useStore();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>TASKS</h2>
        <Button onClick={() => demoStore.addTask('')}>ADD TASK</Button>
      </div>

      <TaskList />
    </div>
  );
});
