import React, {
  CSSProperties,
  useEffect,
  useRef,
  KeyboardEvent,
} from 'react';
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

const isChecked = (value) => {
  const checked =
    typeof value === 'string'
      ? value.toLowerCase() !== 'false' && value.toLowerCase() !== '0'
      : !!value;
  // console.log('checked', value, checked);
  return checked;
};

const Input = (props: {
  children;
  defaultError?;
  type?;
  error?;
  errorStyle?: CSSProperties;
  setError?;
  defaultValue?;
  iconValue?: boolean;
  value?;
  baseValue?;
  setValue?;
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
  const [baseValue, setBaseValue] = useState<string | number | boolean | undefined>(
    props.baseValue
  ); // internal value
  const [value, setValue] = useState<string | number | boolean | undefined>(
    props.defaultValue || props.value
  ); // internal value
  // const [checked, setChecked] = useState<boolean | undefined>(type === 'checkbox' || type === 'radio' ? isChecked(value) : undefined); // internal value
  const valueState: [any, (error?) => void, any] = props?.setValue // external value
    ? [props?.value, props?.setValue, undefined]
    : useState<any | undefined>(value);
  const errorState = props?.setError
    ? undefined
    : useState<any | undefined>(props.defaultError || props.error);

  useEffect(() => {
    setType(props?.type?.toLowerCase?.() || 'text');
  }, [props?.type]);

  useEffect(() => {
    setBaseValue(props.baseValue);
  }, [props?.baseValue]);

  // useEffect(() => {
  //   if (type === 'checkbox' || type === 'radio') {
  //     const newChecked = isChecked(value);
  //     if(newChecked !== checked) setChecked(newChecked);
  //   }
  // }, [value]);

  useEffect(() => {}, [type]);

  useEffect(() => {}, [props?.error]);

  useEffect(() => {}, [props, Object.values(props)]);

  const remakeOnChange = (event, func?) => {
    const currentFunc = (a, b, c, d, e) => {
      return basicValidate?.(a, b, c, d, e, func);
    };
    return validateLength(event, currentFunc);
  };

  const remakeEvent = (event, func?) => {
    checkAndstopPropagation(props?.stopPropagation, event);
    return validateLength(event, func);
  };

  const onEnterEvent = (event?: KeyboardEvent<HTMLInputElement>) => {
    if (event?.key === 'Enter') {
      return onEnter(event);
    }
  };

  const onBlur = (event?: React.FormEvent<HTMLInputElement>) => {
    return basicValidate(
      event,
      event?.currentTarget?.value,
      valueState,
      props?.error || errorState?.[0],
      props?.setError || errorState?.[1],
      props?.onChange
    );
  };

  const onEnter = (event?: React.FormEvent<HTMLInputElement>) => {
    return basicValidate(
      event,
      event?.currentTarget?.value,
      valueState,
      props?.error || errorState?.[0],
      props?.setError || errorState?.[1],
      props?.onChange
    );
  };

  const validateExecution = (func?, currentParameter?) => {
    // console.log('validateExecution', props);
    const options: InputOptions | undefined = props?.options;
    const finalFunction = (...args) => {
      const result = func?.(...args);
      setRunning(false);
      return result;
    };
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
          return func?.(...currentParameter);
      }
  };

  const updateValue = (newValue) => {
    if (type === 'checkbox' || type === 'radio') {
      newValue = !isChecked(value);
      // setChecked(newValue);
    }
    // console.log('updateValue', value, newValue);
    setValue(newValue);
    return newValue;
  };

  const validateLength = (event?: React.FormEvent<HTMLInputElement>, func?) => {
    const oldValue = valueState?.[0];
    let value = (event?.target as any)?.value || event?.currentTarget?.value;
    value = updateValue(value);
    const options: InputOptions | undefined = props?.options;

    const currentFunction = func ? func : valueState?.[1];
    const currentParameter = func
      ? [
          event,
          value,
          valueState,
          props?.error || errorState?.[0],
          props?.setError || errorState?.[1],
          func,
        ]
      : [value];
    // console.log(
    //   'validateLength',
    //   oldValue,
    //   value,
    //   currentParameter,
    //   options,
    //   event
    // );

    if (options != undefined) {
      if (oldValue === value) return;
      const oldLength = oldValue?.length || 0;
      const length = value?.length || 0;
      const minLength = options?.minLength || 0;
      if (length >= minLength)
        return validateExecution(currentFunction, currentParameter);
      else if (oldLength > length) {
        // event = {
        //   ...event,
        //   target: { ...event?.target, value: '' },
        // } as React.FormEvent<HTMLInputElement>;
        return validateExecution(currentFunction, currentParameter);
      }
    } else {
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
      valueState?.[1]?.(value);
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

    if (type === 'checkbox')
      newProps.checked = valueState?.[0];
    if (type === 'radio')
      newProps.checked = baseValue != undefined ? valueState?.[0] === baseValue : valueState?.[0];
    newProps.value = valueState?.[0];

    // console.log('getProps', props);

    newProps.onChange = (event) => {
      return remakeOnChange(event, props?.onChange);
    };

    if (type !== 'checkbox' && type !== 'radio') {
      newProps.onClick = (event) => {
        return remakeEvent(event, props?.onClick);
      };
      newProps.onInput = (event) => {
        return remakeEvent(event, props?.onInput);
      };
      newProps.onSubmit = (event) => {
        return remakeEvent(event, props?.onSubmit);
      };
      newProps.onKeyUp = (event) => {
        return remakeEvent(event, props?.onKeyUp);
      };
      newProps.onKeyDown = (event) => {
        if (
          props?.options?.type != undefined &&
          props?.options?.forceNotifyByEnter
        )
          return onEnterEvent(event);
        return remakeEvent(event, props?.onKeyDown);
      };
      newProps.onBlur = (event) => {
        if (
          props?.options?.type != undefined &&
          props?.options?.forceNotifyOnBlur
        )
          return onBlur(event);
        return remakeEvent(event, props?.onBlur);
      };
    } else newProps.checked = value;

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
          {...{ ...getProps(), type: 'button', value: props?.label || props?.value || props?.children }}
          onClick={(event) => {
            // console.log('CLICK');
            // console.log('click', inputRef?.current);
            checkAndstopPropagation(props?.stopPropagation, event);
            inputRef?.current?.click();
          }}
        />
      </>
    ) : (
      <InputStyle {...getProps()} ref={inputRef} />
    );

  const fullInput = props.label ? (
    <label style={props.labelParentStyle}>
      <span style={props.labelStyle}>{props.label}</span>
      {input}
    </label>
  ) : (
    <>
      {input}
    </>
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
