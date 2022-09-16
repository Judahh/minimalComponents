
import { Children, cloneElement } from 'react';

const genPath = (name: string, value?: unknown | unknown[]) => {
  return value != undefined
    ? Array.isArray(value)
      ? name + '%5B%5D=' + value.join('&' + name + '%5B%5D=')
      : name + '=' + value
    : undefined;
};

const getPath = (oldPath?: string): string => {
  return oldPath != undefined && oldPath?.length > 0
    ? `${oldPath}&`
    : '?';
};

const addPath = (oldPath?: string, addPath?: string) => {
  // console.log('get addPath', oldPath, '-', addPath);
  return addPath != undefined && addPath != ''
    ? getPath(oldPath) + addPath
    : oldPath;
};

const toOption = (element?: { name }, index?) => {
  return { value: index, label: element?.name, ...element } as any;
};

const toOptions = (array?: Array<{ name }> | { name }) => {
  return array && Array.isArray(array) ? array.map(toOption) : toOption(array);
};

const passProps = (properties, handleToken, currentTheme, currentLanguage, title, setTitle, search, setSearch,) => {
  return (
    properties.children &&
    Children.map(properties.children, (child) => {
      return cloneElement(child, {
        handleToken: handleToken,
        theme: currentTheme,
        language: currentLanguage,
        title: title || child?.props?.title,
        setTitle: setTitle || child?.props?.setTitle,
        search: search || child?.props?.search,
        setSearch: setSearch || child?.props?.setSearch
      });
    })
  );
};

const getPaths = (pathname) => {
  const names = JSON.parse(JSON.stringify(pathname?.split('/')));
  for (let index = 0; index < names?.length || 0; index++) {
    const name = names[index];
    if(!name || name.trim() === ''){
      names.splice(index, 1);
      index--;
    }
  }
  return names;
}

const notInPages = (pathname, pages) => {
  const names = JSON.parse(JSON.stringify(pathname?.split('/')));
  for (const name of names) {
    if(pages[name])
      return false;
  }
  return true;
}

const cleanFromObject = (object, toClean) => {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const element: string = object[key].replace('/','');
      // console.log('getElement', element);
      if (toClean == element)
        toClean = undefined;
    }
  }
  return toClean;
};

export { genPath, getPath, addPath, toOption, toOptions, passProps, getPaths, notInPages, cleanFromObject };
