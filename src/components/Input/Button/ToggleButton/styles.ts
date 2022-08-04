import styled from "styled-components";
import { baseConfig } from "../../../../util";

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
    background-color: ${(props) => props.theme.primary};
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
    background-color: ${(props) => props.theme.primary};
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
  &.active span {
    background-color: transparent;
    -webkit-transition: background ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out;
    transition: background ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out;
  }
  &.active span:before, &.active span:after {
    -webkit-transition: top ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out, -webkit-transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out;
    transition: top ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out, -webkit-transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out;
    transition: top ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out, transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out;
    transition: top ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out, transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out, -webkit-transform ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ${(props) => props?.theme?.transition?.input?.toggle?.duration || 0.2}s ease-out;
  }
  &.active span:before {
    top: 0;
    -webkit-transform: rotate3d(0, 0, 1, -45deg);
            transform: rotate3d(0, 0, 1, -45deg);
  }
  &.active span:after {
    top: 0;
    -webkit-transform: rotate3d(0, 0, 1, 45deg);
            transform: rotate3d(0, 0, 1, 45deg);
  }

`;