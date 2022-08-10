//@ts-ignore
import React from 'react';
import styled from 'styled-components';
import { default as lightTheme } from '../../styles/themes/light.json';
import { transparentize } from 'polished';
import { baseConfig } from '../../utils/util';
import { CloseType } from './closeType';

export const BasicClose = `
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  height: 15px;
  width: 15px;
  opacity: 0.7;
  margin: 5px;
  :hover {
    opacity: 1;
  }
`;

export const BasicRedCircle = (color: string) => `
  ${BasicClose}
  background-color: ${color || 'red'};
  border-radius: 100px;
  opacity: 1;
  border: 0px solid red;
  :hover {
    border: 0px solid red;
  }
`;

export const BasicX = (color: string) => `
  ${BasicClose}
  background-color: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${color.replace('#', '%23')}'>
    <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/>
  </svg>");
`;

export const CloseButton = styled.div`
  ${(props) => baseConfig(props)}
  ${(props) => props.closeType === CloseType.red ? BasicRedCircle(props?.color) : BasicX(props?.color || props?.theme?.primary)}
  float: right;
`;

export const TagList = styled.div`
  ${(props) => baseConfig(props)}
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ToggleHolder = styled.div`
  ${(props) => baseConfig(props)}
  cursor: pointer;
  margin: 0 20px;
  height: 20px;
  width: 40px;
`;

export const Toggle = styled.div`
  ${(props) => baseConfig(props)}
  float: right;
  position: relative;

  span {
    background-color: ${(props) => props?.color || props?.theme?.primary};
    content: "";
    display: block;
    height: 2px;
    left: -33px;
    position: absolute;
    top: 9px;

    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;

    -webkit-transition: background-color ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-in-out, top ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out,  -webkit-transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s linear;
    transition: background-color ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-in-out, top ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out,  -webkit-transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s linear;
    transition: background-color ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-in-out, top ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out,  transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s linear;
    transition: background-color ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-in-out, top ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out,  transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s linear, -webkit-transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s linear;
    width: 26px;
  }

  span:before, span:after {
    background-color: ${(props) => props?.color || props?.theme?.primary};
    content: "";
    display: block;
    height: 2px;
    position: absolute;
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    -webkit-transition: background-color ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-in-out, top ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out,  -webkit-transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s linear;
    transition: background-color ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-in-out, top ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out,  -webkit-transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s linear;
    transition: background-color ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-in-out, top ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out,  transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s linear;
    transition: background-color ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-in-out, top ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out,  transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s linear, -webkit-transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s linear;
    width: 26px;
  }
  span:before {
    top: 7px;
  }
  span:after {
    top: -7px;
  }
  &.openned span {
    background-color: transparent;
    -webkit-transition: background ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out;
    transition: background ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out;
  }
  &.openned span:before, &.openned span:after {
    -webkit-transition: top ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out, -webkit-transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out;
    transition: top ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out, -webkit-transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out;
    transition: top ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out, transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out;
    transition: top ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out, transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out, -webkit-transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out;
  }
  &.openned span:before {
    top: 0;
    -webkit-transform: rotate3d(0, 0, 1, -45deg);
            transform: rotate3d(0, 0, 1, -45deg);
  }
  &.openned span:after {
    top: 0;
    -webkit-transform: rotate3d(0, 0, 1, 45deg);
            transform: rotate3d(0, 0, 1, 45deg);
  }

`;

export const DebounceInputWrapper = styled.div`
  ${(props) => baseConfig(props)}
  input {
    padding: 15px;
    padding-left: 0;
    display: block;
    min-width: 25px;
    border-radius: 0;
    background-color: transparent;
    border-bottom: 1px solid ${(props) => transparentize(0.5, props?.color || props?.theme?.primary)};
    color: ${(props) => props?.color || props?.theme?.primary};
    letter-spacing: 1.2px;
    margin-bottom: 16px;

    &:focus {
      border-color: ${(props) => props?.color || props?.theme?.primary};
      color: ${(props) => props?.color || props?.theme?.primary};
      &::-webkit-input-placeholder {
        color: ${(props) => transparentize(0.5, props?.color || props?.theme?.primary)};
      }
    }

    &::-webkit-input-placeholder {
      color: ${(props) => transparentize(0.5, props?.color || props?.theme?.primary)};
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
  ${(props) => baseConfig(props)}
  position: relative;
  display: block;
  min-width: 30px;
  font-size: ${(props) => props?.theme?.input?.font?.size || '14px'};
  color: ${(props) =>
    props.active ? props?.theme?.background : props?.color || props?.theme?.primary};
  background: ${(props) =>
    props.active ? props?.color || props?.theme?.primary : props?.theme?.background};
  letter-spacing: 1.2px;
  color-scheme: ${(props) => ( props?.theme === lightTheme ? "light" : "dark" )};

  ${(props) => props.small ? `width: max-content;` : `width: auto;`}

  ${(props) => props.big ? `
    padding: 10px 50px;
    @media screen and (max-width: 350px) {
      min-width: 100%;
    }

    @media screen and (max-width: 1000px) {
      width: 100%;
    }` :
    `padding: 0; margin: 0;`
  }

  transition: all ${(props) => props?.theme?.transition?.input?.duration || 0.15}s;

  ${(props) => ( props?.roudedEdges ? 'border-radius: 4px;' : '' )};

  &::-webkit-input-placeholder {
    color: ${(props) => transparentize(0.5, props?.color || props?.theme?.primary || 'red')};
  }

  &:last-child {
    margin-bottom: 30px;
  }

  &[type='text'], &[type='number'], &[type='password'], &[type='email'], &[type='url'], &[type='tel'], &[type='search'] {
    border: none;
    cursor: text;
    border-bottom: 1px solid ${(props) => transparentize(0.5, props?.color || props?.theme?.primary || 'black')};
    background: transparent;
  }

  &[type='text']:hover, &[type='number']:hover, &[type='password']:hover, &[type='email']:hover, &[type='url']:hover, &[type='tel']:hover, &[type='search']:hover,
  &[type='text']:focus, &[type='number']:focus, &[type='password']:focus, &[type='email']:focus, &[type='url']:focus, &[type='tel']:focus, &[type='search']:focus {
    border: none;
    border-bottom: 1px solid ${(props) => props?.color || props?.theme?.primary || 'black'};
    background: transparent;
  }

  &[type='time'], &[type='week'], &[type='month'], &[type='date'], &[type='datetime-local'] {
    border: none;
    cursor: pointer;
    border-bottom: 1px solid ${(props) => transparentize(0.5, props?.color || props?.theme?.primary || 'black')};
    background: transparent;
  }

  &[type='time']:hover, &[type='week']:hover, &[type='month']:hover, &[type='date']:hover, &[type='datetime-local']:hover {
    border: none;
    border-bottom: 1px solid ${(props) => props?.color || props?.theme?.primary || 'black'};
    background: transparent;
  }

  &[type='time']:focus, &[type='week']:focus, &[type='month']:focus, &[type='date']:focus, &[type='datetime-local']:focus {
    border: none;
    border-bottom: 1px dashed ${(props) => props?.color || props?.theme?.primary || 'black'};
    background: transparent;
  }

  &[type='button'], &[type='file'], &[type='submit'], &[type='reset'], &[type='checkbox'], &[type='radio'] {
    border: none;
    cursor: pointer;
    align-content: center;
    align-items: center;
    alignment-baseline: central;
    text-align: center;
    vertical-align: middle;
    ${(props) => (props.link ?
      (`border-bottom: 1px solid ${transparentize(0.5, props?.color || props?.theme?.primary || 'black')};`) :
      (props.inverted ?
        (props.filled ?
          (
            `color: ${props?.theme?.primary || 'black'};
             background: ${props?.color || props?.theme?.background || 'white'};`
          ):(
            `border: 1px solid ${props?.theme?.primary || 'black'};
              color: ${props?.theme?.primary || 'black'};
              background: ${props?.color || props?.theme?.background || 'white'};`
          )
        ) :
        (props.filled ?
          (
            `color: ${props?.theme?.background || 'white'};
             background: ${props?.color || props?.theme?.primary || 'black'};`
          ):(
            `border: 1px solid ${props?.theme?.background || 'white'};
             color: ${props?.theme?.background || 'white'};
             background: ${props?.color || props?.theme?.primary || 'black'};`
          )
        )
      )
    )}
    ${(props) => props.noBackground ?
      `background: transparent;
       ${props.filled ? `border-color: ${props?.color || props?.theme?.primary || 'black'};` : 'border: none;'}
       color: ${props?.color || props?.theme?.primary || 'black'};` :
      ''
    }
  }

  &[type='button']:hover, &[type='file']:hover, &[type='submit']:hover, &[type='reset']:hover, &[type='checkbox']:hover, &[type='radio']:hover {
    border: none;
    ${(props) => props.link ?
      `border-bottom: 1px solid ${props?.color || props?.theme?.primary || 'black'};` :
      props.inverted ?
        (props.filled ?
          `color: ${props?.color || props?.theme?.background || 'white'};
          background: ${props?.theme?.primary || 'black'};`:
          `border: 1px solid ${props?.color || props?.theme?.background || 'white'};
          color: ${props?.color || props?.theme?.background || 'white'};
          background: ${props?.theme?.primary || 'black'};`
          ) :
        (props.filled ?
          `color: ${props?.color || props?.theme?.primary || 'black'};
            background: ${props?.theme?.background || 'white'};`:
          `border: 1px solid ${props?.color || props?.theme?.primary || 'black'};
            color: ${props?.color || props?.theme?.primary || 'black'};
            background: ${props?.theme?.background || 'white'};`)
    }
    ${(props) => props.noBackground ?
      `background: transparent;
       ${props.filled ? `border-color: ${props?.color || props?.theme?.primary || 'black'};` : 'border: none;'}
       color: ${props?.color || props?.theme?.primary || 'black'};` :
      ''
    }
  }

  &[type='button']:focus, &[type='file']:focus, &[type='submit']:focus, &[type='reset']:focus, &[type='checkbox']:focus, &[type='radio']:focus {
    border: none;
    ${(props) => props.link ?
      `border-bottom: 1px dashed ${props?.color || props?.theme?.primary || 'black'};` :
      props.inverted ?
        (props.filled ?
          `color: ${props?.color || props?.theme?.background || 'white'};
          background: ${props?.theme?.primary || 'black'};`:
          `border: 1px dashed ${props?.color || props?.theme?.background || 'white'};
          color: ${props?.color || props?.theme?.background || 'white'};
          background: ${props?.theme?.primary || 'black'};`
          ) :
        (props.filled ?
          `color: ${props?.color || props?.theme?.primary || 'black'};
            background: ${props?.theme?.background || 'white'};`:
          `border: 1px dashed ${props?.color || props?.theme?.primary || 'black'};
            color: ${props?.color || props?.theme?.primary || 'black'};
            background: ${props?.theme?.background || 'white'};`)
    }
    ${(props) => props.noBackground ?
      `background: transparent;
       ${props.filled ? `border-color: ${props?.color || props?.theme?.primary || 'black'};` : ''}
       color: ${props?.color || props?.theme?.primary || 'black'};` :
      ''
    }
  }

  &[type="checkbox"]::before {
    position: absolute;
    content: "";
    width: 9px;
    height: 18px;
    opacity: 0;
    left: 7px;
    bottom: 5px;
    border: solid red;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  &[type="radio"]::before {
    position: absolute;
    content: "";
    width: 19px;
    height: 19px;
    opacity: 0;
    left: 2px;
    bottom: 2px;
    border-width: 0 2px 2px 0;
    background-color: ${(props) => props?.color || props?.theme?.primary || 'black'};
  }

  &[type="checkbox"]:checked::before,
  &[type="radio"]:checked::before {
    opacity: 1;
  }

  &[type="checkbox"]:focus,
  &[type="radio"]:focus {
    background: ${(props) => transparentize(0.5, props?.color || props?.theme?.primary || 'black')};
  }

  :disabled {
    background: ${(props) => transparentize(0.5, props?.theme?.background || 'white')};
    border-color: ${(props) => transparentize(0.5, props?.color || props?.theme?.primary || 'black')};
    cursor: not-allowed;
  }

  &[type='color'] {
    cursor: pointer;

  }

  &[type='color']:hover {

  }

  &[type='color']:focus {

  }

  &[type='range'] {
    cursor: pointer;

  }

  &[type='range']:hover {

  }

  &[type='range']:focus {

  }

  &[type='search'] {
    background-color: transparent;
    background-image: url("data:image/svg+xml;utf8,<svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.82368 16.6637C14.1192 16.6637 17.6015 13.1815 17.6015 8.88593C17.6015 4.59038 14.1192 1.10815 9.82368 1.10815C5.52813 1.10815 2.0459 4.59038 2.0459 8.88593C2.0459 13.1815 5.52813 16.6637 9.82368 16.6637Z" stroke='${(props) => (props?.color || props?.theme?.primary || 'black').replace('#', '%23')}' stroke-miterlimit="10"/>
    <path d="M5.37901 14.8118L0.93457 20.7377" stroke='${(props) => (props?.color || props?.theme?.primary || 'black').replace('#', '%23')}' stroke-miterlimit="10"/>
    </svg>");
    background-size: 30px 30px;
    appearance: searchfield;
    padding-left: 30px;
  }

  &[type='search']:focus {
    width: 100%;
  }

  &[type='search']::-webkit-search-cancel-button {
    position: relative;
    right: 20px;
    margin-left: 30px;

    -webkit-appearance: none;
    ${(props) => props.closeType === CloseType.red ? BasicRedCircle(props?.color) : BasicX(props?.color || props?.theme?.primary)}
  }

  ${(props) => props.effect === 'underline' ?
    `:before {
      display: block;
      content: '';
      position: absolute;
      height: 2px;
      bottom: -3px;
      left: 0;
      visibility: hidden;
      width: 0;
    }

    :hover {
      :before {
        background-color: ${props?.color || props?.theme?.primary};
        visibility: visible;
        width: 100%;
      }
    }` :
    ''
  }
`;
