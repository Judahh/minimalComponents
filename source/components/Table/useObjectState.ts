import { useEffect, useState } from 'react';
const getValues = (object?) => {
  const values: any[] = [];
  if(object)
    Object.keys(object).forEach((key) => {
      values.push(object[key].value);
    });
  return values;
}

const useObjectState = (object?) => {
  const [state, setState] = useState(object);

  const update = (index?: string, value?) => {
    setState(current => {
      if(index != undefined && current)
        current[index] = value;
      return current;
    });
  };

  useEffect(() => {
    setState(object);
  }, [object, ...getValues(object)]);

  return [state, setState, update];
}

export { getValues };
export default useObjectState;