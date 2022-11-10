import React, { ReactElement, RefObject } from 'react';

import { withTheme } from 'styled-components';
import { State } from './state';
import Animation from '../../Loading/Animation';
import { Hitting } from '../../Loading/Animation/styles';
import { Item as IW, Wrapper } from './styles';
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

type ItemProps = {
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
  onHoldEnd?;
  holdAnimation?: boolean;
  destroyAnimationTime?: number;
};

type ItemState = {
  leading?: ReactElement;
  trailing?: ReactElement;
  children?;
  start?: number;
  current?: number;
  vertical: boolean;
  state: State;
  index?: number;
  fullSwipe: boolean;
  threshold: number;
  holdThreshold: number;
  holdSwipeThreshold: number;
  holdTimeout?: NodeJS.Timeout;
  holdAnimation: boolean;
  fullSwipeThreshold: number;
  defaultPosition: number;
  trailingPosition: number;
  leadingPosition: number;
  leadingSize: number;
  trailingSize: number;
  opositeSize: number;
  destroyAnimationTime: number;
};

class Item extends React.Component<ItemProps, ItemState> {
  protected itemRef: RefObject<HTMLInputElement>;
  protected leadingRef: RefObject<HTMLInputElement>;
  protected trailingRef: RefObject<HTMLInputElement>;
  protected wrapperRef: RefObject<HTMLInputElement>;
  protected animationRef: RefObject<HTMLInputElement>;
  constructor(props) {
    super(props);
    this.itemRef = React.createRef();
    this.wrapperRef = React.createRef();
    this.animationRef = React.createRef();
    this.leadingRef = React.createRef();
    this.trailingRef = React.createRef();
    // console.log('vertical', props.vertical);

    this.state = {
      leading: this.passCallbacks(props.leading),
      trailing: this.passCallbacks(props.trailing),
      children: this.passCallbacksToChildren(props.children),
      start: undefined,
      current: undefined,
      vertical: props.vertical || false,
      state: State.NONE,
      index: undefined,
      fullSwipe: props.fullSwipe == undefined ? true : props.fullSwipe,
      threshold: props.threshold || 0.15,
      holdSwipeThreshold: props.holdSwipeThreshold || 0.1,
      fullSwipeThreshold: props.fullSwipeThreshold || 0.5,
      holdThreshold: props.holdThreshold || 0.5,
      holdAnimation:
        props.holdAnimation == undefined ? true : props.holdAnimation,
      holdTimeout: undefined,
      leadingPosition: 0,
      defaultPosition: 0,
      trailingPosition: 0,
      leadingSize: 0,
      trailingSize: 0,
      opositeSize: 0,
      destroyAnimationTime: props.destroyAnimationTime || 0.25,
    };
  }

  public onEvent(event: any, currentState: State) {
    // console.log('onEvent', this.state.state, currentState);
    if (currentState === State.CLICK) {
      if (
        this.state.state === State.LEADING ||
        this.state.state === State.TRAILING
      ) {
        this.setState({ state: State.NONE });
      } else {
        // console.log('e click');
        this.props.onClick?.(event);
      }
    } else if (currentState === State.HOLD_END) {
      // console.log('e hold end');
      this.props.onHoldEnd?.(event);
    } else {
      // scrollTo(this.animationRef, this.state.defaultPosition);
      // scrollTo(this.wrapperRef, this.state.defaultPosition);
      // console.log('e hold');
      this.props.onHold?.(event);
    }
  }

  public onMouseMove(event: any) {
    return this.onMove(event, false);
  }

  public onTouchMove(event: any) {
    return this.onMove(event, true);
  }

  public getCurrentSize(currentState?: State) {
    return currentState === State.LEADING
      ? this.state.leadingSize
      : currentState === State.TRAILING
      ? this.state.trailingSize
      : 0;
  }

  public hasSwiped(swipe?: number, threshold?: number) {
    threshold = threshold || this.state.threshold;
    const currentState = this.getState(swipe);

    const walked = this.calcWalked(swipe);

    const currentSize = this.getCurrentSize(currentState);

    return (
      (currentState === State.LEADING || currentState === State.TRAILING) &&
      currentSize > 0 &&
      walked > threshold
    );
  }

  public calcWalked(swipe?: number) {
    swipe = swipe || 0;
    let currentState = this.getState(swipe);

    const lengthWalked = Math.abs(swipe);
    const lengthTotal =
      (currentState === State.LEADING
        ? this.state.leadingSize
        : this.state.trailingSize) || lengthWalked;
    const walked = lengthWalked / lengthTotal;
    return walked;
  }

  public calcSwipe(start?: number, current?: number) {
    start = start || 0;
    current = current == undefined ? start : current;
    const swipe = current - start;
    // console.log('calcSwipe', start, current);
    return swipe;
  }

  public getState(swipe?: number) {
    let currentState;
    if (swipe == undefined || swipe === 0) {
      currentState = State.NONE;
    } else if (swipe > 0) {
      currentState = State.LEADING;
    } else if (swipe < 0) {
      currentState = State.TRAILING;
    }
    return currentState;
  }

  public isOverLeading(swipe?: number) {
    swipe = swipe || 0;
    let currentState = this.getState(swipe);
    return (
      this.state.leadingSize > 0 &&
      currentState === State.LEADING &&
      Math.abs(swipe) > this.state.leadingSize
    );
  }

  public isOverTrailing(swipe?: number) {
    swipe = swipe || 0;
    let currentState = this.getState(swipe);
    return (
      this.state.trailingSize > 0 &&
      currentState === State.TRAILING &&
      Math.abs(swipe) > this.state.leadingSize
    );
  }

  public resetStyles() {
    if (this.leadingRef?.current?.style) {
      this.leadingRef.current.style.width = `${this.state.leadingSize}px`;
    }

    if (this.trailingRef?.current?.style) {
      this.trailingRef.current.style.width = `${this.state.trailingSize}px`;
    }

    if (this.itemRef?.current?.style) {
      this.itemRef.current.style.transform = `translateX(${0}px)`;
    }
  }

  public clearHold() {
    clearTimeout(this.state.holdTimeout);
    this.setState({ holdTimeout: undefined });
  }

  public checkHold(swipe?: number) {
    if (this.hasSwiped(swipe, this.state.holdSwipeThreshold)) {
      this.clearHold();
    }
  }

  public onMove(event: any, _touch?: boolean) {
    const current = this.state.vertical ? event.clientY : event.clientX;
    // console.log('onMove', current, this.state.start);
    const swipe = this.calcSwipe(this.state.start, current);
    if (this.state.start != undefined) {
      if (this.leadingRef?.current?.style && this.isOverLeading(swipe)) {
        this.leadingRef.current.style.width = `${Math.abs(swipe)}px`;
        if (this.itemRef?.current?.style)
          this.itemRef.current.style.transform = `translateX(${Math.abs(
            swipe - this.state.leadingSize
          )}px)`;
      }
      if (this.trailingRef?.current?.style && this.isOverTrailing(swipe)) {
        this.trailingRef.current.style.width = `${Math.abs(swipe)}px`;
      }
      scrollTo(this.wrapperRef, this.state.defaultPosition - swipe, true);
    }
    this.checkHold(swipe);
    this.setState({ current });
  }

  public onStart(event: any, touch?: boolean) {
    // console.log('onStart', this.state.state);
    if (this.state.state === State.HOLD) {
      this.setState({ state: State.HOLD_END });
    } else {
      const start = this.state.vertical ? event.clientY : event.clientX;
      this.addMove(touch);
      const holdTimeout = setTimeout(() => {
        this.setState({ state: State.HOLD });
      }, this.state.holdThreshold * 1000);
      this.setState({ start, holdTimeout });
    }
    // this.addLeave(touch);
  }

  public onEnd(event: any, touch?: boolean) {
    this.clearHold();

    if (this.state.state === State.HOLD_END) {
      this.setState({
        state: State.NONE,
        start: undefined,
        current: undefined,
      });
      this.onEvent(event, State.HOLD_END);
    } else {
      const swipe = this.calcSwipe(this.state.start, this.state.current);

      let currentState = this.getState(swipe);

      const walked = this.calcWalked(swipe);

      const swiped = this.hasSwiped(swipe);

      // console.log('onEnd', swipe, walked);
      if (swiped) {
        // console.log('onEnd', swiped);
        if (this.state.fullSwipe && walked > this.state.fullSwipeThreshold) {
          this.onFullSwiped(event, currentState);
        } else {
          this.onSwiped(event, currentState);
        }
      } else {
        // console.log('onEnd close', swiped);
        this.close();
        if (this.state.state === State.HOLD) {
          currentState = State.HOLD;
        } else {
          currentState = State.CLICK;
        }
        this.onEvent(event, currentState);
      }
      this.setState({
        state: currentState,
        start: undefined,
        current: undefined,
      });
    }

    this.resetStyles();

    this.removeMove(touch);
    // this.removeLeave(touch);
  }

  public onSwiped(_event: any, state: State) {
    // console.log('onSwiped', event, state);
    switch (state) {
      case State.LEADING:
        scrollTo(this.wrapperRef, this.state.leadingPosition);
        break;
      case State.TRAILING:
        scrollTo(this.wrapperRef, this.state.trailingPosition);
        break;
    }
  }

  public onFullSwiped(_event: any, state: State) {
    // console.log('onFullSwiped', event, state);
    switch (state) {
      case State.LEADING:
        const first = this.leadingRef?.current
          ?.firstElementChild as HTMLInputElement;
        first?.click();
        break;
      case State.TRAILING:
        const last = this.trailingRef?.current
          ?.lastElementChild as HTMLInputElement;
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
    if (this.wrapperRef?.current)
      this.wrapperRef.current.style.maxHeight = '0px';
    setTimeout(() => {
      // console.log('destroy timeout');
      if (this.wrapperRef?.current) this.wrapperRef?.current?.remove();
    }, this.state.destroyAnimationTime * 1000);
  }

  public passCallbacksToChildren(children?: ReactElement) {
    const childrenWithProps = React.Children.map(children, (child) => {
      return child != undefined
        ? React.cloneElement<typeof Action>(child, {
            destroy: this.destroy.bind(this),
            close: this.close.bind(this),
          })
        : child;
    });
    return childrenWithProps;
  }

  public passCallbacks(block?: ReactElement) {
    const childrenWithProps = React.Children.map(
      block?.props?.children,
      (child) => {
        const newChild =
          child != undefined
            ? React.cloneElement<typeof Action>(child, {
                destroy: this.destroy.bind(this),
                close: this.close.bind(this),
              })
            : child;

        // console.log('child', child?.props, newChild?.props);
        return newChild;
      }
    );
    // console.log('passCallbacks', childrenWithProps);
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
        time={this.state.destroyAnimationTime}
        ref={this.wrapperRef}
        onMouseDown={(event) => this.onStart.bind(this)(event, false)}
        onMouseUp={(event) => this.onEnd.bind(this)(event, false)}
        // onMouseLeave={this.onLeave}
        // onMouseMove={this.onMove}
        onTouchStart={(event) => this.onStart.bind(this)(event, true)}
        onTouchEnd={(event) => this.onEnd.bind(this)(event, true)}
        // onTouchCancel={(event) => this.onLeave(event, true)}
        // onTouchMove={(event) => this.onMove(event, true)}
        className={this.state.vertical ? 'vertical' : 'horizontal'}
      >
        {/*ref={(div) => (this.background = div)}*/}
        <IW
          className={
            'leading'
            //  + this.state.vertical ? ' vertical' : ' horizontal'
          }
          ref={this.leadingRef}
        >
          {this.state.leading}
        </IW>
        {/*ref={(div) => (this.background = div)}*/}
        <IW
          className={
            'main'
            //  + this.state.vertical ? ' vertical' : ' horizontal'
          }
          ref={this.itemRef}
        >
          {this.state.children}
        </IW>
        <IW
          className={
            'trailing'
            //  + this.state.vertical ? ' vertical' : ' horizontal'
          }
          ref={this.trailingRef}
        >
          {this.state.trailing}
        </IW>
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
    if (this.wrapperRef?.current)
      this.wrapperRef.current.style.maxHeight = `${opositeSize}px`;

    scrollTo(this.wrapperRef, defaultPosition);

    // if (this.animationRef?.current) {
    //   this.animationRef.current.style.maxHeight = `${opositeSize}px`;
    //   this.animationRef.current.style.overflow = `hidden`;
    // }

    // scrollTo(this.animationRef, defaultPosition);
  }

  public componentDidUpdate(_prevProps, prevState) {
    if (
      this.state.state != prevState.state ||
      (this.state.state == State.HOLD &&
        ((this.state.start != prevState.start &&
          this.state.start == undefined) ||
          (this.state.current != prevState.current &&
            this.state.current == undefined)))
    ) {
      // console.log('componentDidUpdate', this.state.state);
      if (
        this.state.state !== State.TRAILING &&
        this.state.state !== State.LEADING
      ) {
        if (this.wrapperRef?.current)
          this.wrapperRef.current.style.maxHeight = `${this.state.opositeSize}px`;

        scrollTo(
          this.wrapperRef,
          this.state.defaultPosition,
          this.state.state >= State.HOLD
        );
      }
    }
    // else {
    //   console.log(
    //     'componentDidUpdate',
    //     this.state.state,
    //     prevState.state,
    //     this.state.start,
    //     prevState.start,
    //     this.state.current,
    //     prevState.current
    //   );
    // }
  }

  public render() {
    return this.state.holdAnimation && this.state.state === State.HOLD ? (
      <Animation
        ref={this.animationRef}
        crude
        Animation={withTheme(Hitting)}
        style={{ width: '100%' }}
      >
        {this.item()}
      </Animation>
    ) : (
      <>{this.item()}</>
    );
  }
}

export default withTheme(Item);
