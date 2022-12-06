import React, { CSSProperties } from 'react';
import { withTheme } from 'styled-components';

// import { SwipeAction } from 'react-swipeable-list';
import { ActionContent } from './styles';

const Action = (props: {
  destructive?: boolean;
  onClick?;
  style?: CSSProperties;
  children?;
  closeItem?;
  destroyItem?;
  closeDelay?: number;
  destroyDelay?: number;
}) => {
  return (
    <ActionContent
      style={props.style}
      onClick={(...args) => {
        if (props.onClick != undefined) {
          const r = props.onClick(...args);
          // console.log('d', props.destructive, props?.destroyItem, props?.closeItem);
          if (props.destructive)
            setTimeout(() => {
              props?.destroyItem(true);
            }, props.destroyDelay);
          else
            setTimeout(() => {
              props?.closeItem(true);
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
