import React, { ReactElement, RefObject } from 'react';

import { withTheme } from 'styled-components';
// import { Hitting } from '../../Loading/Animation/styles';
import { State } from './state';
// import SwipeableStyledListItem from './swipeableStyledListItem';
// import {
//   LeadingActions,
//   TrailingActions,
//   Type as ListType,
// } from 'react-swipeable-list';
import Animation from '../../Loading/Animation';
import { Hitting } from '../../Loading/Animation/styles';
import { Item, Wrapper } from './styles';
import Action from '../Action';

const scrollTo = (
  ref?: RefObject<HTMLDivElement>,
  to?: number,
  jump?: boolean,
  y?: boolean
) => {
  ref?.current?.scrollTo({
    left: y ? undefined : to,
    top: y ? to : undefined,
    behavior: jump ? 'auto' : 'smooth',
  });
};

type ListItemProps = {
  theme;
  leading?: ReactElement;
  trailing?: ReactElement;
  key;
  id;
  fullSwipe?: boolean;
  threshold?: number;
  holdThreshold?: number;
  fullSwipeThreshold?: number;
  search?: string;
  vertical?: boolean;
  setSearch?;
  children?;
  onClick?;
  onHold?;
  animationTime?: number;
};

type ListItemState = {
  leading?: ReactElement;
  trailing?: ReactElement;
  children?;
  start?: number;
  current?: number;
  vertical: boolean;
  state: State;
  lastState: State;
  index?: number;
  lastIndex?: number;
  fullSwipe: boolean;
  threshold: number;
  holdThreshold: number;
  holdTimeout: number;
  fullSwipeThreshold: number;
  defaultPosition: number;
  trailingPosition: number;
  leadingPosition: number;
  leadingSize: number;
  trailingSize: number;
  opositeSize: number;
  animationTime: number;
};

class ListItem extends React.Component<ListItemProps, ListItemState> {
  protected itemRef: RefObject<HTMLInputElement>;
  protected leadingRef: RefObject<HTMLInputElement>;
  protected trailingRef: RefObject<HTMLInputElement>;
  protected wrapperRef: RefObject<HTMLInputElement>;
  constructor(props) {
    super(props);
    this.itemRef = React.createRef();
    this.wrapperRef = React.createRef();
    this.leadingRef = React.createRef();
    this.trailingRef = React.createRef();
    this.state = {
      leading: this.passCallbacks(props.leading),
      trailing: this.passCallbacks(props.trailing),
      children: this.passCallbacksToChildren(props.children),
      start: undefined,
      current: undefined,
      vertical: props.vertical || false,
      state: State.NONE,
      lastState: State.NONE,
      index: undefined,
      lastIndex: undefined,
      fullSwipe: props.fullSwipe == undefined ? true : props.fullSwipe,
      threshold: props.threshold || 0.1,
      holdThreshold: props.holdThreshold || 1,
      holdTimeout: props.holdTimeout || 0.5,
      fullSwipeThreshold: props.fullSwipeThreshold || 0.5,
      leadingPosition: 0,
      defaultPosition: 0,
      trailingPosition: 0,
      leadingSize: 0,
      trailingSize: 0,
      opositeSize: 0,
      animationTime: props.animationTime || 0.25,
    };
  }

  public actionSwipeStart(direction?: string) {
    console.log('actionSwipeStart', direction);
    if (direction === 'right') {
      this.setState({ state: State.LEADING });
    } else if (direction === 'left') {
      this.setState({ state: State.TRAILING });
    }
  }

  public actionsWithState(actions?: ReactElement[], state?: State) {
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
  }

  public changeState(newState: State) {
    this.setState({ lastState: this.state.state });
    this.setState({ state: newState });
  }

  public onMove(event: any, _touch?: boolean) {
    const current = this.state.vertical ? event.clientY : event.clientX;
    // console.log('onMove', current, this.state.start);
    if (this.state.start != undefined) {
      const diff = current - this.state.start;
      let currentState = this.state.state;
      if (diff > 0) {
        currentState = State.LEADING;
      } else {
        currentState = State.TRAILING;
      }
      if (
        this.state.leadingSize > 0 &&
        this.leadingRef?.current?.style &&
        currentState == State.LEADING &&
        Math.abs(diff) > this.state.leadingSize
      ) {
        this.leadingRef.current.style.width = `${Math.abs(diff)}px`;
        if (this.itemRef?.current?.style)
          this.itemRef.current.style.transform = `translateX(${Math.abs(
            diff - this.state.leadingSize
          )}px)`;
      }
      if (
        this.state.trailingSize > 0 &&
        this.trailingRef?.current?.style &&
        currentState == State.TRAILING &&
        Math.abs(diff) > this.state.leadingSize
      ) {
        this.trailingRef.current.style.width = `${Math.abs(diff)}px`;
      }
      scrollTo(this.wrapperRef, this.state.defaultPosition - diff, true);
    }
    this.setState({ current });
  }

  public onMouseMove(event: any) {
    return this.onMove(event, false);
  }

  public onTouchMove(event: any) {
    return this.onMove(event, true);
  }

  public onStart(event: any, touch?: boolean) {
    const start = this.state.vertical ? event.clientY : event.clientX;
    console.log('onStart', start, event, touch);
    this.setState({ start });
    this.addMove(touch);
    // this.addLeave(touch);
  }

  public onEnd(event: any, touch?: boolean) {
    const start = this.state.start || 0;
    const current = this.state.current || 0;
    const swipe = current - start;
    let currentState = this.state.state;
    if (swipe > 0) {
      currentState = State.LEADING;
    } else {
      currentState = State.TRAILING;
    }
    const lengthWalked = Math.abs(swipe);
    const lengthTotal =
      (currentState === State.LEADING
        ? this.state.leadingSize
        : this.state.trailingSize) || lengthWalked;
    const walked = lengthWalked / lengthTotal;
    const currentSize =
      currentState === State.LEADING
        ? this.state.leadingSize
        : this.state.trailingSize;
    if (currentSize > 0 && walked > this.state.threshold) {
      this.setState({ state: currentState });

      if (this.state.fullSwipe && walked > this.state.fullSwipeThreshold) {
        this.onFullSwiped(event, currentState);
      } else {
        this.onSwiped(event, currentState);
      }

      // this.listElement.className = "BouncingListItem";
      // this.listElement.style.transform = `translateX(${swipe}px)`;
    } else {
      this.close();
    }

    if (this.leadingRef?.current?.style) {
      this.leadingRef.current.style.width = `${this.state.leadingSize}px`;
    }

    if (this.trailingRef?.current?.style) {
      this.trailingRef.current.style.width = `${this.state.trailingSize}px`;
    }

    if (this.itemRef?.current?.style) {
      this.itemRef.current.style.transform = `translateX(${0}px)`;
    }

    this.removeMove(touch);
    // this.removeLeave(touch);
  }

  public onSwiped(event: any, state: State) {
    console.log('onSwiped', event, state);
    switch (state) {
      case State.LEADING:
        scrollTo(this.wrapperRef, this.state.leadingPosition);
        break;
      case State.TRAILING:
        scrollTo(this.wrapperRef, this.state.trailingPosition);
        break;
    }
  }

  public onFullSwiped(event: any, state: State) {
    console.log('onFullSwiped', event, state);
    switch (state) {
      case State.LEADING:
        const first = this.leadingRef?.current?.firstElementChild as HTMLInputElement;
        first?.click();
        break;
      case State.TRAILING:
        const last = this.trailingRef?.current?.lastElementChild as HTMLInputElement;
        last?.click();
        break;
    }
    // this.close();
  }

  public close(_isButton?: boolean) {
    // console.log('close', isButton);
    scrollTo(this.wrapperRef, this.state.defaultPosition);
  }

  public destroy(_isButton?: boolean) {
    // console.log('destroy', isButton);
    scrollTo(this.wrapperRef, this.state.trailingPosition);
    if(this.wrapperRef?.current)
      this.wrapperRef.current.style.maxHeight = '0px';
    setTimeout(() => {
      // console.log('destroy timeout');
      if(this.wrapperRef?.current)
        this.wrapperRef?.current?.remove();
    }, this.state.animationTime * 1000);
  }

  public passCallbacksToChildren(children?: ReactElement) {
    const childrenWithProps = React.Children.map(children, (child) => {
      return child != undefined ? React.cloneElement<typeof Action>(child, {
        destroy: this.destroy.bind(this),
        close: this.close.bind(this),
      }) : child;
    });
    return childrenWithProps;
  }

  public passCallbacks(block?: ReactElement) {
    const childrenWithProps = React.Children.map(block?.props?.children, (child) => {
      const newChild = child != undefined ? React.cloneElement<typeof Action>(child, {
        destroy: this.destroy.bind(this),
        close: this.close.bind(this),
      }) : child

      console.log('child', child?.props, newChild?.props);
      return newChild;
    });
    console.log('passCallbacks', childrenWithProps);
    return childrenWithProps;
  }

  public onMouseLeave(event: any) {
    return this.onLeave.bind(this)(event, false);
  }

  public onTouchLeave(event: any) {
    return this.onLeave.bind(this)(event, true);
  }

  public onLeave = (_event: any, touch?: boolean) => {
    // console.log('onLeave', event, touch);
    this.setState({ state: State.NONE });
    this.removeMove(touch);
  };

  protected onTouchMoveBinded = this.onTouchMove.bind(this);
  protected onMouseMoveBinded = this.onMouseMove.bind(this);
  protected onTouchLeaveBinded = this.onTouchLeave.bind(this);
  protected onMouseLeaveBinded = this.onMouseLeave.bind(this);

  public addMove(touch?: boolean) {
    this.wrapperRef?.current?.addEventListener(
      touch ? 'touchmove' : 'mousemove',
      touch ? this.onTouchMoveBinded : this.onMouseMoveBinded
    );
  }

  // public addLeave(touch?: boolean) {
  //   this.wrapperRef?.current?.addEventListener(
  //     touch ? 'touchcancel' : 'mouseleave',
  //     touch ? this.onTouchLeaveBinded : this.onMouseLeaveBinded
  //   );
  // }

  public removeMove(touch?: boolean) {
    this.wrapperRef?.current?.removeEventListener(
      touch ? 'touchmove' : 'mousemove',
      touch ? this.onTouchMoveBinded : this.onMouseMoveBinded
    );
  }

  // public removeLeave(touch?: boolean) {
  //   this.wrapperRef?.current?.removeEventListener(
  //     touch ? 'touchcancel' : 'mouseleave',
  //     touch ? this.onTouchLeaveBinded : this.onMouseLeaveBinded
  //   );
  // }

  public item() {
    return (
      <Wrapper
        time={this.state.animationTime}
        ref={this.wrapperRef}
        onMouseDown={(event) => this.onStart.bind(this)(event, false)}
        onMouseUp={(event) => this.onEnd.bind(this)(event, false)}
        // onMouseLeave={this.onLeave}
        // onMouseMove={this.onMove}
        onTouchStart={(event) => this.onStart.bind(this)(event, true)}
        onTouchEnd={(event) => this.onEnd.bind(this)(event, true)}
        // onTouchCancel={(event) => this.onLeave(event, true)}
        // onTouchMove={(event) => this.onMove(event, true)}
      >
        {/*ref={(div) => (this.background = div)}*/}
        <Item className={'leading'} ref={this.leadingRef}>
          {this.state.leading}
        </Item>
        {/*ref={(div) => (this.background = div)}*/}
        <Item className={'main'} ref={this.itemRef}>
          {this.state.children}
        </Item>
        <Item className={'trailing'} ref={this.trailingRef}>
          {this.state.trailing}
        </Item>
        {/*ref={(div) => (this.listElement = div)}*/}
      </Wrapper>
    );
  }

  public componentDidMount() {
    const leadingSize = this.leadingRef?.current?.offsetWidth || 0;
    const trailingSize = this.trailingRef?.current?.offsetWidth || 0;
    const defaultPosition = leadingSize;
    const trailingPosition =
      defaultPosition + (this.itemRef?.current?.offsetWidth || 0);
    const opositeSize = this.itemRef?.current?.clientHeight || 0;
    this.setState({
      defaultPosition,
      trailingPosition,
      leadingSize,
      trailingSize,
      opositeSize,
    });
    if(this.wrapperRef?.current)
      this.wrapperRef.current.style.maxHeight = `${opositeSize}px`;
    // console.log('componentDidMount', defaultPosition, trailingPosition);

    scrollTo(this.wrapperRef, defaultPosition);
  }

  public render() {
    return this.state.state == State.HOLD ? (
      <Animation crude Animation={withTheme(Hitting)} style={{ width: '100%' }}>
        {this.item()}
      </Animation>
    ) : (
      <>{this.item()}</>
    );
  }
}

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

export default withTheme(ListItem);
