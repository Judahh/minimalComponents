import styled from 'styled-components';

export const Hanging = styled.div`
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
