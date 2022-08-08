import React, { useEffect, useState } from 'react';
import { Input as InputStyle } from './styles';
import { withTheme } from 'styled-components';
import { Error } from '../Text';

const Input = (props: {
  defaultError?;
  error?;
  setError?;
  defaultValue?;
  value?;
  setValue?;
  children?;
  onChange?;
  onInput?;
  onSubmit?;
  onKeyUp?;
  onKeyDown?;
  validate?: (value?, setValue?: (error?) => void, error?, setError?: (error?) => void) => void;
}) => {

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
    newProps.validate = props.validate;
    newProps.onChange = props.onChange;
    newProps.onInput= props.onInput;
    newProps.onSubmit= props.onSubmit;
    newProps.onKeyUp= props.onKeyUp;
    newProps.onKeyDown= props.onKeyDown;
    if(!props.setValue){
      newProps.defaultValue = props?.defaultValue || props?.value;
      newProps.onChange = (event) => props?.validate
        ? props.validate?.(event.target.value, valueState?.[1], props?.error || errorState?.[0], props?.setError || errorState?.[1])
        : basicValidate(event.target.value, valueState?.[1], props?.error || errorState?.[0], props?.setError || errorState?.[1]);
    }
    return newProps;
  }

  return (
    <>
    <InputStyle
      {...getProps()}
    >{props.children}</InputStyle>
    {props?.error && props?.error !== '' && props?.error !== ' ' ? (
      <Error>{props?.error}</Error>
    ) : null}
    </>
  );
};
export default withTheme(Input);