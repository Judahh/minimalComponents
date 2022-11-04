import React, { CSSProperties, useEffect } from 'react';
import useState from 'react-usestateref';
import { withTheme } from 'styled-components';

import { SwipeAction } from 'react-swipeable-list';
import { ActionContent } from './styles';
import { baseAction } from './util';

const Action = (props: {
  destructive?: boolean;
  onClick?;
  style?: CSSProperties;
  children?;
  key?;
  index?;
  state?;
  lastIndex?;
  lastState?;
}) => {
  const [destructive, setDestructive] = useState(props.destructive);
  const [onClick, setOnClick] = useState(props.onClick);
  const [style, setStyle] = useState(props.style);
  const [index, setIndex] = useState(props.index);
  const [state, setState] = useState(props.state);
  const [_lastIndex, setLastIndex] = useState(props.lastIndex);
  const [_lastState, setLastState] = useState(props.lastState);

  useEffect(() => {
    setDestructive(props.destructive);
  }, [props.destructive]);

  useEffect(() => {
    setOnClick(props.onClick);
  }, [props.onClick]);

  useEffect(() => {
    setStyle(props.style);
  }, [props.style]);

  useEffect(() => {
    setIndex(props.index);
  }, [props.index]);

  useEffect(() => {
    setState(props.state);
  }, [props.state]);

  useEffect(() => {
    setLastIndex(props.lastIndex);
  }, [props.lastIndex]);

  useEffect(() => {
    setLastState(props.lastState);
  }, [props.lastState]);

  return (
    <SwipeAction
      key={props.key}
      onClick={(...args) => {
        if (onClick) {
          const currentIndex = index;
          const currentState = state;
          const lastIndex = currentIndex;
          const lastState = currentState;
          return baseAction(
            state,
            setState,
            setLastState,
            index,
            setIndex,
            setLastIndex,
            onClick,
            ...args,
            currentState,
            currentIndex,
            lastState,
            lastIndex
          );
        }
      }}
      destructive={destructive}
    >
      <ActionContent style={style}>{props.children}</ActionContent>
    </SwipeAction>
  );
};

export default withTheme(Action);
