import { useRef } from "react";

export const useFocus = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);

  return {
    rememberElement(element: T | null) {
      ref.current = element;
    },
    focusElement() {
      // Use setTimeout to focus on input after animation complete
      setTimeout(() => {
        ref.current?.focus();
      });
    },
  };
};
