import React, { ReactNode } from 'react';
import styles from './Button.module.scss';

interface Props {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ children, onClick }: Props) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};
