import React, { CSSProperties, forwardRef, useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
import { Wrapper, Center } from '../../Content';
import { Text } from '../../Text';

const Animation = forwardRef((props: {
  Animation;
  setLoading;
  alt?: string;
  loading;
  progress?: number;
  progress2?: number;
  Element?;
  anti?: boolean;
  type?: string;
  limitationType?: string;
  duration?: number;
  delay?: number;
  from?: string;
  to?: string;
  move?: { x?: string; y?: string };
  scale?: { x?: number; y?: number };
  wrapperStyle?: CSSProperties;
  centerStyle?: CSSProperties;
  crude?: boolean;
  // ref: any;
}, ref) => {
  const [newProps, _setNewProps] = useState({
    ...props,
    Animation: undefined,
    Element: undefined,
    children: undefined,
  });
  const passProps = (props) => {
    return (
      props.children &&
      React.Children.map(props.children, (child) => {
        const clone = React.cloneElement(child, {
          alt: props.alt || 'loading...',
          anti: props.anti,
        });
        return clone;
      })
    );
  };
  useEffect(() => {}, [props, ...Object.values(props)]);
  const animation = (
    <props.Animation {...newProps}>
      {passProps(props)}
      <>
        {props.progress && props.progress > 0 ? (
          <Text type={props.type} limitationType={props.limitationType}>
            {props.progress}%
          </Text>
        ) : (
          <></>
        )}
        {props.progress2 && props.progress2 > 0 ? (
          <Text type={props.type} limitationType={props.limitationType}>
            {props.progress2}%
          </Text>
        ) : (
          <></>
        )}
      </>
    </props.Animation>
  );
  return props.crude ? (
    <>{ animation }</>
  ) : (
    <Wrapper style={props?.wrapperStyle} ref={props.ref}>
      <Center style={props?.centerStyle}>{animation}</Center>
    </Wrapper>
  );
});

export default withTheme(Animation);
