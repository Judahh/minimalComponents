/* eslint-disable no-unused-vars */
import { createContext } from 'react';

const createThemeSetterContext = <Theme>(value?: {
  setTheme?: (newTheme?: Theme) => void;
  toggleTheme?: () => void;
}) =>
  createContext<
    | {
        setTheme?: (newTheme?: Theme) => void;
        toggleTheme?: () => void;
      }
    | undefined
  >(value);

export { createThemeSetterContext };
