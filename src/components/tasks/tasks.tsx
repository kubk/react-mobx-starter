import React from 'react';
import styles from './tasks.module.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../hooks/use-store';
import { Button } from '../button/button';
import trash from '../../icons/trash.svg';
import cn from 'classnames';
import Skeleton from 'react-loading-skeleton';
import { AssigneeSelector } from '../assignee-selector/assignee-selector';
import { useFocus } from '../../hooks/use-focus';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CheckCircle } from '../../icons/check-circle';

export const Tasks = observer(() => {
  const { taskStore } = useStore();
  const { rememberElement, focusElement } = useFocus<HTMLInputElement>();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Tasks</h2>
        <Button
          onClick={() => {
            taskStore.addTask('');
            focusElement();
          }}
        >
          Add task
        </Button>
      </div>

      {taskStore.usersLoading && (
        <div className={styles.tasks}>
          {[1, 2, 3].map((i) => (
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
          {taskStore.tasks.map((task, i) => {
            const { form } = task;
            return (
              <CSSTransition key={task.id} timeout={300} classNames={'item'}>
                <div
                  key={i}
                  className={cn(styles.task, {
                    [styles.done]: form.isDone.checked,
                  })}
                >
                  <span className={styles.taskInfo}>
                    <CheckCircle
                      onClick={form.isDone.toggle}
                      className={styles.icon}
                      fill={form.isDone.checked ? 'var(--c-teal)' : 'var(--c-black)'}
                    />

                    <input
                      className={styles.input}
                      ref={(input) => {
                        if (i === 0) {
                          rememberElement(input);
                        }
                      }}
                      placeholder="Type in the title of the task!"
                      readOnly={form.isDone.checked}
                      {...form.title.toInput}
                    />
                  </span>

                  <AssigneeSelector
                    users={taskStore.users.map((user) => ({
                      id: user.id,
                      name: user.form.name.value,
                    }))}
                    {...form.userId.toInput}
                  />

                  <img
                    src={trash}
                    alt={'remove task'}
                    className={styles.trash}
                    onClick={() => taskStore.removeTask(task.id)}
                  />
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      )}
    </div>
  );
});
