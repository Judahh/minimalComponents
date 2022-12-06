import React, { CSSProperties, useEffect, useRef } from 'react';
import useState from 'react-usestateref';
import { withTheme } from 'styled-components';
import { CollapsibleElement } from './styles';

const Collapsible = (props: {
  trigger;
  children;
  before;
  after;
  wholeClick?: boolean;
  animationTime?: number;
  animationDelay?: number;
  style?: CSSProperties;
  collapsibleStyle?: CSSProperties;
}) => {
  const [style, setStyle] = useState<CSSProperties>(
    props.style || { width: '100%' }
  );
  const [collapsibleStyle, setCollapsibleStyle] = useState<CSSProperties>(
    props.collapsibleStyle || { width: '100%' }
  );
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState<undefined | number>(0);
  const ref = useRef<any>(null);
  //   const [display, setDisplay] = useState('none');
  const [animationTime, _setAnimationTime] = useState(
    props.animationTime || 0.5
  );
  const [animationDelay, _setAnimationDelay] = useState(
    props.animationDelay || 0
  );

  useEffect(() => {
    setHeight(ref?.current?.clientHeight);
  });

  useEffect(() => {
    setStyle(props.style || { width: '100%' });
  }, [props.style]);

  useEffect(() => {
    setCollapsibleStyle(props.collapsibleStyle || { width: '100%' });
  }, [props.collapsibleStyle]);

  return (
    <div style={style}>
      <div
        style={{ display: 'flex' }}
        onClick={() => (props.wholeClick ? setOpen(!open) : undefined)}
      >
        <div
          onClick={() =>
            props.before && !props.wholeClick ? setOpen(!open) : undefined
          }
        >
          {props.before
            ? React.cloneElement(props.before, { open })
            : undefined}
        </div>
        {props.trigger}
        <div
          onClick={() =>
            props.after && !props.wholeClick ? setOpen(!open) : undefined
          }
        >
          {props.after ? React.cloneElement(props.after, { open }) : undefined}
        </div>
      </div>
      <CollapsibleElement
        time={animationTime}
        delay={animationDelay}
        className={open ? 'openned' : 'closed'}
        contentHeight={height}
      >
        <div ref={ref} style={collapsibleStyle}>
          {props?.children}
        </div>
      </CollapsibleElement>
    </div>
  );
};
export default withTheme(Collapsible);
