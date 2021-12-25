import React from 'react';
import styles from './users.module.scss';
import { observer } from 'mobx-react-lite';
import { Button } from '../button/button';
import trashSvg from '../../icons/trash.svg';
import { useStore } from '../../hooks/use-store';
import { useFocus } from '../../hooks/use-focus';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Skeleton from 'react-loading-skeleton';

export const Users = observer(() => {
  const { taskStore } = useStore();
  const { rememberElement, focusElement } = useFocus<HTMLInputElement>();

  return (
    <div className={styles.usersWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Users</h2>
          <Button
            onClick={() => {
              taskStore.addUser('');
              focusElement();
            }}
          >
            Add user
          </Button>
        </div>

        {taskStore.usersLoading && (
          <div className={styles.users}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.user}>
                <span className={styles.skeleton}>
                  <Skeleton />
                </span>
              </div>
            ))}
          </div>
        )}

        {!taskStore.usersLoading && (
          <TransitionGroup className={styles.users}>
            {taskStore.usersWithTasks.map((user, i) => (
              <CSSTransition key={user.id} timeout={300} classNames="item">
                <div className={styles.user} key={i}>
                  <input
                    ref={(input) => {
                      if (i === 0) {
                        rememberElement(input);
                      }
                    }}
                    className={styles.input}
                    {...user.form.name.toInput}
                    placeholder="Type in user's name!"
                  />

                  <p className={styles.taskCompleted}>Completed {user.taskCompleted}</p>
                  <p className={styles.taskCount}>Total {user.taskTotal}</p>

                  <img
                    src={trashSvg}
                    alt={'Remove task'}
                    className={styles.trash}
                    onClick={() => taskStore.removeUser(user.id)}
                  />
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </div>
    </div>
  );
});
