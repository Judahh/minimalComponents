import styled, { css } from "styled-components";
import { baseConfig } from "../../util";

export const StyledHeader = styled.div`
  ${baseConfig}
  display: block;
  justify-content: center;
  width: 100%;
  height: fit-content;
  background: ${(props) => props.menu == 0 ? props.theme.background + "E0" : "transparent"};
  mix-blend-mode: ${(props) => props.menu == 2 ? "difference" : "unset"};
  position: fixed;
  z-index: 999;
  ${(props) => props.theme.hasShadow && css`
    box-shadow: 0px 2px 5px ${(props) => props.theme.shadow};
  `}
  ${(props) => !props.theme.hasShadow && css`
    border-bottom: 1px  solid ${(props) => props.theme.shadow};
  `}
`;

export const StyledFooter = styled.footer`
  ${baseConfig}
  display: block;
  position: fixed;
  bottom: 70px;
  left: 0;
  width: 100%;
  justify-content: center;
  margin: 0 auto;
  // padding: 5px 24px;
  background: ${(props) => props.theme.background};
  font-size: 12px;
  mix-blend-mode: ${(props) => props.menu == 2 ? "difference" : "unset"};
  position: fixed;
  z-index: 999;
  ${(props) => props.theme.hasShadow && css`
    box-shadow: 0px 2px 5px ${(props) => props.theme.shadow};
  `}
  ${(props) => !props.theme.hasShadow && css`
    border-top: 1px  solid ${(props) => props.theme.shadow};
  `}
`;

export const ItemHolder = styled.a`
  ${baseConfig}
  margin: 0;
  top: ${(props) =>
    props.top ? 'min-height: 70px;' : ''}
  width: 100%;
  cursor: pointer;
  border-top: 1px solid ${(props) => props.theme.holder};
  border-bottom: 1px solid ${(props) => props.theme.holder};
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  transition: none;

  &:visited {
    color: ${(props) => props.theme.text};
  }

  & + a {
    border-top: 0;
  }

  &: hover {
    background: ${(props) => props.theme.background};
    font-weight: bold;
    color: ${(props) => props.theme.bright};
  }

  span {
    margin-top: 25px;
    display: inline-block;
  }
`;

export const Item = styled.div`
  ${baseConfig}
  display: flex;
  flex-direction: column;
  text-align: center;
`

export const SubItem = styled.div`
  ${baseConfig}
  display: block;
  width: 100%;
  text-align: center;
`

export const DrawerMenu = styled.div`
  ${baseConfig}
  position: relative;
  top: ${(props) =>
    props.top ? '-500%' : '0'};
  display: none;
  animation: none;
  transition: all 0.2s ease;
  z-index: -10;
  opacity: 0;

  &.open {
    display: block;
    top: ${(props) =>
      props.top ? '-70px' : '266'};
    transition: all transform 0.2s ease;
    opacity: 1;
    background-color: ${(props) => props.theme.background};
  }

  &.closed {
    display: none;
    top: ${(props) =>
      props.top ? '-500%' : '0'};
    transition: all transform 0.2s ease;
    opacity: 0;
  }
`;

export const DrawerWrapper = styled.div`
  ${baseConfig}
  height: 70px;
  width: 100%;
  left: 0;
  display: block;
  position: relative;
  ${(props) =>
    props.top ? 'top: 0' : 'bottom: 0'};
`;

export const ToggleHolder = styled.div`
  ${baseConfig}
  cursor: pointer;
  margin: 0 20px;
  height: 20px;
  width: 40px;
`;

export const Toggle = styled.div`
  ${baseConfig}
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
    -webkit-transition: background-color 0.2s ease-in-out, top 0.2s 0.2s ease-out,  -webkit-transform 0.2s linear;
    transition: background-color 0.2s ease-in-out, top 0.2s 0.2s ease-out,  -webkit-transform 0.2s linear;
    transition: background-color 0.2s ease-in-out, top 0.2s 0.2s ease-out,  transform 0.2s linear;
    transition: background-color 0.2s ease-in-out, top 0.2s 0.2s ease-out,  transform 0.2s linear, -webkit-transform 0.2s linear;
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
    -webkit-transition: background-color 0.2s ease-in-out, top 0.2s 0.2s ease-out,  -webkit-transform 0.2s linear;
    transition: background-color 0.2s ease-in-out, top 0.2s 0.2s ease-out,  -webkit-transform 0.2s linear;
    transition: background-color 0.2s ease-in-out, top 0.2s 0.2s ease-out,  transform 0.2s linear;
    transition: background-color 0.2s ease-in-out, top 0.2s 0.2s ease-out,  transform 0.2s linear, -webkit-transform 0.2s linear;
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
    -webkit-transition: background 0.2s ease-out;
    transition: background 0.2s ease-out;
  }
  &.active span:before, &.active span:after {
    -webkit-transition: top 0.2s ease-out, -webkit-transform 0.2s 0.2s ease-out;
    transition: top 0.2s ease-out, -webkit-transform 0.2s 0.2s ease-out;
    transition: top 0.2s ease-out, transform 0.2s 0.2s ease-out;
    transition: top 0.2s ease-out, transform 0.2s 0.2s ease-out, -webkit-transform 0.2s 0.2s ease-out;
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

export const NavHolder = styled.div`
  ${baseConfig}
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 15px 30px;
  z-index: 1000;
  // border-bottom: ${(props) => props.theme.text} 1px solid;
  box-sizing: border-box;
`;
