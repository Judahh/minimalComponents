import React, { useState, useEffect, ReactElement } from 'react';

import { ActionContent } from './styles';
import { withTheme } from 'styled-components';
import SwipeableStyledListItem from './swipeableStyledListItem';
import {
  LeadingActions,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { State } from './state';
import { baseAction } from './action';
import Animation from '../../Loading/Animation';
import { Hitting } from '../../Loading/Animation/styles';

const ListItem = (props: {
  theme;
  leadings?: ReactElement[];
  trailings?: ReactElement[];
  setElements?;
  quantities?: { id }[];
  setQuantities?;
  key;
  id;
  type?: ListType;
  fullSwipe?: boolean;
  threshold?: number;
  holdThreshold?: number;
  search?: string;
  setSearch?;
  refresh?;
  navigate;
  location;
  children?;
  onClick?;
  onHold?;
}) => {
  // console.log('Product props', props);
  const [state, setState] = useState(State.NONE);
  const [lastState, setLastState] = useState(State.NONE);
  const [index, setIndex] = useState<number | undefined>(undefined);
  const [lastIndex, setLastIndex] = useState<number | undefined>(undefined);
  const [type, _setType] = useState(props.type);
  const [fullSwipe, _setFullSwipe] = useState(props.fullSwipe);
  const [threshold, _setThreshold] = useState(props?.threshold || 0.3);
  const [holdThreshold, _setHoldThreshold] = useState(
    props?.holdThreshold || 1
  );
  const [holdTimeout, setHoldTimeout] = useState<any>(undefined);

  useEffect(() => {}, [props.search, props?.setSearch]);

  // const actionClick = () => {
  //   console.log('Click');
  //   setState(State.CONSUME);
  //   if (state !== State.NONE) {
  //     console.log('Consume');
  //     console.log('product', product);
  //     serving(product?.id, true);
  //     props?.refresh?.();
  //   }
  // };

  const actionSwipeStart = () => {
    setState(State.NONE);
  };

  const remapActionsProps = (actions?: ReactElement[], state?: State) => {
    return React.Children.map?.(actions, (action, index) => {
      if (action && state) {
        const newProps = {
          ...action.props,
          onClick: (...args) => {
            const currentIndex = index;
            const currentState = state;
            const lastIndex = currentIndex;
            const lastState = currentState;
            baseAction(
              state,
              setState,
              setLastState,
              index,
              setIndex,
              setLastIndex,
              action.props?.onClick,
              ...args,
              currentState,
              currentIndex,
              lastState,
              lastIndex
            );
          },
        };

        const cloneChild = React.cloneElement(action, newProps);
        return cloneChild;
      }
      return undefined;
    });
  };

  const remapActionProps = (action: ReactElement, index: number) => {
    const onClick = action?.props?.onClick;
    const style = action?.props?.style;
    const newAction = React.cloneElement(action, {
      onClick: undefined,
      style: undefined,
    });
    return (
      <SwipeAction key={index} onClick={onClick}>
        <ActionContent style={style}>{newAction}</ActionContent>
      </SwipeAction>
    );
  };

  const leadingActions = () => {
    const actions = remapActionsProps(props.leadings, State.LEADING);
    return actions && actions?.length > 0 ? (
      <LeadingActions>{actions?.map(remapActionProps)}</LeadingActions>
    ) : undefined;
  };

  const trailingActions = () => {
    const actions = remapActionsProps(props.trailings, State.TRAILING);
    return actions && actions?.length > 0 ? (
      <TrailingActions>{actions?.map(remapActionProps)}</TrailingActions>
    ) : undefined;
  };

  const changeState = (newState: State) => {
    setLastState(state);
    setState(newState);
  };

  const item = (
    // @ts-ignore
    <SwipeableStyledListItem
      key={props.key}
      blockSwipe={false}
      type={type}
      listType={type}
      fullSwipe={fullSwipe}
      threshold={threshold}
      scrollStartThreshold={50}
      leadingActions={leadingActions()}
      trailingActions={trailingActions()}
      onSwipeStart={actionSwipeStart}
    >
      <div
        style={{ width: '100%', boxSizing: 'border-box' }}
        onMouseUp={(event) => {
          // console.log('Mouse up');
          clearTimeout(holdTimeout);
          setHoldTimeout(undefined);
          let result;
          if (state == State.HOLD) {
            if (props?.onHold != undefined)
              result = props?.onHold(state, index, event);
          } else {
            if (props?.onClick != undefined)
              result = props?.onClick(state, index, event);
          }
          changeState(State.CLICK);
          console.log('State', State[state]);
          return result;
          // if (actionClick != undefined) return actionClick();
        }}
        onMouseDown={() => {
          // console.log('Mouse down');
          setHoldTimeout(
            setTimeout(() => {
              changeState(State.HOLD);
            }, 1000 * holdThreshold)
          );
        }}
      >
        {props.children}
      </div>
    </SwipeableStyledListItem>
  );

  return state == State.HOLD ? (
    <Animation crude Animation={withTheme(Hitting)} style={{ width: '100%' }}>
      {item}
    </Animation>
  ) : (
    <>{item}</>
  );
};

export default withTheme(ListItem);
