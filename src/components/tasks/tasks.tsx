import React from 'react';
import styles from './tasks.module.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';
import { Button } from '../button/button';
import trash from '../../icons/trash.svg';
import cn from 'classnames';
import Skeleton from 'react-loading-skeleton';
import { AssigneeSelector } from '../assignee-selector/assignee-selector';
import { useInputFocus } from '../../hooks/use-input-focus';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CheckCircle } from '../../icons/check-circle';

export const Tasks = observer(() => {
  const { taskStore } = useStore();
  const { rememberInput, focusOnInput } = useInputFocus();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Tasks</h2>
        <Button
          onClick={() => {
            taskStore.addTask('');
            focusOnInput();
          }}
        >
          Add task
        </Button>
      </div>

      {taskStore.usersLoading && (
        <div className={styles.tasks}>
          {[1, 2, 3].map(i => (
            <div key={i} className={styles.task}>
              <span className={styles.skeleton}>
                <Skeleton />
              </span>
            </div>
          ))}
        </div>
      )}

      {!taskStore.usersLoading && (
        <TransitionGroup className={styles.tasks}>
          {taskStore.tasks.map((task, i) => (
            <CSSTransition key={task.id} timeout={300} classNames={'item'}>
              <div key={i} className={cn(styles.task, { [styles.done]: task.isDone })}>
                <span className={styles.taskInfo}>
                  <CheckCircle
                    onClick={() => taskStore.toggleDone(task.id)}
                    className={styles.icon}
                    fill={task.isDone ? 'var(--c-teal)' : 'var(--c-black)'}
                  />

                  <input
                    className={styles.input}
                    value={task.title}
                    ref={input => {
                      if (i === 0) {
                        rememberInput(input);
                      }
                    }}
                    placeholder="Type in the title of the task!"
                    readOnly={task.isDone}
                    onChange={e => {
                      taskStore.editTask(task.id, 'title', e.target.value);
                    }}
                  />
                </span>

                <AssigneeSelector
                  value={task.userId || ''}
                  onSelect={userId => taskStore.assign(task.id, userId)}
                  users={taskStore.users}
                />

                <img
                  src={trash}
                  alt={'remove task'}
                  className={styles.trash}
                  onClick={() => taskStore.removeTask(task.id)}
                />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </div>
  );
});
