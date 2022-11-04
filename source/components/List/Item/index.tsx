import React, { useEffect, ReactElement } from 'react';
import useState from 'react-usestateref';

import { withTheme } from 'styled-components';
import SwipeableStyledListItem from './swipeableStyledListItem';
import {
  LeadingActions,
  TrailingActions,
  Type as ListType,
} from 'react-swipeable-list';
import { State } from './state';
import Animation from '../../Loading/Animation';
import { Hitting } from '../../Loading/Animation/styles';

const ListItem = (props: {
  theme;
  leadings?: ReactElement;
  trailings?: ReactElement;
  key;
  id;
  type?: ListType;
  fullSwipe?: boolean;
  threshold?: number;
  holdThreshold?: number;
  search?: string;
  setSearch?;
  children?;
  onClick?;
  onHold?;
}) => {
  // console.log('Product props', props);
  const [state, setState] = useState(State.NONE);
  const [_lastState, setLastState] = useState(State.NONE);
  const [index, _setIndex] = useState<number | undefined>(undefined);
  const [_lastIndex, _setLastIndex] = useState<number | undefined>(undefined);
  const [type, _setType] = useState(props.type);
  const [fullSwipe, _setFullSwipe] = useState(props.fullSwipe);
  const [threshold, _setThreshold] = useState(props?.threshold || 0.3);
  const [holdThreshold, _setHoldThreshold] = useState(
    props?.holdThreshold || 1
  );
  const [holdTimeout, setHoldTimeout] = useState<any>(undefined);

  useEffect(() => {}, [props.search, props?.setSearch]);

  const actionSwipeStart = () => {
    setState(State.SWIPING);
  };

  const actionsWithState = (actions?: ReactElement[], state?: State) => {
    return actions?.map?.((action, index) => {
      // console.log('action', action);
      if (action && state) {
        console.log('action', action);
        const newProps = {
          ...action.props,
          state,
          index,
        };

        const clone= React.cloneElement(action, newProps);
        console.log('action clone', clone);
        return clone;
      }
      return undefined;
    });
  };

  const leadingActions = () => {
    const actions = actionsWithState(props.leadings?.props?.children, State.LEADING);
    return actions && actions?.length > 0 ? (
      <LeadingActions>{actions}</LeadingActions>
    ) : undefined;
  };

  const trailingActions = () => {
    const actions = actionsWithState(props.trailings?.props?.children, State.TRAILING);
    return actions && actions?.length > 0 ? (
      <TrailingActions>{actions}</TrailingActions>
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
          // console.log('State', State[state]);
          return result;
        }}
        onMouseDown={() => {
          // console.log('Mouse down');
          if (state == State.NONE) {
            setHoldTimeout(
              setTimeout(() => {
                changeState(State.HOLD);
              }, 1000 * holdThreshold)
            );
          }
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
