import { useRef } from 'react';

export const useInputRefs = () => {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  return {
    addInput(element: HTMLInputElement | null, i: number) {
      refs.current[i] = element;
    },
    focusOnFirstInput() {
      setTimeout(() => {
        const newInput = refs.current[0];
        if (newInput) {
          newInput.focus();
        }
      });
    }
  };
};
