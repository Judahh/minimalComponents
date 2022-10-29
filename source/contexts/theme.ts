/* eslint-disable no-unused-vars */
import { createContext } from 'react';

const createThemeContext = <Theme>() => createContext<
  | {
      setTheme: (newTheme?: Theme) => void;
    }
  | undefined
>({
  setTheme: () => {},
});

export { createThemeContext };
