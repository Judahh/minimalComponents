import React, { CSSProperties, useEffect } from 'react';
import useState from 'react-usestateref';
import { withTheme } from 'styled-components';

// import { SwipeAction } from 'react-swipeable-list';
import { ActionContent } from './styles';

const Action = (props: {
  destructive?: boolean;
  onClick?;
  style?: CSSProperties;
  children?;
  close?;
  destroy?;
  closeDelay?: number;
  destroyDelay?: number;
}) => {
  return (
    <ActionContent
      style={props.style}
      onClick={(...args) => {
        if (props.onClick != undefined) {
          const r = props.onClick(...args);
          console.log('d', props.destructive, props?.destroy, props?.close);
          if (props.destructive)
            setTimeout(() => {
              props?.destroy(true);
            }, props.destroyDelay);
          else
            setTimeout(() => {
              props?.close(true);
            }, props.closeDelay);
          return r;
        }
      }}
    >
      {props.children}
    </ActionContent>
  );
};

export default withTheme(Action);
