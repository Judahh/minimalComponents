import { Dispatch, SetStateAction, useEffect, useState } from 'react';
const getValues = <T>(object?: T) => {
  const values: any[] = [];
  if (object)
    Object.keys(object).forEach((key) => {
      values.push(object[key].value);
    });
  return values;
}

const useObjectState = <T>(object?: T): [T | undefined, Dispatch<SetStateAction<T | undefined>>, (indexes?: (string | number)[], value?) => void, (indexes?: (string | number)[]) => void] => {
  const [state, setState] = useState<T | undefined>(object);

  const flat = (object?: any): any[] => {
    if (object != undefined) {
      if (Array.isArray(object)) {
        return object.flat();
      } else if (typeof object === 'object') {
        return Object.values(object);
      }
    }
    return [];
  }

  const flatAll = (object?: T) : any[] => {
    if (object != undefined) {
      let array: any[] | undefined = undefined;
      if (Array.isArray(object)) {
        array = object;
      } else if (typeof object === 'object') {
        array = Object.values(object);
      } else {
        return [object];
      }
      const first = array[0];
      if (Array.isArray(first) || typeof first === 'object')
        return flat(array.map(anObject => flatAll(anObject)));
      else
        return [object];
    }
    return [];
  }

  const update = (indexes?: (string | number)[], value?, current?) => {
    console.log('update object:', indexes, value, current);
    current = current || state;
    const update = JSON.parse(JSON.stringify(current));
    if (indexes && indexes.length > 0) {
      if (indexes.length > 1) {
        return update(indexes.splice(0, 1), value, current[indexes[0]]);
      } else {
        current[indexes[0]] = value;
        const newState = JSON.parse(JSON.stringify(state));
        setState(newState);
      }
    }
    return update
  };

  const removeElement = (current?: T, index?: string | number): T => {
    if (current != undefined) {
      if (Array.isArray(current)) {
        return current?.splice?.(index != undefined ?
          (typeof index === 'number' ? index : 0) :
          0
        , 1) as unknown as T;
      } else if (typeof current === 'object') {
        delete current[index || 0];
        return current;
      }
    }
    return current as unknown as T;
  }

  const remove = (indexes?: (string | number)[], current?) => {
    current = current || state;
    const update = JSON.parse(JSON.stringify(current));
    if (indexes && indexes.length > 0) {
      if (indexes.length > 1) {
        return remove(indexes.splice(0, 1), current[indexes[0]]);
      } else {
        removeElement(current, indexes[0])
        const newState = JSON.parse(JSON.stringify(state));
        setState(newState);
      }
    }
    return update
  };

  useEffect(() => {
    setState(object);
  }, [object, ...getValues<T>(object), ...flatAll(object)]);

  return [state, setState, update, remove];
}

export { getValues };
export default useObjectState;