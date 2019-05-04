import React from 'react';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>ToDo</h1>
      <p className={styles.lead}>MobX example application</p>
    </div>
  );
};
