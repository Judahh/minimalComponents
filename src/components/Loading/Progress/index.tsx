import React, { useEffect, useState } from "react";
import { ProgressText, Quantity } from "../../Text";
import { withTheme } from 'styled-components';

enum FlowType {
  leftToRight = 0,
  rightToLeft,
  bottomToTop,
  topToBottom,
};

type Flow = { x1:string, y1:string, x2:string, y2:string };

const getFlow = (flow, min, max): Flow | undefined => {
  const half = (min + max)/2;
  switch(flow){
    case FlowType.leftToRight:
      return { x1:`${min}`, y1:`${half}`, x2:`${max}`, y2:`${half}` };
    case FlowType.rightToLeft:
      return { x1:`${max}`, y1:`${half}`, x2:`${min}`, y2:`${half}` };
    case FlowType.bottomToTop:
      return { x1:`${half}`, y1:`${max}`, x2:`${half}`, y2:`${min}` };
    case FlowType.topToBottom:
      return { x1:`${half}`, y1:`${min}`, x2:`${half}`, y2:`${max}` };
    default: undefined;
  }
}

const SVGB = (props: {height: number; width: number, children?, style?}) => {
  useEffect(() => {
  }, [props, ...Object.values(props)]);
  const getProps = () => {
    const newProps = {};
    for (const key in props) {
      if (key !== 'height' &&
        key !== 'width' &&
        key !== 'children' &&
        key !== 'style' &&
        Object.prototype.hasOwnProperty.call(props, key)) {
        newProps[key] = props[key];
      }
    }
    return newProps;
  };
  return (<svg
    height="100%"
    width="100%"
    viewBox={`0 0 ${props.width} ${props.height}`}
    xmlns="http://www.w3.org/2000/svg"
    style={props.style}
    {...getProps()}
  >
    {props.children}
  </svg>);
};

const SVG = withTheme(SVGB);

const BarB = (props:{ style?, width?:number, height?:number, min:number, max:number, current: number, fillColor:string, time:number, id:number, flow: FlowType}) => {
  const [id] = useState('lg' + (props.id||0));
  const [time] = useState(props.time||1);
  const [max, setMax] = useState((props.max||1)/(props.max||1));
  const [min, setMin] = useState((props.min||0)/(props.max||1));
  const [current, setCurrent] = useState((props.current||props.max||1)/(props.max||1));
  const [flow, setFlow] = useState(getFlow(props.flow, (props.min||0)/(props.max||1), (props.max||1)/(props.max||1)));
  const [fillColor] = useState(props.fillColor||'#000000');

  const [width] = useState(props.width||200);
  const [height] = useState(props.height||100);

  useEffect(() => {
    setMax((props.max||1)/(props.max||1))
  }, [props.max]);

  useEffect(() => {
    setMin((props.min||0)/(props.max||1))
  }, [props.min, props.max]);

  useEffect(() => {
    setCurrent((props.current||props.max||1)/(props.max||1))
  }, [props.current, props.max]);

  useEffect(() => {
    setFlow(getFlow(props.flow, (props.min||0)/(props.max||1), (props.max||1)/(props.max||1)));
  }, [props.flow, props.min, props.max]);

  useEffect(() => {
  }, [props, ...Object.values(props)]);

  return (flow ? (<SVG height={height} width={width} style={props.style}>
    <linearGradient id={id} {...flow}>
      <stop offset={min} stopOpacity="1" stopColor={fillColor}/>
      <stop offset={current} stopOpacity="1" stopColor={fillColor}>
        <animate attributeName="offset" from={min} to={current} dur={time + 's'} begin="0s"/>
      </stop>
      <stop offset={current} stopOpacity="0" stopColor={fillColor}>
        <animate attributeName="offset" from={min} to={current} dur={time + 's'}  begin="0s"/>
      </stop>
      <stop offset={current} stopOpacity="0" stopColor={fillColor}/>
    </linearGradient>

    <path
      d={`M 0 0 L 0 ${height} L  ${props.width}  ${height} L ${props.width} 0 Z`}
      fill={'url(#' + (id) +')'}
      fillRule="evenodd"
      opacity="1"
      stroke={props.fillColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="5"/>
  </SVG>):(<></>));
};

const Bar = withTheme(BarB);

const MilkB = (props:{ style?, min:number, max:number, current:number, fillColor:string, time:number, id:number, flow: FlowType}) => {
  const [id] = useState('lg' + (props.id||0));
  const [time] = useState(props.time||1);
  const [max, setMax] = useState((props.max||1)/(props.max||1));
  const [min, setMin] = useState((props.min||0)/(props.max||1));
  const [current, setCurrent] = useState((props.current||props.max||1)/(props.max||1));
  const [flow, setFlow] = useState(getFlow(props.flow, (props.min||0)/(props.max||1), (props.max||1)/(props.max||1)));
  const [fillColor] = useState(props.fillColor||'#000000');

  const height = 230;
  const width = 130;

  useEffect(() => {
    setMax((props.max||1)/(props.max||1))
  }, [props.max]);

  useEffect(() => {
    setMin((props.min||0)/(props.max||1))
  }, [props.min, props.max]);

  useEffect(() => {
    setCurrent((props.current||props.max||1)/(props.max||1))
  }, [props.current, props.max]);

  useEffect(() => {
    setFlow(getFlow(props.flow, (props.min||0)/(props.max||1), (props.max||1)/(props.max||1)));
  }, [props.flow, props.min, props.max]);

  useEffect(() => {
  }, [props, ...Object.values(props)]);

  return (flow ? (<SVG height={height} width={width} style={props.style}>
    <linearGradient id={id} {...flow}>
      <stop offset={min} stopOpacity="1" stopColor={fillColor}/>
      <stop offset={current} stopOpacity="1" stopColor={fillColor}>
        <animate attributeName="offset" from={min} to={current} dur={time + 's'} begin="0s"/>
      </stop>
      <stop offset={current} stopOpacity="0" stopColor={fillColor}>
        <animate attributeName="offset" from={min} to={current} dur={time + 's'}  begin="0s"/>
      </stop>
      <stop offset={current} stopOpacity="0" stopColor={fillColor}/>
    </linearGradient>

    <path
      d="M39.3416 2.5C39.3416 2.5 37.2794 3.42588 37.2794 4.37501C37.2794 5.32414 39.3416 6.25002 39.3416 6.25002L39.7924 31.0932L24.5471 46.93L5.40047 27.0422C5.40047 27.0422 3.94774 27.4803 3.43469 28.0128C2.92168 28.5453 2.5 30.055 2.5 30.055L21.6135 49.9439L6.40042 65.7804L6.85121 223.75C6.85121 223.75 4.78905 224.676 4.78905 225.625C4.78905 226.574 6.85121 227.5 6.85121 227.5L123.147 227.5C123.147 227.5 125.21 226.574 125.21 225.625C125.21 224.676 123.147 223.75 123.147 223.75L123.599 65.7804L108.384 49.9439L127.5 30.055C127.5 30.055 127.078 28.5453 126.566 28.0128C126.052 27.4793 124.597 27.0422 124.597 27.0422L105.453 46.93L90.2076 31.0932L90.6564 6.25002C90.6564 6.25002 92.7195 5.32414 92.7195 4.37501C92.7195 3.42588 90.6564 2.5 90.6564 2.5L39.3416 2.5Z"
      fill={'url(#' + id +')'}
      fillRule="evenodd"
      opacity="1"
      stroke={props.fillColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="5"/>
  </SVG>):(<></>));
};

const Milk = withTheme(MilkB);

const ProgressB = (props: { Element, style?, width?:number, height?:number, min:number, max:number, fillColor:string, time:number, id:number, flow: FlowType, quantity?:number, current?:number, percentage?: boolean, theme}) => {
  const passProps = (props) => {
    return (
      props.children &&
      React.Children.map(props.children, (child) => {
        return React.cloneElement(child, {
          id: props.id,
          flow: props.flow,
          style: props.style,
          height: props.height,
          width: props.width,
          min: props.min,
          max: props.max,
          current: props.current,
          fillColor: props.fillColor || props.theme.primary,
          time: props.time,
        });
      })
    );
  };
  useEffect(() => {
  }, [props, ...Object.values(props)]);
  return (
    <div style={{position: "relative"}}>
      {passProps(props)}
      {props.percentage && <ProgressText>{((props.current||0)/(props.max||1)) * 100}%</ProgressText>}
      {(props.quantity || 0) > 1 && <Quantity>{props.quantity}</Quantity>}
    </div>
  );
};

const Progress = withTheme(ProgressB);

export { Progress, SVG, Milk, Bar, FlowType, getFlow };
export type { Flow }
