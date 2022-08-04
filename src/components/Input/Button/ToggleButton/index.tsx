import React from 'react';
import {
  ToggleHolder,
} from './styles';
import { withTheme } from 'styled-components';

const ToggleButton = (props: { children?:any[]; oppened?:boolean; }) => {

  const passProps = (elements?:any[]) => {
    return (
      elements &&
      React.Children.map(elements, (child) => {
        const newProps = {
          ...props,
          className: props.oppened ? 'active' : '',
        };
        delete newProps.children
        return React.cloneElement(child, newProps);
      })
    );
  };

  return (
    <ToggleHolder>
      {passProps(props?.children)}
    </ToggleHolder>
  );
};

export default withTheme(ToggleButton);
