import React, { useEffect } from 'react';
import { Input as InputStyle } from './styles';
import { withTheme } from 'styled-components';
import { Error } from '../Text';

const Input = (props: {
  error?: string;
  setError?;
  value?;
  setValue?;
  children?;
  onChange?;
  onInput?;
  onSubmit?;
  validate?: (value, setValue: (error?:string) => void, error, setError: (error?:string) => void) => void;
}) => {

  useEffect(() => {
  }, [props?.error]);

  useEffect(() => {
    props?.validate?.(props?.value, props?.setValue, props?.error, props?.setError);
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