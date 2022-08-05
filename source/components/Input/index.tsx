import React, { useEffect, useState } from 'react';
import { Input as InputStyle } from './styles';
import { withTheme } from 'styled-components';
import { Error } from '../Text';

const Input = (props: {
  error?: string;
  value?;
  children?;
  validate?: (value, setError: (error?:string) => void) => void;
}) => {
  const [error, setError] = useState<string | undefined>(props.error);

  useEffect(() => {
    setError(props?.error);
  }, [props?.error]);

  useEffect(() => {
    props?.validate?.(props?.value, setError);
  }, [props?.value]);

  useEffect(() => {
  }, [props, Object.values(props)]);

  const getProps = () => {
    const newProps = JSON.parse(JSON.stringify(props));
    delete newProps.error;
    delete newProps.children;
    return newProps;
  }

  return (
    <>
    <InputStyle
      {...getProps()}
    >{props.children}</InputStyle>
    {error && error !== '' && error !== ' ' ? (
      <Error>{error}</Error>
    ) : null}
    </>
  );
};
export default withTheme(Input);