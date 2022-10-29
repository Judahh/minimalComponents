/* eslint-disable no-unused-vars */
import { createContext } from 'react';

const createMenuContext = <Menu>() => createContext<
  | {
      setMenu: (newMenu?: number) => void;
      menu: number | undefined;
      menus: Array<Menu> | undefined;
    }
  | undefined
>({
  setMenu: () => {},
  menu: undefined,
  menus: [],
});

export { createMenuContext };
