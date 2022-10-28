import styled from 'styled-components';
import { baseConfig } from '../../../utils/config';

export const Hitting = styled.div`
  ${(props) => baseConfig(props)}
  @keyframes hitting {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(
        ${(props) =>
          props?.move?.x ||
          props?.theme?.animation?.hitting?.move?.x ||
          '0.05vw'},
        -${(props) => props?.move?.y || props?.theme?.animation?.hitting?.move?.y || '0.05vh'}
      );
    }
    40% {
      transform: translate(
        ${(props) =>
          props?.move?.x ||
          props?.theme?.animation?.hitting?.move?.x ||
          '0.05vw'},
        ${(props) =>
          props?.move?.y ||
          props?.theme?.animation?.hitting?.move?.y ||
          '0.05vh'}
      );
    }
    60% {
      transform: translate(
        -${(props) => props?.move?.x || props?.theme?.animation?.hitting?.move?.x || '0.05vw'},
        ${(props) =>
          props?.move?.y ||
          props?.theme?.animation?.hitting?.move?.y ||
          '0.05vh'}
      );
    }
    80% {
      transform: translate(
        -${(props) => props?.move?.x || props?.theme?.animation?.hitting?.move?.x || '0.05vw'},
        -${(props) => props?.move?.y || props?.theme?.animation?.hitting?.move?.y || '0.05vh'}
      );
    }
    100% {
      transform: translate(0);
    }
  }
  width: fit-content;
  transform-origin: top;
  animation: hitting
    ${(props) =>
      props?.duration || props?.theme?.animation?.hitting?.duration || 0.3}s
    ease-in-out
    ${(props) =>
      props?.delay || props?.theme?.animation?.hitting?.delay || 0.2}s
    infinite;
`;

export const Hanging = styled.div`
  ${(props) => baseConfig(props)}
  @keyframes hanging {
    0% {
      transform: rotate(-30deg);
    }
    50% {
      transform: rotate(30deg);
    }
    100% {
      transform: rotate(-30deg);
    }
  }
  width: fit-content;
  transform-origin: top;
  animation: hanging
    ${(props) =>
      props?.duration || props?.theme?.animation?.hanging?.duration || 2}s
    ease infinite;
`;

export const Rowling = styled.div`
  ${(props) => baseConfig(props)}
  @keyframes ${(props) => (props.anti ? 'anti-' : '')}rowling {
    0% {
      transform: rotate(${(props) => (props.anti ? '360deg' : '0deg')});
    }
    25% {
      transform: rotate(${(props) => (props.anti ? '270deg' : '90deg')});
    }
    50% {
      transform: rotate(${(props) => (props.anti ? '180deg' : '180deg')});
    }
    75% {
      transform: rotate${(props) => (props.anti ? '90deg' : '270deg')});
    }
    100% {
      transform: rotate(${(props) => (props.anti ? '0deg' : '360deg')});
    }
  }
  width: fit-content;
  transform-origin: center;
  animation: ${(props) => (props.anti ? 'anti-' : '')}rowling ${(props) =>
  props?.duration ||
  props?.theme?.animation?.rowling?.duration ||
  2}s linear infinite;
`;

export const Falling = styled.div`
  ${(props) => baseConfig(props)}
  @keyframes falling {
    transform: translateY(${(props) =>
      props?.from ||
      props?.theme?.animation?.falling?.from ||
      '-1000px'}) scaleY(2.5) scaleX(0.2);
    transform-origin: 50% 0%;
    filter: blur(5vh);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scaleY(1) scaleX(1);
    transform-origin: 50% 50%;
    filter: blur(0);
    opacity: 1;
  }
}
  width: fit-content;
  transform-origin: top;
  animation: falling
    ${(props) =>
      props?.duration ||
      props?.theme?.animation?.falling?.duration ||
      0.6}s ease-in infinite;
`;
