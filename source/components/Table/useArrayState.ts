import { useEffect } from 'react';
import useObjectState, { getValues } from './useObjectState';

const getMappedValues = (array?: any[]) => {
  return  array?.map?.((item) => getValues(item))?.flat?.() || [];
}

const useArrayState = (array?: any[]) => {
  const [state, setState, updateObject] = useObjectState(array);

  const add = (object) => {
    setState(current => [...(current || []), object]);
  };

  const update = (index?: number, object?) => {
    updateObject(index, object);
  };

  const remove = (index?: number) => {
    setState(current => current?.splice?.(index || 0, 1));
  };

  useEffect(() => {
    setState(array);
  }, [array, ...(array||[]), ...getMappedValues(array)]);

  return [state, setState, add, update, remove];
}

export default useArrayState;