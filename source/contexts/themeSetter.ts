/* eslint-disable no-unused-vars */
import { createContext } from 'react';

const createThemeSetterContext = <Theme>(
  setTheme?: (newTheme?: Theme) => void
) => createContext<
  | ((newTheme?: Theme) => void)
  | undefined
>(setTheme);

export { createThemeSetterContext };
