import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Input as InputStyle } from './styles';
import { withTheme } from 'styled-components';
import { Error } from '../Text';

const stopPropagation = (event) => {
  event?.stopImmediatePropagation?.();
  event?.stopPropagation?.();
  event?.nativeEvent?.stopPropagation?.();
  event?.nativeEvent?.stopImmediatePropagation?.();
}

const checkAndstopPropagation = (stop?, event?) => {
  if(stop) stopPropagation(event);
}

const Input = (props: {
  defaultError?;
  type?;
  error?;
  errorStyle?: CSSProperties;
  setError?;
  defaultValue?;
  iconValue?: boolean;
  value?;
  setValue?;
  onChange?: (
    event?,
    value?,
    valueState?: [any, (error?) => void],
    error?,
    setError?: (error?) => void
  ) => void;
  onClick?: (
    event?,
    value?,
    valueState?: [any, (error?) => void],
    error?,
    setError?: (error?) => void
  ) => void;
  onInput?: (
    event?,
    value?,
    valueState?: [any, (error?) => void],
    error?,
    setError?: (error?) => void
  ) => void;
  onSubmit?: (
    event?,
    value?,
    valueState?: [any, (error?) => void],
    error?,
    setError?: (error?) => void
  ) => void;
  onKeyUp?: (
    event?,
    value?,
    valueState?: [any, (error?) => void],
    error?,
    setError?: (error?) => void
  ) => void;
  onKeyDown?: (
    event?,
    value?,
    valueState?: [any, (error?) => void],
    error?,
    setError?: (error?) => void
  ) => void;
  label?: string;
  labelStyle?: CSSProperties;
  labelParentStyle?: CSSProperties;
  stopPropagation?: boolean;
  validate?: (
    value?,
    valueState?: [any, (error?) => void],
    error?,
    setError?: (error?) => void,
    event?,
    eventF?
  ) => void;
}) => {
  const [type, setType] = useState(props?.type?.toLowerCase?.() || 'text');
  const inputRef = useRef<HTMLButtonElement>(null);
  const valueState: [any, (error?) => void] = props?.setValue
    ? [props?.value, props?.setValue]
    : useState<any | undefined>(type === 'checkbox' || type === 'radio' ? (props.defaultValue || props.value) : (props.defaultValue || props.value));
  const errorState = props?.setError
    ? undefined
    : useState<any | undefined>(props.defaultError || props.error);

  useEffect(() => {
    setType(props?.type?.toLowerCase?.() || 'text');
  } , [props?.type]);

  useEffect(() => {
  } , [type]);

  const basicValidate = (
    event?,
    value?,
    valueState?: [any, (error?) => void],
    error?,
    setError?: (error?: string) => void,
    eventF?
  ) => {
    // console.log('basicValidate', value, valueState);
    checkAndstopPropagation(props?.stopPropagation, event);
    if (props?.validate)
      props.validate(value, valueState, error, setError, event, eventF);
    else {
      if (type === 'checkbox' || type === 'radio')
        valueState?.[1]?.(!!!valueState?.[0]);
      else valueState?.[1]?.(value);
      setError?.(error);
    }
    eventF?.(event, value, valueState, error, setError);
  };

  useEffect(() => {}, [props?.error]);

  // useEffect(() => {
  // }, [props?.value]);

  useEffect(() => {}, [props, Object.values(props)]);

  const getProps = () => {
    const newProps = JSON.parse(JSON.stringify(props));
    delete newProps.error;
    delete newProps.setError;
    delete newProps.setValue;
    delete newProps.children;
    delete newProps.label;
    delete newProps.labelStyle;
    delete newProps.labelParentStyle;
    delete newProps.errorStyle;
    newProps.validate = props.validate;

    newProps.defaultValue = props?.defaultValue || props?.value;

    if (type === 'checkbox' || type === 'radio')
      newProps.checked = valueState?.[0];
    newProps.value = valueState?.[0];

    newProps.onChange = (event) =>
      basicValidate(
        event,
        event.target.value,
        valueState,
        props?.error || errorState?.[0],
        props?.setError || errorState?.[1],
        props.onChange
      );
    newProps.onClick = (event) => {
      checkAndstopPropagation(props?.stopPropagation, event);
      return props?.onClick?.(
        event,
        event.target.value,
        valueState,
        props?.error || errorState?.[0],
        props?.setError || errorState?.[1]
      );
    };
    newProps.onInput = (event) => {
      checkAndstopPropagation(props?.stopPropagation, event);
      return props?.onInput?.(
        event,
        event.target.value,
        valueState,
        props?.error || errorState?.[0],
        props?.setError || errorState?.[1]
      );
    };
    newProps.onSubmit = (event) => {
      checkAndstopPropagation(props?.stopPropagation, event);
      return props?.onSubmit?.(
        event,
        event.target.value,
        valueState,
        props?.error || errorState?.[0],
        props?.setError || errorState?.[1]
      );
    };
    newProps.onKeyUp = (event) => {
      checkAndstopPropagation(props?.stopPropagation, event);
      return props?.onKeyUp?.(
        event,
        event.target.value,
        valueState,
        props?.error || errorState?.[0],
        props?.setError || errorState?.[1]
      );
    };
    newProps.onKeyDown = (event) => {
      checkAndstopPropagation(props?.stopPropagation, event);
      return props?.onKeyDown?.(
        event,
        event.target.value,
        valueState,
        props?.error || errorState?.[0],
        props?.setError || errorState?.[1]
      );
    };

    if (newProps.value != undefined && newProps.checked != undefined) delete newProps.defaultValue;
    return newProps;
  };

  const input =
    type === 'file' ? (
      <>
        <InputStyle
          {...{ ...getProps(), value: '' }}
          style={{ display: 'none' }}
          ref={inputRef}
        />
        <InputStyle
          {...{ ...getProps(), type: 'button' }}
          onClick={(event) => {
            // console.log('CLICK');
            // console.log('click', inputRef?.current);
            checkAndstopPropagation(props?.stopPropagation, event);
            inputRef?.current?.click();
          }}
        />
      </>
    ) : (
      <InputStyle checked={valueState?.[0]} {...getProps()} ref={inputRef} />
    );

  const fullInput = props.label ? (
    <label style={props.labelParentStyle}>
      <span style={props.labelStyle}>{props.label}</span>
      {input}
    </label>
  ) : (
    input
  );

  return (
    <>
      {fullInput}
      {props?.error && props?.error !== '' && props?.error !== ' ' ? (
        <Error style={props?.errorStyle}>{props?.error}</Error>
      ) : null}
    </>
  );
};
export default withTheme(Input);
