import React, { CSSProperties, useEffect } from 'react';
import useState from 'react-usestateref';
import { withTheme } from 'styled-components';

import { SwipeAction } from 'react-swipeable-list';
import { ActionContent } from './styles';

const Action = (props: {
  destructive?: boolean;
  onClick?;
  style?: CSSProperties;
  children;
  key;
}) => {
  const [destructive, setDestructive] = useState(props.destructive);
  const [onClick, setOnClick] = useState(props.onClick);
  const [style, setStyle] = useState(props.style);

  useEffect(() => {
    setDestructive(props.destructive);
  }, [props.destructive]);

  useEffect(() => {
    setOnClick(props.onClick);
  }, [props.onClick]);

  useEffect(() => {
    setStyle(props.style);
  }, [props.style]);

  return (
    <SwipeAction key={props.key} onClick={onClick} destructive={destructive}>
      <ActionContent style={style}>{props.children}</ActionContent>
    </SwipeAction>
  );
};

export default withTheme(Action);
