import React, { useEffect } from "react";
import { ProgressText, Quantity } from "../../Text";
import { withTheme } from 'styled-components';

const MilkB = (props:{ min:number, max:number, fillColor:string, time:number, id:number}) => {
  useEffect(() => {
  }, [props, ...Object.values(props)]);
  return (<>
    <linearGradient id={'lg' + (props.id||0)} x1="0.5" y1="1" x2="0.5" y2="0">
      <stop offset={props.min||0} stopOpacity="1" stopColor={props.fillColor||'#000000'}/>
      <stop offset={props.max||1} stopOpacity="1" stopColor={props.fillColor||'#000000'}>
        <animate attributeName="offset" from={props.min||0} to={props.max||1} dur={(props.time||1) + 's'} begin="0s"/>
      </stop>
      <stop offset={props.max||1} stopOpacity="0" stopColor={props.fillColor||'#000000'}>
        <animate attributeName="offset" from={props.min||0} to={props.max||1} dur={(props.time||1) + 's'}  begin="0s"/>
      </stop>
      <stop offset={props.max||1} stopOpacity="0" stopColor={props.fillColor||'#000000'}/>
    </linearGradient>

    <path
      d="M39.3416 2.5C39.3416 2.5 37.2794 3.42588 37.2794 4.37501C37.2794 5.32414 39.3416 6.25002 39.3416 6.25002L39.7924 31.0932L24.5471 46.93L5.40047 27.0422C5.40047 27.0422 3.94774 27.4803 3.43469 28.0128C2.92168 28.5453 2.5 30.055 2.5 30.055L21.6135 49.9439L6.40042 65.7804L6.85121 223.75C6.85121 223.75 4.78905 224.676 4.78905 225.625C4.78905 226.574 6.85121 227.5 6.85121 227.5L123.147 227.5C123.147 227.5 125.21 226.574 125.21 225.625C125.21 224.676 123.147 223.75 123.147 223.75L123.599 65.7804L108.384 49.9439L127.5 30.055C127.5 30.055 127.078 28.5453 126.566 28.0128C126.052 27.4793 124.597 27.0422 124.597 27.0422L105.453 46.93L90.2076 31.0932L90.6564 6.25002C90.6564 6.25002 92.7195 5.32414 92.7195 4.37501C92.7195 3.42588 90.6564 2.5 90.6564 2.5L39.3416 2.5Z"
      fill={'url(#lg' + (props.id||0) +')'}
      fillRule="evenodd"
      opacity="1"
      stroke={props.fillColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="5"/>
  </>);
};

const Milk = withTheme(MilkB);

const SVGB = (props: {height: number; width: number, children?, styles?}) => {
  useEffect(() => {
  }, [props, ...Object.values(props)]);
  const getProps = () => {
    const newProps = {};
    for (const key in props) {
      if (key !== 'height' &&
        key !== 'width' &&
        key !== 'children' &&
        key !== 'styles' &&
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
    style={props.styles}
    {...getProps()}
  >
    {props.children}
  </svg>);
};

const SVG = withTheme(SVGB);

const ProgressB = (props: { Element, height?:number, width?:number, min?:number, fillColor?: string, time?:1, id?:0, styles?, quantity?:number, total?:number, current?:number, percentage?: boolean}) => {
  useEffect(() => {
  }, [props, ...Object.values(props)]);
  return (
    <>
      <SVG styles={props.styles} height={props.height || 230} width={props.width || 130}>
        <props.Element id={props.id} min={props.min || 0} max={((props.current || 0)/(props.total || 1))} fillColor={props.fillColor||'#000000'} time={props.time}/>
      </SVG>
      {props.percentage && <ProgressText>{((props.current||0)/(props.total||1)) * 100}%</ProgressText>}
      {(props.quantity || 0) > 1 && <Quantity>{props.quantity}</Quantity>}
    </>
  );
};

const Progress = withTheme(ProgressB);

export { Progress, SVG, Milk  };
