import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import {
  ToggleHolder,
} from './styles';
import { withTheme } from 'styled-components';

const ToggleButton = (props: { children?:any[]; drawerState?: [boolean|undefined, React.Dispatch<React.SetStateAction<boolean|undefined>>]; onClick?;}) => {
  console.log('ToggleButton', props?.drawerState?.[0], props?.drawerState);
  const state: [boolean|undefined, React.Dispatch<React.SetStateAction<boolean|undefined>>, any] = useState(props?.drawerState?.[0]);
  const passProps = (elements?:any[]) => {
    console.log('passProps', elements, props);

    return (
      elements &&
      React.Children.map(elements, (child) => {
        const newProps = {
          ...props,
          className: state?.[0] ? 'openned' : 'closed',
        };
        delete newProps.children
        const cloneChild = React.cloneElement(child, newProps);
        return cloneChild;
      })
    );
  };
  const [children, setChildren] = useState(props?.children ? passProps(props?.children) : (<></>));

  useEffect(() => {
    setChildren(props?.children ? passProps(props?.children) : (<></>));
  }, [props?.children, state?.[0]]);

  useEffect(() => {
    state?.[1](props?.drawerState?.[0]);
  }, [props?.drawerState?.[0]]);

  return (
    <ToggleHolder
      onClick={()=>{
        props?.onClick?.();
      }}
      className={state?.[0] ? 'openned': 'closed'}>
      {children}
    </ToggleHolder>
  );
};

export default withTheme(ToggleButton);
