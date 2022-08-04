import React from 'react';
import {
  ToggleHolder,
} from './styles';
import { withTheme } from 'styled-components';

const ToggleButton = (props: { children?:any[]; oppened?:boolean; onClick?;}) => {

  const passProps = (elements?:any[]) => {
    return (
      elements &&
      React.Children.map(elements, (child) => {
        const newProps = {
          ...props,
          className: props.oppened ? 'active' : '',
        };
        delete newProps.children
        const cloneChild = React.cloneElement(child, newProps);
        return cloneChild;
      })
    );
  };

  const children = props?.children ? passProps(props?.children) : (<></>);

  return (
    <ToggleHolder onClick={()=>{
        props.onClick();
      }}>
      {children}
    </ToggleHolder>
  );
};

export default withTheme(ToggleButton);
