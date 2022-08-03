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

export const Center = styled.div`
  margin: auto;
  width: fit-content;
  padding: 10px;
`;

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
