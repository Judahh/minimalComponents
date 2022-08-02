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
