import { ReactNode } from "react";
import styles from "./button.module.scss";

type Props = {
  children: ReactNode;
  onClick: () => void;
};

export function Button({ children, onClick }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
