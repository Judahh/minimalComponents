import styled from 'styled-components';
import { baseConfig } from '../../../utils/util';

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
  animation: hanging ${(props) => props?.theme?.animation?.hanging?.duration || 2}s ease infinite;
`;

export const Rowling = styled.div`
  ${(props) => baseConfig(props)}
  @keyframes ${(props)=> props.anti ? 'anti-':''}rowling {
    0% {
      transform: rotate(${(props)=> props.anti ? '360deg':'0deg'});
    }
    25% {
      transform: rotate(${(props)=> props.anti ? '270deg':'90deg'});
    }
    50% {
      transform: rotate(${(props)=> props.anti ? '180deg':'180deg'});
    }
    75% {
      transform: rotate${(props)=> props.anti ? '90deg':'270deg'});
    }
    100% {
      transform: rotate(${(props)=> props.anti ? '0deg':'360deg'});
    }
  }
  width: fit-content;
  transform-origin: center;
  animation: ${(props)=> props.anti ? 'anti-':''}rowling ${(props) => props?.theme?.animation?.rowling?.duration || 2}s linear infinite;
`;
