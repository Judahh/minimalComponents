import {
  Dispatch,
  SetStateAction,
  // useEffect,
  useState
} from 'react';
const getValues = <T>(object?: T) => {
  const values: any[] = [];
  if (object)
    Object.keys(object).forEach((key) => {
      values.push(object[key].value);
    });
  return values;
}

const removeElement = <T>(current?: T, index?: string | number): T => {
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

const flatAll = <T>(object?: T) : any[] => {
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

const useObjectState = <T>(object?: T): [T | undefined, Dispatch<SetStateAction<T | undefined>>, (indexes?: (string | number)[], value?) => void, (indexes?: (string | number)[]) => void] => {
  const [state, setState] = useState<T | undefined>(object);
  console.log('useObjectState', state);

  const update = (indexes?: (string | number)[], value?, current?, root?) => {
    current = current || JSON.parse(JSON.stringify(state));
    root = root || current;
    console.log('update object:', indexes, value, current, root);
    if (indexes && indexes.length > 0) {
      if (indexes.length > 1) {
        return update(indexes.splice(0, 1), value, current[indexes[0]], root);
      } else {
        current[indexes[0]] = value;
        const newState = JSON.parse(JSON.stringify(root));
        setState(newState);
        return newState;
      }
    }
    return root;
  };

  const remove = (indexes?: (string | number)[], current?, root?) => {
    current = current || JSON.parse(JSON.stringify(state));
    root = root || current;
    if (indexes && indexes.length > 0) {
      if (indexes.length > 1) {
        return remove(indexes.splice(0, 1), current[indexes[0]], root);
      } else {
        removeElement(current, indexes[0])
        const newState = JSON.parse(JSON.stringify(root));
        setState(newState);
        return newState;
      }
    }
    return root
  };

  // useEffect(() => {
  //   setState(object);
  // }, [object]);
  console.log('useObjectState', state, setState, update, remove);
  return [state, setState, update, remove];
}

export { getValues };
export default useObjectState;