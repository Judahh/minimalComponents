import React from 'react';
import styled from 'styled-components';
import { default as lightTheme } from '../../styles/themes/light.json';
import { transparentize } from 'polished';
import { baseConfig } from '../../util';
import { CloseType } from './Button/closeType';
import { BasicRedCircle, BasicX } from './Button';

export const DebounceInputWrapper = styled.div`
  input {
    padding: 15px;
    padding-left: 0;
    display: block;
    min-width: 30px;
    border-radius: 0;
    font-size: 2vh;
    font-family: Spartan-Light;
    background-color: transparent;
    border-bottom: 1px solid ${(props) => transparentize(0.5, props.theme.text)};
    color: ${(props) => props.theme.text};
    letter-spacing: 1.2px;
    margin-bottom: 16px;

    &:focus {
      border-color: ${(props) => props.theme.primary};
      color: ${(props) => props.theme.primary};
      &::-webkit-input-placeholder {
        color: ${(props) => transparentize(0.5, props.theme.primary)};
      }
    }

    &::-webkit-input-placeholder {
      color: ${(props) => transparentize(0.5, props.theme.primary)};
    }

    @media screen and (max-width: 1000px) {
      width: 100%;
    }

    @media screen and (max-width: 350px) {
      min-width: 100%;
    }
  }
`;

export const Input = styled.input`
  ${baseConfig}
  transition: width 0.5s ease-in-out;
  padding: 15px;
  padding-left: 0;
  display: block;
  min-width: 30px;
  font-size: 2vh;
  background-color: transparent;
  border-bottom: 1px solid ${(props) => transparentize(0.5, props?.theme?.text || 'red')};
  color: ${(props) => props?.theme?.text || 'red'};
  letter-spacing: 1.2px;
  margin-bottom: 16px;
  color-scheme: ${(props) => ( props?.theme === lightTheme ? "light" : "dark" )};

  &:focus {
    border-color: ${(props) => props?.theme?.primary || 'red'};
    color: ${(props) => props?.theme?.primary || 'red'};
    &::-webkit-input-placeholder {
      color: ${(props) => transparentize(0.5, props?.theme?.primary || 'red')};
    }
  }

  &::-webkit-input-placeholder {
    color: ${(props) => transparentize(0.5, props?.theme?.primary || 'red')};
  }

  @media screen and (max-width: 1000px) {
    width: 100%;
  }

  @media screen and (max-width: 350px) {
    min-width: 100%;
  }

  &:last-child {
    margin-bottom: 30px;
  }

  &[type='search'] {
    background-image: url(${(props) =>
      props.theme !== lightTheme || props.menu === 2
        ? '/img/searchInvert.svg'
        : '/img/search.svg'});
    background-size: 30px 30px;
    appearance: searchfield;
    padding-left: 30px;
  }

  &[type='search']:focus {
    width: 100%;
  }

  &:not(:placeholder-shown) {
    width: 100%;
  }

  &[type='search']::-webkit-search-cancel-button {
    position: relative;
    right: 20px;
    margin-left: 30px;

    -webkit-appearance: none;
    ${(props) => props.closeType === CloseType.red ? BasicRedCircle : BasicX(props.theme.primary)}
  }
`;

export const ChangePicButton = styled.button`
  ${baseConfig}
  width: 30px;
  height: 30px;
  cursor: 'pointer';
  color: ${(props) => props.theme.primary};
  background: ${(props) => props.theme.background};
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

export const Indicator = styled.li`
  ${baseConfig}
  background: ${(props) => props.theme.primary};
  width: 15px;
  height: 15px;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

export const EditButton = styled.button`
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  box-sizing: border-box;
  background-image: url('/img/edit.svg');
  transition: all 0.2s;
  &:hover {
    background-image: url('/img/editInvert.svg');
  }
`;

export const DeleteButton = styled.button`
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  box-sizing: border-box;
  background: red;
  border: 1px solid white;
  color: white;
  font-size: 19px;
  font-weight: bolder;

  &:hover {
    background: white;
    color: red;
    border: 1px solid red;
  }
`;

export const DeletePicButton = styled.button`
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
  font-size: 19px;
  font-weight: bolder;

  &:hover {
    background: ${(props) => props.theme.background};
    color: red;
    border: 1px solid red;
  }
`;

export const AddButton = styled.button`
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
  font-size: 19px;
  font-weight: bolder;

  &:hover {
    background: ${(props) => props.theme.background};
    color: green;
    border: 1px solid green;
  }
`;
