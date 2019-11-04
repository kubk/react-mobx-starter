import { useRef } from 'react';

export const useInputFocus = () => {
  const ref = useRef<HTMLInputElement | null>(null);

  return {
    rememberInput(element: HTMLInputElement | null) {
      ref.current = element;
    },
    focusOnInput() {
      // Use setTimeout to focus on input after animation complete
      setTimeout(() => {
        if (ref.current) {
          ref.current.focus();
        }
      });
    }
  };
};
