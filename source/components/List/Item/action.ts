import { State } from './state';

const baseAction = async <T>(
  state: State,
  setState: (state: State) => void,
  setLastState: (state: State) => void,
  index: number | undefined,
  setIndex: (index: number | undefined) => void,
  setLastIndex: (index: number | undefined) => void,
  action?: ((...args) => Promise<T>) | ((...args) => T),
  ...args
): Promise<T| undefined> => {
  setState(state);
  setIndex(index);
  const result = action ? await action(...args, state, index) : undefined;
  setLastState(state);
  setLastIndex(index);
  setState(State.NONE);
  setIndex(undefined);
  return result;
};

export { baseAction };
