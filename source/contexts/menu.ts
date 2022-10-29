/* eslint-disable no-unused-vars */
import { createContext } from 'react';

const createMenuContext = <Menu>(value:{
  setMenu: (newMenu?: number) => void;
  menu: number | undefined;
  menus: Array<Menu> | undefined;
}) => createContext<
  | {
      setMenu?: (newMenu?: number) => void;
      menu?: number;
      menus?: Array<Menu>;
    }
  | undefined
>(value);

export { createMenuContext };
