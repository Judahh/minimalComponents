/* eslint-disable no-unused-vars */
import { createContext } from 'react';

const createHostContext = <Host>() => createContext<
  | {
      setHost: (newHost?: Host) => void;
      host: Host | undefined;
    }
  | undefined
>({
  setHost: () => {},
  host: undefined,
});

export { createHostContext };
