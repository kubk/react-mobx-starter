import React from 'react';
import styles from './users.module.scss';
import { observer } from 'mobx-react';
import { Button } from '../button/button';
import trashSvg from '../../icons/trash.svg';
import { useStore } from '../../store';
import { useInputRefs } from '../../hooks/use-input-refs';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export const Users = observer(() => {
  const { taskStore } = useStore();
  const { addInput, focusOnFirstInput } = useInputRefs();

  return (
    <div className={styles.usersWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Users</h2>
          <Button
            onClick={() => {
              taskStore.addUser('');
              focusOnFirstInput();
            }}
          >
            Add user
          </Button>
        </div>
        <TransitionGroup className={styles.users}>
          {taskStore.usersWithTasks.map((user, i) => (
            <CSSTransition key={user.id} timeout={300} classNames="item">
              <div className={styles.user} key={i}>
                <input
                  ref={el => addInput(el, i)}
                  className={styles.input}
                  value={user.name}
                  placeholder="Type in user's name!"
                  onChange={event => {
                    taskStore.editUser(user.id, 'name', event.target.value);
                  }}
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
      </div>
    </div>
  );
});
