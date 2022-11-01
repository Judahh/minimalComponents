import React, { CSSProperties, useEffect, useRef, KeyboardEvent } from 'react';
import useState from 'react-usestateref';
import { Input as InputStyle } from './styles';
import { withTheme } from 'styled-components';
import { Error } from '../Text';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import { InputOptions } from './inputOptions';

const stopPropagation = (event) => {
  event?.stopImmediatePropagation?.();
  event?.stopPropagation?.();
  event?.nativeEvent?.stopPropagation?.();
  event?.nativeEvent?.stopImmediatePropagation?.();
};

const checkAndstopPropagation = (stop?, event?) => {
  if (stop) stopPropagation(event);
};

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
  setUnverifiedValue?;
  options?: InputOptions;
  onChange?: (
    event?,
    value?,
    valueState?: [any, (error?) => void, any],
    error?,
    setError?: (error?) => void
  ) => void;
  onClick?: (
    event?,
    value?,
    valueState?: [any, (error?) => void, any],
    error?,
    setError?: (error?) => void
  ) => void;
  onInput?: (
    event?,
    value?,
    valueState?: [any, (error?) => void, any],
    error?,
    setError?: (error?) => void
  ) => void;
  onSubmit?: (
    event?,
    value?,
    valueState?: [any, (error?) => void, any],
    error?,
    setError?: (error?) => void
  ) => void;
  onKeyUp?: (
    event?,
    value?,
    valueState?: [any, (error?) => void, any],
    error?,
    setError?: (error?) => void
  ) => void;
  onKeyDown?: (
    event?,
    value?,
    valueState?: [any, (error?) => void, any],
    error?,
    setError?: (error?) => void
  ) => void;
  onBlur?: (
    event?,
    value?,
    valueState?: [any, (error?) => void, any],
    error?,
    setError?: (error?) => void
  ) => void;
  label?: string;
  labelStyle?: CSSProperties;
  labelParentStyle?: CSSProperties;
  stopPropagation?: boolean;
  validate?: (
    value?,
    valueState?: [any, (error?) => void, any],
    error?,
    setError?: (error?) => void,
    event?,
    eventF?
  ) => void;
}) => {
  const [type, setType] = useState(props?.type?.toLowerCase?.() || 'text');
  const [running, setRunning] = useState<boolean | undefined>(false);
  const inputRef = useRef<HTMLButtonElement>(null);
  const valueState: [any, (error?) => void, any] = props?.setValue
    ? [props?.value, props?.setValue, undefined]
    : useState<any | undefined>(props.defaultValue || props.value);
  const errorState = props?.setError
    ? undefined
    : useState<any | undefined>(props.defaultError || props.error);

  useEffect(() => {
    setType(props?.type?.toLowerCase?.() || 'text');
  }, [props?.type]);

  useEffect(() => {}, [type]);

  useEffect(() => {}, [props?.error]);

  useEffect(() => {}, [props, Object.values(props)]);

  const remakeOnChange = (event, valueState, props?, func?) => {
    const currentFunc = (a, b, c, d, e) => {
      return basicValidate?.(a, b, c, d, e, func);
    };
    return validateLength(event, valueState, props, currentFunc);
  };

  const remakeEvent = (event, valueState, props?, func?) => {
    checkAndstopPropagation(props?.stopPropagation, event);
    return validateLength(event, valueState, props, func);
  };

  const onEnterEvent = (
    event?: KeyboardEvent<HTMLInputElement>,
    valueState?,
    props?
  ) => {
    if (event?.key === 'Enter') {
      onEnter(event, valueState, props);
    }
  };

  const onBlur = (
    event?: React.FormEvent<HTMLInputElement>,
    valueState?,
    props?
  ) => {
    return basicValidate(
      event,
      event?.currentTarget?.value,
      valueState,
      props?.error || errorState?.[0],
      props?.setError || errorState?.[1],
      props?.onChange
    );
  };

  const onEnter = (
    event?: React.FormEvent<HTMLInputElement>,
    valueState?,
    props?
  ) => {
    return basicValidate(
      event,
      event?.currentTarget?.value,
      valueState,
      props?.error || errorState?.[0],
      props?.setError || errorState?.[1],
      props?.onChange
    );
  };

  const validateExecution = (
    event?: React.FormEvent<HTMLInputElement>,
    valueState?: [any, (error?) => void, any],
    props?,
    func?
  ) => {
    // console.log('validateExecution', props);
    const value = event?.currentTarget?.value;
    const options: InputOptions | undefined = props?.options;
    const currentFunction = func ? func : valueState?.[1];
    const finalFunction = (...args) => {
      const result = currentFunction?.(...args);
      setRunning(false);
      return result;
    };
    const currentParameter = func
      ? [
          event,
          event?.currentTarget?.value,
          valueState,
          props?.error || errorState?.[0],
          props?.setError || errorState?.[1],
          func,
        ]
      : [value];
    if (!running)
      switch (options?.type) {
        case 'debounce':
          // console.log('debounce', props);
          setRunning(true);
          return debounce(
            finalFunction,
            options?.wait || 250,
            options
          )(...currentParameter);

        case 'throttle':
          // console.log('throttle', props);
          setRunning(true);
          return throttle(
            finalFunction,
            options?.wait || 250,
            options
          )(...currentParameter);

        default:
          // console.log('default', props);
          return currentFunction?.(...currentParameter);
      }
  };

  const setBasicValue = (oldValue, value, setUnverifiedValue, setValue) => {
      if (value != oldValue) {
        if (setUnverifiedValue) {
          setUnverifiedValue(value);
        } else {
          setValue(value);
        }
      }
  };

  const validateLength = (
    event?: React.FormEvent<HTMLInputElement>,
    valueState?: [any, (error?) => void, any],
    props?,
    func?
  ) => {
    // console.log('validateLength', props);
    const value = event?.currentTarget?.value;
    const options: InputOptions | undefined = props?.options;
    const currentFunction = func ? func : valueState?.[1];
    const currentParameter = func
      ? [
          event,
          event?.currentTarget?.value,
          valueState,
          props?.error || errorState?.[0],
          props?.setError || errorState?.[1],
          func,
        ]
      : [value];
    if (options != undefined) {
      setBasicValue(valueState?.[0], value, props?.setUnverifiedValue, valueState?.[1]);
      const oldLength = valueState?.[0]?.length || 0;
      const length = event?.currentTarget?.value?.length || 0;
      const minLength = options?.minLength || 0;
      if (length >= minLength)
        return validateExecution(event, valueState, props, func);
      else if (oldLength > length) {
        return validateExecution(
          {
            ...event,
            target: { ...event?.target, value: '' },
          } as React.FormEvent<HTMLInputElement>,
          valueState,
          props,
          func
        );
      }
    } else {
      setBasicValue(valueState?.[0], value, props?.setUnverifiedValue, valueState?.[1]);
      return currentFunction(...currentParameter);
    }
  };

  const basicValidate = (
    event?,
    value?,
    valueState?: [any, (error?) => void, any],
    error?,
    setError?: (error?: string) => void,
    eventF?
  ) => {
    // console.log('basicValidate', event, value, valueState);
    checkAndstopPropagation(props?.stopPropagation, event);
    if (props?.validate)
      props.validate(value, valueState, error, setError, event, eventF);
    else {
      if (type === 'checkbox' || type === 'radio')
        valueState?.[1]?.(!!!valueState?.[0]);
      else valueState?.[1]?.(value);
      setError?.(error);
    }
    return eventF?.(event, value, valueState, error, setError);
  };

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

    newProps.defaultValue = props?.value ? undefined : props?.defaultValue;

    if (type === 'checkbox' || type === 'radio')
      newProps.checked = valueState?.[0];
    newProps.value = valueState?.[0];

    // console.log('getProps', props);

    newProps.onChange = (event) => {
      return remakeOnChange(event, valueState, props, props?.onChange);
    };

    newProps.onClick = (event) => {
      return remakeEvent(event, valueState, props, props?.onClick);
    };
    newProps.onInput = (event) => {
      return remakeEvent(event, valueState, props, props?.onInput);
    };
    newProps.onSubmit = (event) => {
      return remakeEvent(event, valueState, props, props?.onSubmit);
    };
    newProps.onKeyUp = (event) => {
      return remakeEvent(event, valueState, props, props?.onKeyUp);
    };
    newProps.onKeyDown = (event) => {
      if (
        props?.options?.type != undefined &&
        props?.options?.forceNotifyByEnter
      )
        onEnterEvent(event, valueState, props);
      return remakeEvent(event, valueState, props, props?.onKeyDown);
    };
    newProps.onBlur = (event) => {
      if (
        props?.options?.type != undefined &&
        props?.options?.forceNotifyOnBlur
      )
        onBlur(event, valueState, props);
      return remakeEvent(event, valueState, props, props?.onBlur);
    };

    if (newProps.value != undefined && newProps.checked != undefined)
      delete newProps.defaultValue;
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
