import React from 'react';
import styles from './Users.module.scss';
import { UserList } from './UserList';
import { useStore } from '../index';
import { observer } from 'mobx-react-lite';
import { Button } from './Button';

export const Users = observer(() => {
  const { demoStore } = useStore();

  return (
    <div className={styles.users}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>USERS</h2>
          <Button onClick={() => demoStore.addUser('')}>ADD USER</Button>
        </div>
        <UserList />
      </div>
    </div>
  );
});
