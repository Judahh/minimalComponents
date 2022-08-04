import styled from 'styled-components';
import { default as lightTheme } from '../../../styles/themes/light.json';
import { transparentize } from 'polished';
import { baseConfig } from '../../../util';
import { CloseType } from './closeType';

export const SubmitButton = styled.button`
  ${baseConfig}
  display: block;
  padding: 10px 50px;
  background: ${(props) =>
    props.disabled ? transparentize(0.5, props.theme.primary) : 'transparent'};
  border: 1px solid
    ${(props) =>
      props.disabled
        ? transparentize(0.9, props.theme.primary)
        : props.theme.primary};
  color: ${(props) =>
    props.disabled
      ? transparentize(0.5, props.theme.primary)
      : props.theme.primary};
  margin: 15px 0;
  margin-left: auto;
  border-radius: 4px;
  transition: all ${(props) => props?.theme?.transition?.input?.submitButton?.duration || 0.2}s;
  max-width: 500px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: ${(props) => props?.theme?.input?.submitButton?.font?.size || '2vh'};
  box-sizing: border-box;

  &:hover {
    background: ${(props) =>
      props.disabled
        ? transparentize(0.5, props.theme.primary)
        : props.theme.primary};
    color: ${(props) =>
      props.disabled
        ? transparentize(0.5, props.theme.primary)
        : props.theme.background};
  }

  @media screen and (max-width: 500px) {
    min-width: 100%;
    margin: 5px 0;
  }

  @media screen and (max-width: 300px) {
    padding: 10px 10px;
  }
`;

export const RedButton = styled.button`
  ${baseConfig}
  display: block;
  padding: 10px 50px;
  background: red;
  border: 1px solid white;
  color: white;
  margin: 15px 0;
  border-radius: 4px;
  transition: all ${(props) => props?.theme?.transition?.input?.redButton?.duration || 0.2}s;
  width: 100%;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: ${(props) => props?.theme?.input?.redButton?.font?.size || '2vh'};
  font-weight: ${(props) => props?.theme?.input?.redButton?.font?.weight || '900'};
  box-sizing: border-box;

  &:hover {
    background: white;
    color: red;
    border: 1px solid red;
  }

  @media screen and (max-width: 500px) {
    min-width: 100%;
    margin: 5px 0;
  }

  @media screen and (max-width: 300px) {
    padding: 10px 10px;
  }
`;

export const LocationButton = styled.button`
  ${baseConfig}
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 4px;
  font-size: ${(props) => props?.theme?.input?.locationButton?.font?.size || '2vh'};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  box-sizing: border-box;
  background-image: ${(props) => ( props.theme === lightTheme ? "url('/img/location.svg')" : "url('/img/locationInvert.svg')" )};
  transition: all ${(props) => props?.theme?.transition?.input?.locationButton?.duration || 0.2}s;
  background-repeat: no-repeat;
`;

export const LinkButton = styled.button`
  ${baseConfig}
  font-size: ${(props) => props?.theme?.input?.linkButton?.font?.size || '2vh'};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => props.theme.primary};
  background-color: transparent;
  margin: 0 20px;
  position: relative;
  transition: all ${(props) => props?.theme?.transition?.input?.linkButton?.duration || 0.2}s ease-in-out;

  &:before {
    content: '';
    position: absolute;
    height: 2px;
    bottom: -3px;
    left: 0;
    // visibility: hidden;
    width: 0;
  }

  &:hover {
    &:before {
      background-color: ${(props) => props.theme.primary};
      visibility: visible;
      width: 100%;
    }
  }
`;

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

export const BasicRedCircle = `
  ${BasicClose}
  background-color: red;
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
  ${baseConfig}
  ${(props) => props.closeType === CloseType.red ? BasicRedCircle : BasicX(props.theme.primary)}
  float: right;
`;

export const ChangePicButton = styled.button`
  ${baseConfig}
  width: 30px;
  height: 30px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => props.theme.primary};
  background: ${(props) => props.theme.background};
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

export const CleanButton = styled.button`
  ${baseConfig}
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 4px;
  font-size: ${(props) => props?.theme?.input?.cleanButton?.font?.size || '2vh'};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  box-sizing: border-box;
  background-image: url('/img/edit.svg');
  transition: all ${(props) => props?.theme?.transition?.input?.cleanButton?.duration || 0.2}s;
  &:hover {
    background-image: url('/img/editInvert.svg');
  }
`;

export const DeleteButton = styled.button`
  ${baseConfig}
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  box-sizing: border-box;
  background: red;
  border: 1px solid white;
  color: white;
  font-size: ${(props) => props?.theme?.input?.deleteButton?.font?.size || '2vh'};
  font-weight: ${(props) => props?.theme?.input?.deleteButton?.font?.weight || 'bolder'};

  &:hover {
    background: white;
    color: red;
    border: 1px solid red;
  }
`;

export const ColorButton = styled.button`
  ${baseConfig}
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
  font-size: ${(props) => props?.theme?.input?.colorButton?.font?.size || '2vh'};
  font-weight: ${(props) => props?.theme?.input?.colorButton?.font?.weight || 'bolder'};

  &:hover {
    background: ${(props) => props.theme.background};
    color: ${(props) => props.color};
    border: 1px solid ${(props) => props.color};
  }
`;
