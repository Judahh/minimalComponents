//@ts-ignore
import React from 'react';
import styled from 'styled-components';
import { baseConfig } from '../../../utils/util';

export const HiddenCheckBox = styled.input.attrs({ type: 'checkbox' })`
  ${(props) => baseConfig(props)}
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  box-sizing: border-box;
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const CheckIcon = styled.svg`
  ${(props) => baseConfig(props)}
  fill: none;
  stroke: black;
  stroke-width: 2px;
  ${HiddenCheckBox}:focus + & {
    stroke: white;
  }
`;

export const StyledCheckbox = styled.div`
  ${(props) => baseConfig(props)}
  display: inline-block;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 3px;
  border: solid 1px black;
  border-radius: 3px;
  transition: all ${(props) => props?.theme?.transition?.input?.checkbox?.duration || 0.15}s;
  ${HiddenCheckBox}:focus + & {
    border: solid 1px white;
    background: black;
  }
`;
export const CheckboxContainer = styled.div`
  ${(props) => baseConfig(props)}
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  height: 100%;
  width: 20px;
  height: 20px;
`;
