import styled from 'styled-components';
import { shade } from 'polished';
import { baseConfig } from '../../../util';

export const TagList = styled.div`
  ${baseConfig}
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Tag = styled.button`
  ${baseConfig}
  padding: 4px 16px;
  border-radius: 4px;
  transition: all 0.2s;
  margin-bottom: 16px;
  margin-right: 24px;
  border: 1px solid;
  border-color: ${(props) => props.theme.primary};

  background: ${(props) =>
    props.active ? props.theme.primary : 'rgba(202, 205, 209, 0.25)'};

  &:hover {
    background: ${(props) => shade(0.4, props.theme.primary)};
    color: ${(props) => props.theme.background} !important;
  }

  // &:focus {
  //   background: ${(props) => props.theme.primary};
  //   color: ${(props) => props.theme.background} !important;
  // }

  // &:first-child {
  //   margin-top: 24px;
  // }

  color: ${(props) =>
    props.active ? props.theme.background : props.theme.text};
`;
