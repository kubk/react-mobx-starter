import React, { useEffect } from 'react';
import styles from './main.module.scss';
import { Users } from '../users/users';
import { Tasks } from '../tasks/tasks';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';

export const Main = observer(() => {
  const { taskStore } = useStore();

  useEffect(() => {
    taskStore.load();
  }, [taskStore]);

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1 className={styles.title}>ToDo</h1>
        <p className={styles.lead}>MobX example application</p>
      </div>
      <p className={styles.description}>
        Try adding users and tasks to see how each data gets updated.
      </p>

      <div className={styles.container}>
        <div className={styles.users}>
          <Users />
        </div>
        <div className={styles.tasks}>
          <Tasks />
        </div>
      </div>
    </div>
  );
});
