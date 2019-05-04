import React from 'react';
import styles from './UserList.module.scss';
import { useStore } from '../index';
import { ReactComponent as Trash } from '../icons/trash.svg';
import { observer } from 'mobx-react-lite';

export const UserList = observer(() => {
  const { demoStore } = useStore();

  return (
    <div className={styles.users}>
      {demoStore.usersWithTasks.map((user, i) => (
        <div className={styles.user} key={i}>
          <input
            className={styles.input}
            value={user.name}
            placeholder="Type in user's name!"
            onChange={event => {
              demoStore.editUser(user.id, 'name', event.target.value);
            }}
          />

          <p className={styles['task-count']}>{user.taskCount} Tasks</p>

          <button
            className={styles.trash}
            onClick={() => demoStore.removeUser(user.id)}
          >
            <Trash />
          </button>
        </div>
      ))}
    </div>
  );
});
