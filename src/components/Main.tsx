import React from 'react';
import styles from './Main.module.scss';
import { Users } from './Users';
import { Header } from './Header';
import { Description } from './Description';
import { Tasks } from './Tasks';

export const Main = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Description />

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
};
