/* eslint-disable no-unused-vars */
import { createContext } from 'react';

const createThemeContext = <Theme>(value:{
  setTheme?: (newTheme?: Theme) => void;
}) => createContext<
  | {
      setTheme?: (newTheme?: Theme) => void;
    }
  | undefined
>(value);

export { createThemeContext };
