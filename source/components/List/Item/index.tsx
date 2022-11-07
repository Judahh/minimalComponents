import React, { useEffect, ReactElement, useRef } from 'react';
import useState from 'react-usestateref';

import { withTheme } from 'styled-components';
// import SwipeableStyledListItem from './swipeableStyledListItem';
// import {
//   LeadingActions,
//   TrailingActions,
//   Type as ListType,
// } from 'react-swipeable-list';
import { State } from './state';
import Animation from '../../Loading/Animation';
import { Hitting } from '../../Loading/Animation/styles';
import { Item, Leading, Trailing, Wrapper } from './styles';

const ListItem = (props: {
  theme;
  leading?: ReactElement;
  trailing?: ReactElement;
  key;
  id;
  // type?: ListType;
  fullSwipe?: boolean;
  threshold?: number;
  holdThreshold?: number;
  search?: string;
  vertical?: boolean;
  setSearch?;
  children?;
  onClick?;
  onHold?;
}) => {
  // console.log('Product props', props);
  const [start, setStart] = useState(undefined);
  const [_current, setCurrent] = useState(undefined);
  const [vertical, _setVertical] = useState(props.vertical || false);
  const [swipe, setSwipe] = useState(0);
  const itemRef = useRef<any>(null);
  const [state, setState] = useState(State.NONE);
  const [_lastState, setLastState] = useState(State.NONE);
  const [_index, _setIndex] = useState<number | undefined>(undefined);
  const [_lastIndex, _setLastIndex] = useState<number | undefined>(undefined);
  // const [type, _setType] = useState(props.type);
  const [_fullSwipe, _setFullSwipe] = useState(props.fullSwipe);
  const [threshold, _setThreshold] = useState(props?.threshold || 0.3);
  const [_holdThreshold, _setHoldThreshold] = useState(
    props?.holdThreshold || 1
  );
  const [_holdTimeout, _setHoldTimeout] = useState<any>(undefined);

  useEffect(() => {}, [props.search, props?.setSearch]);

  // @ts-ignore
  const actionSwipeStart = (direction?: string) => {
    console.log('actionSwipeStart', direction);
    if (direction === 'right') {
      setState(State.LEADING);
    } else if (direction === 'left') {
      setState(State.TRAILING);
    }
  };

  // @ts-ignore
  const actionsWithState = (actions?: ReactElement[], state?: State) => {
    // console.log('actions', actions);
    return actions?.map?.((action, index) => {
      // console.log('action', action);
      if (action != undefined && state != undefined) {
        // console.log('action', action);
        const newProps = {
          key: index,
          ...action.props,
          state,
          index,
        };

        const clone = React.cloneElement(action, newProps);
        // console.log('action clone', clone);
        return clone;
      }
      return undefined;
    });
  };

  // const leadingActions = () => {
  //   console.log(
  //     'leadingActions',
  //     props.leading,
  //     props.leading?.props?.children
  //   );
  //   const actions = actionsWithState(
  //     props.leading?.props?.children != undefined &&
  //       Array.isArray(props.leading?.props?.children)
  //       ? props.leading?.props?.children
  //       : props.leading != undefined
  //       ? [props.leading]
  //       : undefined,
  //     State.LEADING
  //   );
  //   console.log('leadingActions', actions);
  //   return actions && actions?.length > 0 ? (
  //     <LeadingActions>{actions}</LeadingActions>
  //   ) : undefined;
  // };

  // const trailingActions = () => {
  //   const actions = actionsWithState(
  //     props.trailing?.props?.children != undefined &&
  //       Array.isArray(props.trailing?.props?.children)
  //       ? props.trailing?.props?.children
  //       : props.trailing != undefined
  //       ? [props.trailing]
  //       : undefined,
  //     State.TRAILING
  //   );
  //   console.log('trailingActions', actions);
  //   return actions && actions?.length > 0 ? (
  //     <TrailingActions>{actions}</TrailingActions>
  //   ) : undefined;
  // };

  // @ts-ignore
  const changeState = (newState: State) => {
    setLastState(state);
    setState(newState);
  };

  // const item = (
  //   // @ts-ignore
  //   <SwipeableStyledListItem
  //     key={props.key}
  //     blockSwipe={false}
  //     type={type}
  //     listType={type}
  //     fullSwipe={fullSwipe}
  //     threshold={threshold}
  //     scrollStartThreshold={50}
  //     leadingActions={leadingActions()}
  //     trailingActions={trailingActions()}
  //     onSwipeStart={actionSwipeStart}
  //     onSwipeEnd={() => setState(State.NONE)}
  //   >
  //     <div
  //       style={{ width: '100%', boxSizing: 'border-box' }}
  //       onMouseUp={(event) => {
  //         console.log('Mouse up', state);
  //         clearTimeout(holdTimeout);
  //         setHoldTimeout(undefined);
  //         let result;
  //         if (state == State.HOLD) {
  //           if (props?.onHold != undefined)
  //             result = props?.onHold(state, index, event);
  //         } else {
  //           if (props?.onClick != undefined)
  //             result = props?.onClick(state, index, event);
  //         }
  //         changeState(State.CLICK);
  //         changeState(State.NONE);
  //         // console.log('State', State[state]);
  //         return result;
  //       }}
  //       onMouseDown={() => {
  //         console.log('Mouse down', state);
  //         if (state == State.NONE) {
  //           setHoldTimeout(
  //             setTimeout(() => {
  //               changeState(State.HOLD);
  //             }, 1000 * holdThreshold)
  //           );
  //         }
  //       }}
  //       onMouseLeave={() => {
  //         console.log('Mouse leave', state);
  //         clearTimeout(holdTimeout);
  //         setHoldTimeout(undefined);
  //         if (state == State.HOLD) {
  //           changeState(State.NONE);
  //         }
  //       }}
  //       // onClick={() => {
  //       //   console.log('CLICK', state);
  //       // }}
  //     >
  //       {props.children}
  //     </div>
  //   </SwipeableStyledListItem>
  // );

  const onMove = (event: any, touch?: boolean) => {
    const cur = vertical ? event.clientY : event.clientX;
    console.log('onMove', cur, start, event, touch);
    setCurrent(cur);
  };

  const onMouseMove = (event: any) => onMove(event, false);

  const onTouchMove = (event: any) => onMove(event, true);

  const onStart = (event: any, touch?: boolean) => {
    const sta = vertical ? event.clientY : event.clientX;
    console.log('onStart', sta, event, touch);
    setStart(sta);
    itemRef?.current?.addEventListener(
      touch ? 'touchmove' : 'mousemove',
      touch ? onTouchMove : onMouseMove
    );
    itemRef?.current?.addEventListener(
      touch ? 'touchcancel' : 'mouseleave',
      touch ? onTouchLeave : onMouseLeave
    );
  };

  const onEnd = (event: any, touch?: boolean) => {
    console.log('onEnd', event, touch);
    if (start != undefined) {
      setStart(undefined);

      if (swipe < itemRef?.current?.offsetWidth * threshold * -1) {
        setSwipe(-itemRef?.current?.offsetWidth * 2);
        // this.wrapper.style.maxHeight = 0;
        onSwiped(event, touch);
      } else {
        setSwipe(0);
      }

      // this.listElement.className = "BouncingListItem";
      // this.listElement.style.transform = `translateX(${swipe}px)`;
    }

    itemRef?.current?.removeEventListener(
      touch ? 'touchmove' : 'mousemove',
      touch ? onTouchMove : onMouseMove
    );
    itemRef?.current?.removeEventListener(
      touch ? 'touchcancel' : 'mouseleave',
      touch ? onTouchLeave : onMouseLeave
    );
  };

  const onSwiped = (_event: any, _touch?: boolean) => {
  };

  const onMouseLeave = (event: any) => onLeave(event, false);

  const onTouchLeave = (event: any) => onLeave(event, true);

  const onLeave = (_event: any, touch?: boolean) => {
    // console.log('onLeave', event, touch);
    setStart(undefined);
    itemRef?.current?.removeEventListener(
      touch ? 'touchmove' : 'mousemove',
      touch ? onTouchMove : onMouseMove
    );
  };

  const item = (
    <Wrapper>
      {/*ref={(div) => (this.background = div)}*/}
      <Leading>{props?.leading}</Leading>
      {/*ref={(div) => (this.background = div)}*/}
      <Trailing>{props?.trailing}</Trailing>
      {/*ref={(div) => (this.listElement = div)}*/}
      <Item
        ref={itemRef}
        onMouseDown={onStart}
        onMouseUp={onEnd}
        // onMouseLeave={onLeave}
        // onMouseMove={onMove}
        onTouchStart={(event) => onStart(event, true)}
        onTouchEnd={(event) => onEnd(event, true)}
        // onTouchCancel={(event) => onLeave(event, true)}
        // onTouchMove={(event) => onMove(event, true)}
      >
        {props?.children}
      </Item>
    </Wrapper>
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
