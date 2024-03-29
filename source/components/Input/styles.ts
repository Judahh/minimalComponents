//@ts-ignore
import React from 'react';
import styled from 'styled-components';
import { default as lightTheme } from '../../styles/themes/light.json';
import { transparentize } from 'polished';
import { baseConfig } from '../../utils/config';
import { Icon, IconType } from './icon';

export const selectStyle = (props) => {
  return {
    dropdownIndicator: () => ({
      backgroundColor: 'transparent',
      color: '' + props.theme.primary,
    }),

    indicatorSeparator: (styles) => ({
      ...styles,
      backgroundColor: 'transparent',
    }),

    control: (styles) => ({
      ...styles,
      cursor: 'pointer',
      margin: '5px',
      backgroundColor: props.theme.background,
      border: 'none',
      borderColor: '' + props.theme.primary,
      borderBottom: '1px solid ' + props.theme.primary,
      borderRadius: '0',
      color: '' + props.theme.primary,
      minWidth: '25px',
      ':active': {
        backgroundColor: props.theme.background,
        border: 'none',
        borderBottom: '1px solid ' + props.theme.primary,
        borderRadius: '0',
      },
      ':hover': {
        backgroundColor: props.theme.background,
        border: 'none',
        borderBottom: '1px solid ' + props.theme.bright,
        borderRadius: '0',
      },
    }),

    menu: (styles, { isFocused, isSelected }) => ({
      ...styles,
      cursor: 'pointer',
      backgroundColor:
        '' + (isSelected ? props.theme.background : props.theme.primary),
      border:
        '1px solid ' + isSelected || isFocused
          ? props.theme.primary
          : props.theme.background,
      color:
        '' + isSelected || isFocused
          ? props.theme.bright
          : props.theme.background,
      width: 'fit-content',
    }),
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        cursor: 'pointer',
        color: '' + props.theme.bright,
        backgroundColor: props.theme.background,
        border: isSelected ? '1px solid ' + props.theme.bright : 'none',
      };
    },
    input: (styles) => ({
      ...styles,
      color: '' + props.theme.bright,
    }),
    placeholder: (styles) => ({ ...styles, color: '' + props.theme.primary }),
    singleValue: (styles) => ({ ...styles, color: '' + props.theme.bright }),
  };
};

export const FlagHolder = styled.div`
  position: relative;
`;

export const Flags = styled.div`
  ${(props) => baseConfig(props)}
  z-index: 1000;
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 6px;
  top: 27.5px;

  button {
    margin: 5px;
    &:hover {
      img {
        animation: ${(props) =>
          props?.theme?.animation?.flag?.duration || 1.5}s;
      }
    }
  }

  @media (max-width: 1166px) {
    margin-right: 40vw;
    top: 12.5px;
  }

  @media (max-width: 767px) {
    button {
      &:hover {
        img {
          animation: ${(props) =>
            props?.theme?.animation?.flag?.duration || 1.5}s;
        }
      }
    }
  }
`;

export const CloseButton = styled.div`
  ${(props) => baseConfig(props)}
  ${(props) =>
    Icon(
      props.iconType,
      props.disabled,
      props.iconType == IconType.circle
        ? props?.color || 'red'
        : props?.color || props?.theme?.primary || 'black',
      undefined,
      undefined
    )}
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
    background-color: ${(props) =>
      props?.color || props?.theme?.primary || 'black'};
    content: '';
    display: block;
    height: 2px;
    left: -33px;
    position: absolute;
    top: 9px;

    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;

    -webkit-transition: background-color
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-in-out,
      top
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-out,
      -webkit-transform ${(props) =>
          props?.theme?.transition?.input?.toggle?.duration || 0.2}s linear;
    transition: background-color
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-in-out,
      top
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-out,
      -webkit-transform ${(props) =>
          props?.theme?.transition?.input?.toggle?.duration || 0.2}s linear;
    transition: background-color
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-in-out,
      top
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-out,
      transform
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        linear;
    transition: background-color
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-in-out,
      top
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-out,
      transform
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        linear,
      -webkit-transform ${(props) =>
          props?.theme?.transition?.input?.toggle?.duration || 0.2}s linear;
    width: 26px;
  }

  span:before,
  span:after {
    background-color: ${(props) =>
      props?.color || props?.theme?.primary || 'black'};
    content: '';
    display: block;
    height: 2px;
    position: absolute;
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-transition: background-color
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-in-out,
      top
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-out,
      -webkit-transform ${(props) =>
          props?.theme?.transition?.input?.toggle?.duration || 0.2}s linear;
    transition: background-color
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-in-out,
      top
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-out,
      -webkit-transform ${(props) =>
          props?.theme?.transition?.input?.toggle?.duration || 0.2}s linear;
    transition: background-color
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-in-out,
      top
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-out,
      transform
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        linear;
    transition: background-color
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-in-out,
      top
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-out,
      transform
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        linear,
      -webkit-transform ${(props) =>
          props?.theme?.transition?.input?.toggle?.duration || 0.2}s linear;
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
    -webkit-transition: background
      ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
      ease-out;
    transition: background
      ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
      ease-out;
  }
  &.openned span:before,
  &.openned span:after {
    -webkit-transition: top
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-out,
      -webkit-transform ${(props) =>
          props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(
          props
        ) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out;
    transition: top
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-out,
      -webkit-transform ${(props) =>
          props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(
          props
        ) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out;
    transition: top
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-out,
      transform
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-out;
    transition: top
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-out,
      transform
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s
        ease-out,
      -webkit-transform ${(props) =>
          props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(
          props
        ) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out;
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

export const Input = styled.input`
  ${(props) => baseConfig(props)}
  position: relative;
  display: block;
  min-width: 30px;
  font-size: ${(props) =>
    props?.size || props?.theme?.input?.font?.size || '14px'};
  font-weight: ${(props) =>
    props?.weight || props?.theme?.input?.font?.weight || 'bolder'};
  padding: ${(props) =>
    ((props?.size || props?.theme?.input?.font?.size || 14) + 2 - 4) / 2 +
    'px 0px'};
  margin: 0;
  color: ${(props) =>
    props.active
      ? props?.theme?.background || 'white'
      : props?.color || props?.theme?.primary || 'black'};
  background: ${(props) =>
    props.active
      ? props?.color || props?.theme?.primary || 'black'
      : props?.theme?.background || 'white'};
  letter-spacing: 1.2px;
  color-scheme: ${(props) => (props?.theme === lightTheme ? 'light' : 'dark')};

  ${(props) => (props.small ? `width: max-content;` : `width: auto;`)}

  ${(props) =>
    props.big
      ? `
    padding: 10px 10px;
    @media screen and (max-width: 350px) {
      min-width: 100%;
    }

    @media screen and (max-width: 1000px) {
      width: 100%;
    }`
      : ``}

  transition: all ${(props) =>
    props?.theme?.transition?.input?.duration || 0.15}s;

  ${(props) =>
    props?.roudedEdges ? 'border-radius: 4px;' : 'border-radius: 0px;'};

  &::-webkit-input-placeholder {
    color: ${(props) =>
      transparentize(0.5, props?.color || props?.theme?.primary || 'black')};
  }

  &:last-child {
    margin-bottom: 30px;
  }

  &[type='text'],
  &[type='number'],
  &[type='password'],
  &[type='email'],
  &[type='url'],
  &[type='tel'],
  &[type='search'] {
    padding: 5px;
    border: none;
    cursor: text;
    border-bottom: 1px solid
      ${(props) =>
        transparentize(0.5, props?.color || props?.theme?.primary || 'black')};
    background: transparent;
  }

  &[type='text']:hover,
  &[type='number']:hover,
  &[type='password']:hover,
  &[type='email']:hover,
  &[type='url']:hover,
  &[type='tel']:hover,
  &[type='search']:hover,
  &[type='text']:focus,
  &[type='number']:focus,
  &[type='password']:focus,
  &[type='email']:focus,
  &[type='url']:focus,
  &[type='tel']:focus,
  &[type='search']:focus {
    padding: 5px;
    border: none;
    border-bottom: 1px solid
      ${(props) => props?.color || props?.theme?.primary || 'black'};
    background: transparent;
  }

  &[type='search'],
  &[type='search']:focus,
  &[type='search']:hover {
    ${(props) =>
      Icon(
        props?.iconType === undefined ? IconType.magnifier : props?.iconType,
        props.disabled,
        props?.color || props?.theme?.primary || 'black',
        undefined,
        true
      )}
    background-repeat: no-repeat !important;
    background-position: 5px 5px !important;
    background-size: ${(props) =>
        props?.size || props?.theme?.input?.font?.size || '14px'}
      ${(props) => props?.size || props?.theme?.input?.font?.size || '14px'} !important;
    appearance: searchfield;
    padding-left: ${(props) =>
      +(
        '' + (props?.size || props?.theme?.input?.font?.size || '14px')
      ).replace('px', '') + 10}px;
    padding-right: 5px;
  }

  &[type='search'] {
    width: ${(props) =>
      +(
        '' + (props?.size || props?.theme?.input?.font?.size || '14px')
      ).replace('px', '') + 10}px;
    padding: 5px;
    border-bottom: 0;
    min-width: ${(props) =>
      +(
        '' + (props?.size || props?.theme?.input?.font?.size || '14px')
      ).replace('px', '') + 10}px;
    :focus,
    :hover,
    :active {
      width: 100%;
      min-width: 100%;
      padding-left: ${(props) =>
        +(
          '' + (props?.size || props?.theme?.input?.font?.size || '14px')
        ).replace('px', '') + 10}px;
      border-bottom: 1px solid
        ${(props) => props?.color || props?.theme?.primary || 'black'};
    }
    &:not(:placeholder-shown) {
      padding-left: ${(props) =>
        +(
          '' + (props?.size || props?.theme?.input?.font?.size || '14px')
        ).replace('px', '') + 10}px;
      width: 100%;
      min-width: 100%;
      border-bottom: 1px solid
        ${(props) => props?.color || props?.theme?.primary || 'black'};
    }
  }

  ::-webkit-search-cancel-button {
    content: '';
    appearance: none;
    ${(props) =>
      Icon(
        props.closeIconType,
        props.disabled,
        props?.color ||
          (props.closeIconType === IconType.circle
            ? 'red'
            : props?.theme?.primary || 'black'),
        +(
          '' + (props?.size || props?.theme?.input?.font?.size || '14px')
        ).replace('px', '') + 'px',
        true
      )}
    cursor: pointer;
    position: relative;
    right: 0px;
    width: ${(props) =>
      props?.size || props?.theme?.input?.font?.size || '14px'};
    height: ${(props) =>
      props?.size || props?.theme?.input?.font?.size || '14px'};
    min-width: ${(props) =>
      props?.size || props?.theme?.input?.font?.size || '14px'};
    min-height: ${(props) =>
      props?.size || props?.theme?.input?.font?.size || '14px'};
    max-width: ${(props) =>
      props?.size || props?.theme?.input?.font?.size || '14px'};
    max-height: ${(props) =>
      props?.size || props?.theme?.input?.font?.size || '14px'};
    margin-left: ${(props) =>
      +(
        '' + (props?.size || props?.theme?.input?.font?.size || '14px')
      ).replace('px', '') + 10}px;
  }

  &[type='time'],
  &[type='week'],
  &[type='month'],
  &[type='date'],
  &[type='datetime-local'] {
    border: none;
    padding: 5px;
    cursor: text;
    border-bottom: 1px solid
      ${(props) =>
        transparentize(0.5, props?.color || props?.theme?.primary || 'black')};
    background: transparent;
  }

  &[type='time']:hover,
  &[type='week']:hover,
  &[type='month']:hover,
  &[type='date']:hover,
  &[type='datetime-local']:hover,
  &[type='time']:focus,
  &[type='week']:focus,
  &[type='month']:focus,
  &[type='date']:focus,
  &[type='datetime-local']:focus {
    border: none;
    padding: 5px;
    border-bottom: 1px solid
      ${(props) => props?.color || props?.theme?.primary || 'black'};
    background: transparent;
  }

  &[type='button'],
  &[type='file'],
  &[type='submit'],
  &[type='reset'],
  &[type='checkbox'],
  &[type='radio']
    ${(props) =>
      props.tag
        ? ", &[type='checkbox'] + label, &[type='radio'] + label"
        : ''} {
    ${(props) => (props?.iconValue ? 'font-family: ui-monospace;' : '')}
    border: none;
    cursor: pointer;
    align-content: center;
    align-items: center;
    alignment-baseline: central;
    text-align: center;
    vertical-align: middle;
    ${(props) =>
      props.link
        ? `border-bottom: 1px solid ${transparentize(
            0.5,
            props?.color || props?.theme?.primary || 'black'
          )};`
        : props.inverted
        ? props.filled
          ? `color: ${props?.theme?.background || 'white'};
             background: ${props?.color || props?.theme?.primary || 'black'};`
          : `border: 1px solid ${
              (props.noBackground ? 'transparent' : props?.theme?.background) ||
              'white'
            };
             color: ${props?.theme?.background || 'white'};
             background: ${props?.color || props?.theme?.primary || 'black'};`
        : props.filled
        ? `color: ${props?.theme?.primary || 'black'};
             background: ${
               props?.color ||
               (props.noBackground
                 ? 'transparent'
                 : props?.theme?.background) ||
               'white'
             };`
        : `border: 1px solid ${props?.theme?.primary || 'black'};
              color: ${props?.theme?.primary || 'black'};
              background: ${
                props?.color ||
                (props.noBackground
                  ? 'transparent'
                  : props?.theme?.background) ||
                'white'
              };`}

    ${(props) =>
      props.crude
        ? props.inverted
          ? `border: 0;
         color: ${
           !props.filled && props?.color
             ? props?.theme?.primary
             : props?.color || props?.theme?.primary || 'black'
         };
         background: ${
           !props.filled && props?.color
             ? 'transparent'
             : props.noBackground
             ? 'transparent'
             : props?.color || props?.theme?.primary || 'white'
         };`
          : `border: 0;
         color: ${
           !props.filled && props?.color
             ? props?.color
             : props?.theme?.background || 'white'
         };
         background: ${
           !props.filled && props?.color
             ? 'transparent'
             : props?.color || props?.theme?.primary || 'black'
         };`
        : ``}
  }

  &[type='button']:hover,
  &[type='file']:hover,
  &[type='submit']:hover,
  &[type='reset']:hover,
  &[type='checkbox']:hover,
  &[type='radio']:hover
    ${(props) =>
      props.tag
        ? ", &[type='checkbox']:hover + label, &[type='radio']:hover + label" +
        ", &[type='checkbox']:checked + label, &[type='radio']:checked + label"
        : ''} {
    border: none;
    ${(props) =>
      props.link
        ? `border-bottom: 1px solid ${
            props?.color || props?.theme?.primary || 'black'
          };`
        : props.inverted
        ? props.filled
          ? `color: ${props?.color || props?.theme?.primary || 'black'};
           background: ${
             (props.noBackground ? 'transparent' : props?.theme?.background) ||
             'white'
           };`
          : `border: 1px solid ${
              props?.color || props?.theme?.primary || 'black'
            };
           color: ${props?.color || props?.theme?.primary || 'black'};
           background: ${
             (props.noBackground ? 'transparent' : props?.theme?.background) ||
             'white'
           };`
        : props.filled
        ? `color: ${props?.color || props?.theme?.background || 'white'};
           background: ${props?.theme?.primary || 'black'};`
        : `border: 1px solid ${
            props?.color || props?.theme?.background || 'white'
          };
           color: ${props?.color || props?.theme?.background || 'white'};
           background: ${props?.theme?.primary || 'black'};`}
    ${(props) =>
      props.crude
        ? props.inverted
          ? `border: 0;
         color: ${
           !props.filled && props?.color
             ? props?.color
             : props?.theme?.background || 'white'
         };
         background: ${
           !props.filled && props?.color
             ? 'transparent'
             : props?.color || props?.theme?.primary || 'black'
         };`
          : `border: 0;
         color: ${
           !props.filled && props?.color
             ? props?.theme?.primary
             : props?.color || props?.theme?.primary || 'black'
         };
         background: ${
           !props.filled && props?.color
             ? 'transparent'
             : props.noBackground
             ? 'transparent'
             : props?.color || props?.theme?.primary || 'black'
         };`
        : ``}
  }

  &[type='button']:focus,
  &[type='file']:focus,
  &[type='submit']:focus,
  &[type='reset']:focus,
  &[type='checkbox']:focus,
  &[type='radio']:focus
    ${(props) =>
      props.tag
        ? ", &[type='checkbox']:focus + label, &[type='radio']:focus + label"
        : ''} {
    border: none;
    ${(props) =>
      props.link
        ? `border-bottom: 1px dashed ${
            props?.color || props?.theme?.primary || 'black'
          };`
        : props.inverted
        ? props.filled
          ? `color: ${props?.color || props?.theme?.primary || 'black'};
           background: ${
             (props.noBackground ? 'transparent' : props?.theme?.background) ||
             'white'
           };`
          : `border: 1px dashed ${
              props?.color || props?.theme?.primary || 'black'
            };
           color: ${props?.color || props?.theme?.primary || 'black'};
           background: ${
             (props.noBackground ? 'transparent' : props?.theme?.background) ||
             'white'
           };`
        : props.filled
        ? `color: ${props?.color || props?.theme?.background || 'white'};
           background: ${props?.theme?.primary || 'black'};`
        : `border: 1px dashed ${
            props?.color || props?.theme?.background || 'white'
          };
           color: ${props?.color || props?.theme?.background || 'white'};
           background: ${props?.theme?.primary || 'black'};`}
    ${(props) =>
      props.crude
        ? props.inverted
          ? `border: 0;
         color: ${
           !props.filled && props?.color
             ? props?.color
             : props?.theme?.background || 'white'
         };
         background: ${
           !props.filled && props?.color
             ? 'transparent'
             : props?.color || props?.theme?.primary || 'black'
         };`
          : `border: 0;
         color: ${
           !props.filled && props?.color
             ? props?.theme?.primary
             : props?.color || props?.theme?.primary || 'black'
         };
         background: ${
           !props.filled && props?.color
             ? 'transparent'
             : props.noBackground
             ? 'transparent'
             : props?.color || props?.theme?.primary || 'black'
         };`
        : ``}
  }

  &[type='checkbox'],
  &[type='radio'] {
    ${(props) => (props.tag ? 'display: none;' : '')}
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    position: relative;
    appearance: none;
    content: '';
    width: 30px;
    height: 30px;
    min-width: 30px;
    min-height: 30px;
    max-width: 30px;
    max-height: 30px;
    border: 1px solid
      ${(props) => props?.color || props?.theme?.primary || 'black'};
    background: transparent;
  }

  &[type='checkbox']::before {
    position: absolute;
    content: '';
    width: ${(props) => (props.size || 30) - 3}px;
    height: ${(props) => (props.size || 30) - 3}px;
    opacity: 0;
    ${(props) =>
      Icon(
        props?.iconType === undefined ? IconType.check : props?.iconType,
        props.disabled,
        props?.color || props?.theme?.primary || 'black',
        (props.size || 30) - 4 + 'px',
        true
      )}
    left: 1px;
    top: 1px;
  }

  &[type='radio']::before {
    ${(props) => (props.tag ? 'display: none;' : '')}
    position: absolute;
    content: '';
    width: ${(props) => (props.size || 30) - 6}px;
    height: ${(props) => (props.size || 30) - 6}px;
    left: 2px;
    bottom: 2px;
    border-width: 0 2px 2px 0;
    ${(props) =>
      Icon(
        props?.iconType === undefined ? IconType.square : props?.iconType,
        props.disabled,
        props?.color || props?.theme?.primary || 'black',
        undefined,
        true
      )}
    opacity: 0;
  }

  &[type='checkbox']:checked::before,
  &[type='radio']:checked::before {
    opacity: 1;
  }

  &[type='checkbox']:focus,
  &[type='radio']:focus {
    background: ${(props) =>
      transparentize(0.5, props?.color || props?.theme?.primary || 'black')};
  }

  :disabled {
    background: ${(props) =>
      transparentize(0.5, props?.theme?.background || 'white')};
    border-color: ${(props) =>
      transparentize(0.5, props?.color || props?.theme?.primary || 'black')};
    cursor: not-allowed;
  }

  &[type='color'] {
    cursor: pointer;
    padding: 2px;
    margin: 0px;
    width: max-content;
    height: max-content;
    border: 1px solid transparent;
  }

  &[type='color']:hover {
    border: 1px solid
      ${(props) => props?.color || props?.theme?.primary || 'black'};
  }

  &[type='color']:focus {
    border: 1px dashed
      ${(props) => props?.color || props?.theme?.primary || 'black'};
  }

  &[type='range'] {
    cursor: pointer;
    appearance: none;
    width: 100%;
    height: 20px;
    padding: 0 5px;
    margin: 0;
    background: transparent;
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;
    position: relative;
  }

  &[type='range']:hover {
    opacity: 1;
  }

  &[type='range']:focus {
    border: 1px solid
      ${(props) => props?.color || props?.theme?.primary || 'black'};
  }

  ::-webkit-slider-runnable-track {
    height: 10px;
    background: ${(props) =>
      transparentize(0.3, props?.color || props?.theme?.primary || 'black')};
  }

  ::-moz-range-track {
    height: 10px;
    background: ${(props) =>
      transparentize(0.3, props?.color || props?.theme?.primary || 'black')};
  }

  ::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: ${(props) => props?.theme?.background || 'white'};
    border: 1px solid
      ${(props) => props?.color || props?.theme?.primary || 'black'};
    cursor: pointer;
    top: 0px;
    margin-top: -3px;
    position: relative;
  }

  ::-moz-range-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: ${(props) => props?.theme?.background || 'white'};
    border: 1px solid
      ${(props) => props?.color || props?.theme?.primary || 'black'};
    cursor: pointer;
    top: 0px;
    margin-top: -3px;
    position: relative;
  }

  ::-webkit-color-swatch-wrapper {
    margin: 0;
    padding: 0;
    outline: 0;
  }

  ::-webkit-color-swatch {
    margin: 0;
    padding: 0;
    outline: 0;
    width: 25px;
    height: 25px;
    border: 1px solid
      ${(props) => props?.color || props?.theme?.primary || 'black'};
  }

  ::-webkit-calendar-picker-indicator {
    cursor: pointer;
    background-color: transparent;
    color: ${(props) => props?.color || props?.theme?.primary || 'black'};
    filter: ${(props) => {
      if(props.type.toLowerCase().includes('date') ||
        props.type.toLowerCase().includes('month') ||
        props.type.toLowerCase().includes('week') ||
        props.type.toLowerCase().includes('time')){
        let color = props?.color || props?.theme?.primary || '#000000';
        let c = color.substring(1);      // strip #
        let rgb = parseInt(c, 16);   // convert rrggbb to decimal
        let r = (rgb >> 16) & 0xff;  // extract red
        let g = (rgb >>  8) & 0xff;  // extract green
        let b = (rgb >>  0) & 0xff;  // extract blue
        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        // console.log('luma', luma);
        return (luma < 100 ? 'invert(100%)' : 'invert(0%)')
      }
      return ('invert(0%)')
      }};
  }

  ${(props) =>
    props.effect === 'underline'
      ? `:before {
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
        background-color: ${props?.color || props?.theme?.primary || 'black'};
        visibility: visible;
        width: 100%;
      }
    }`
      : ''}
`;
