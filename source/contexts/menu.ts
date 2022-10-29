/* eslint-disable no-unused-vars */
import { createContext } from 'react';

const createMenuContext = <Menu>(value?:{
  setMenu?: (newMenu?: number) => void;
  toggleMenu?: () => void;
  menu?: number;
  menus?: Array<Menu>;
}) => createContext<
  | {
      setMenu?: (newMenu?: number) => void;
      toggleMenu?: () => void;
      menu?: number;
      menus?: Array<Menu>;
    }
  | undefined
>(value);

export { createMenuContext };
