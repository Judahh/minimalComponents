import styled from 'styled-components';
import { baseConfig } from '../../../util';

export const Hanging = styled.div`
  ${baseConfig}
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
  animation: hanging 2s ease infinite;
`;

export const Rowling = styled.div`
  ${baseConfig}
  @keyframes rowling {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(${(props)=> props.anti ? '-':''}90deg);
    }
    50% {
      transform: rotate(${(props)=> props.anti ? '-':''}180deg);
    }
    75% {
      transform: rotate${(props)=> props.anti ? '-':''}270deg);
    }
    100% {
      transform: rotate(${(props)=> props.anti ? '-':''}360deg);
    }
  }
  width: fit-content;
  transform-origin: center;
  animation: rowling 2s linear infinite;
`;
