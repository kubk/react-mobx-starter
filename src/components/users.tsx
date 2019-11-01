import React from 'react';
import styles from './users.module.scss';
import { observer } from 'mobx-react';
import { Button } from './button';
import { ReactComponent as Trash } from '../icons/trash.svg';
import { useStore } from '../store';

export const Users = observer(() => {
  const { taskStore } = useStore();

  return (
    <div className={styles.usersWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Users</h2>
          <Button onClick={() => taskStore.addUser('')}>Add user</Button>
        </div>
        <div className={styles.users}>
          {taskStore.usersWithTasks.map((user, i) => (
            <div className={styles.user} key={i}>
              <input
                className={styles.input}
                value={user.name}
                placeholder="Type in user's name!"
                onChange={event => {
                  taskStore.editUser(user.id, 'name', event.target.value);
                }}
              />

              <p className={styles.taskCompleted}>Completed {user.taskCompleted}</p>
              <p className={styles.taskCount}>Total {user.taskTotal}</p>

              <button className={styles.trash} onClick={() => taskStore.removeUser(user.id)}>
                <Trash />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
