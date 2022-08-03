import React, { useEffect } from 'react';
import { withTheme } from 'styled-components';
import { Logo } from '../../Image/Icons/styles';
import { H4 } from '../../Text';
import { Center, Wrapper } from './styles';

const Animation = (props: {
  theme;
  Animation;
  src?: string;
  setLoading;
  loading;
  progress?: number;
  progress2?: number;
}) => {
  useEffect(() => {}, [
    props,
    props.theme,
    props.setLoading,
    props.loading,
    props.progress,
    props.progress2,
  ]);
  return (
    <Wrapper>
      <Center>
        <props.Animation>
          <Logo
            src={ props?.src }
            alt="loading..."
          />
          <>
            {props.progress && props.progress > 0 ? (
              <H4>{props.progress}%</H4>
            ) : (
              <></>
            )}
            {props.progress2 && props.progress2 > 0 ? (
              <H4>{props.progress2}%</H4>
            ) : (
              <></>
            )}
          </>
        </props.Animation>
      </Center>
    </Wrapper>
  );
};

export default withTheme(Animation);
