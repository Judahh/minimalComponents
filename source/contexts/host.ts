/* eslint-disable no-unused-vars */
import { createContext } from 'react';

const createHostContext = <Host>(value?: {
  setHost?: (newHost?: Host) => void;
  host?: Host;
}) => createContext<
  | {
      setHost?: (newHost?: Host) => void;
      host?: Host;
    }
  | undefined
>(value);

export { createHostContext };
