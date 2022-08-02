import React, { useEffect } from 'react';
import { default as lightTheme } from '../../../../styles/themes/light.json';
import { withTheme } from 'styled-components';
import { Hanging } from './styles';
import { MainSubtitle3 } from '../../../Text';
import { Center, Wrapper } from '../../../Content';
import { Logo } from '../styles';

const LoadingBag = (props: {
  theme;
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
        <Hanging>
          <Logo
            src={
              props?.theme === lightTheme ||
              props?.theme === undefined ||
              props?.theme === null
                ? '/img/bag.svg'
                : '/img/bagInvert.svg'
            }
            alt="cart"
          />
          <>
            {props.progress && props.progress > 0 ? (
              <MainSubtitle3>{props.progress}%</MainSubtitle3>
            ) : (
              <></>
            )}
            {props.progress2 && props.progress2 > 0 ? (
              <MainSubtitle3>{props.progress2}%</MainSubtitle3>
            ) : (
              <></>
            )}
          </>
        </Hanging>
      </Center>
    </Wrapper>
  );
};

export default withTheme(LoadingBag);
