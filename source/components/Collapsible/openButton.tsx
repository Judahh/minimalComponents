import React from 'react';
import { withTheme } from 'styled-components';

const OpenButton = (props: {
  children;
  openned;
  open?: boolean;
  rotate?: boolean;
  rotation?: number;
  time?: number;
  delay?: number;
}) => {
  return (
    <div
      style={{
        transform: props.rotate
          ? `rotateZ(${props.open ? props.rotation || 0 : 0}deg)`
          : undefined,
        transition: `all ${props.time || 0}s linear ${props.delay || 0}s`,
      }}
    >
      {props.rotate
        ? props.children
        : props.open
        ? props.openned
        : props.children}
    </div>
  );
};
export default withTheme(OpenButton);
