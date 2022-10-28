import styled from 'styled-components';
import { baseConfig } from '../../../utils/config';

export const Hitting = styled.div`
  ${(props) => baseConfig(props)}
  @keyframes hitting {
    0% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }
    20% {
      -webkit-transform: translate(2px, -2px);
      transform: translate(2px, -2px);
    }
    40% {
      -webkit-transform: translate(2px, 2px);
      transform: translate(2px, 2px);
    }
    60% {
      -webkit-transform: translate(-2px, 2px);
      transform: translate(-2px, 2px);
    }
    80% {
      -webkit-transform: translate(-2px, -2px);
      transform: translate(-2px, -2px);
    }
    100% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }
  }
  width: fit-content;
  transform-origin: top;
  animation: hitting
    ${(props) => props?.theme?.animation?.hitting?.duration || 0.3}s ease-in-out
    ${(props) => props?.theme?.animation?.hitting?.duration || 0.2}s infinite;
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
    ${(props) => props?.theme?.animation?.hanging?.duration || 2}s ease infinite;
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
  props?.theme?.animation?.rowling?.duration || 2}s linear infinite;
`;
