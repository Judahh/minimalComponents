import styled from 'styled-components';
import { baseConfig } from '../../utils/config';

export const CollapsibleElement = styled.div`
  ${(props) => baseConfig(props)}
  position: relative;
  overflow: hidden;

  display: block;
  transition: all ${(props) => props?.time || 0.25}s linear
    ${(props) => props?.delay || 0}s;

  max-height: 0px;

  width: 100%;

  &.openned,
  &.open {
    max-height: ${(props) => props?.contentHeight + 'px' || 'fit-content'};
  }

  &.closed {
    max-height: 0px;
  }
`;
