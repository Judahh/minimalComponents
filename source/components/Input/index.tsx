import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Input as InputStyle } from './styles';
import { withTheme } from 'styled-components';
import { Error } from '../Text';

const Input = (props: {
  defaultError?;
  type?;
  error?;
  errorStyle?: CSSProperties;
  setError?;
  defaultValue?;
  value?;
  setValue?;
  onChange?;
  onClick?;
  onInput?;
  onSubmit?;
  onKeyUp?;
  onKeyDown?;
  label?: string;
  labelStyle?: CSSProperties;
  labelParentStyle?: CSSProperties;
  validate?: (value?, setValue?: (error?) => void, error?, setError?: (error?) => void) => void;
}) => {
  const inputRef = useRef<HTMLButtonElement>(null);
  const valueState = props?.setValue ? undefined : useState<any | undefined>(props.defaultValue || props.value);
  const errorState = props?.setError ? undefined : useState<any | undefined>(props.defaultError || props.error);

  const basicValidate = (value?, setValue?: (value?:string) => void, error?, setError?: (error?:string) => void) => {
    setValue?.(value);
    setError?.(error);
  }


  useEffect(() => {
  }, [props?.error]);

  useEffect(() => {
    if(!props?.setValue)
      if(props?.validate)
        props.validate?.(props?.value, props?.setValue, props?.error, props?.setError);
  }, [props?.value]);

  useEffect(() => {
  }, [props, Object.values(props)]);

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
    newProps.onClick = props.onClick;
    newProps.onChange = props.onChange;
    newProps.onInput= props.onInput;
    newProps.onSubmit= props.onSubmit;
    newProps.onKeyUp= props.onKeyUp;
    newProps.onKeyDown= props.onKeyDown;
    if(!props.setValue){
      newProps.defaultValue = props?.defaultValue || props?.value;
      newProps.value = valueState?.[0];
      newProps.onChange = (event) => props?.validate
        ? props.validate?.(event.target.value, valueState?.[1], props?.error || errorState?.[0], props?.setError || errorState?.[1])
        : basicValidate(event.target.value, valueState?.[1], props?.error || errorState?.[0], props?.setError || errorState?.[1]);
    }
    return newProps;
  }

  const input = props.type === 'file'?
  (<>
    <InputStyle
      {...{...getProps(), value:''}}
      style={{display:'none'}}
      ref={inputRef}
    />
    <InputStyle
      {...{...getProps(), type:'button'}}
      onClick={()=>{
        console.log('CLICK');
        console.log('click', inputRef?.current);
        inputRef?.current?.click()
      }}
    />
  </>):
  (<InputStyle
    {...getProps()}
    ref={inputRef}
  />);

  const fullInput = props.label ? (
    <label style={props.labelParentStyle}>
      <span style={props.labelStyle}>{props.label}</span>
      {input}
    </label>
  ):(input);

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