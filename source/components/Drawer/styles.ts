import styled, { css } from "styled-components";
import { baseConfig } from "../../util";

export const StyledHeader = styled.div`
  ${(props) => baseConfig(props)}
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
  ${(props) => baseConfig(props)}
  display: block;
  position: fixed;
  bottom: ${(props) => props?.theme?.menu?.height || '70px'};
  left: 0;
  width: 100%;
  justify-content: center;
  margin: 0 auto;
  // padding: 5px 24px;
  background: ${(props) => props.theme.background};
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

export const ItemHolder = styled.div`
  ${(props) => baseConfig(props)}
  display: table;
  margin: 0;
  min-height: ${(props) => props?.theme?.menu?.height || '70px'};
  width: 100%;
  min-width: 100%;
  cursor: pointer;
  border-top: 1px solid ${(props) => props.theme.holder};
  border-bottom: 1px solid ${(props) => props.theme.holder};
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  transition: none;
  font-weight: ${(props) => props?.theme?.menu?.font?.weight || 'normal'};
  vertical-align: middle;
  align-content: center;
  align-items: center;
  align-self: center;
  alignment-baseline: central;
  text-align: center;
  box-align: center;

  a:visited, & :visited, :visited, &:visited {
    color: ${(props) => props.theme.text};
  }

  a + a, div + div, div + a, a + div, & + a, & + div, & + & {
    border-top: 0;
  }

  a:hover, div:hover, &:hover, & :hover, :hover {
    background: ${(props) => props.theme.background};
    font-weight: ${(props) => props?.theme?.menu?.hover?.font?.weight || 'bold'};
    color: ${(props) => props.theme.bright};
  }

  div, a, span, & a, & span, & div {
    min-width: 100%;
    width: 100%;
    min-height: ${(props) => props?.theme?.menu?.height || '70px'};
    height: ${(props) => props?.theme?.menu?.height || '70px'};
    vertical-align: middle;
    align-content: center;
    align-items: center;
    align-self: center;
    alignment-baseline: central;
    text-align: center;
    box-align: center;
    margin-top: 25px;
    display: table-cell;
    box-sizing: border-box;
    font-weight: ${(props) => props?.theme?.menu?.font?.weight || 'bolder'};
    font-size: ${(props) => props?.theme?.menu?.font?.size || '14px'};
  }
`;

export const Item = styled.div`
  ${(props) => baseConfig(props)}
  display: flex;
  flex-direction: column;
  text-align: center;
`

export const SubItem = styled.div`
  ${(props) => baseConfig(props)}
  display: block;
  width: 100%;
  text-align: center;
`

export const DrawerMenu = styled.div`
  ${(props) => baseConfig(props)}
  position: relative;
  visibility: hidden;
  display: unset;
  top:${(props) =>
    props.top ? `-${((props?.children?.length || 1) + 1) * 100}%` : '0%'};
  transition: all ${(props) => props?.theme?.transition?.drawer?.duration || 0.2}s ease;
  z-index: -10;
  opacity: 0;
  height: 0px;

  &.openned, &.open {
    visibility: visible;
    display: block;
    top:${(props) =>
      props.top ? '0%' : `-${((props?.children?.length || 1) + 1) * 100}%`};
    transition: all transform ${(props) => props?.theme?.transition?.drawer?.duration || 0.2}s ease;
    opacity: 1;
    background-color: ${(props) => props.theme.background};
    height: fit-content;
  }

  &.closed {
    display: unset;
    visibility: hidden;
    top:${(props) =>
      props.top ? `-${((props?.children?.length || 1) + 1) * 100}%` : '0%'};
    transition: all transform ${(props) => props?.theme?.transition?.drawer?.duration || 0.2}s ease;
    opacity: 0;
    height: 0px;
  }
`;

export const DrawerWrapper = styled.div`
  ${(props) => baseConfig(props)}
  height: ${(props) => props?.theme?.menu?.height || '70px'};
  width: 100%;
  left: 0;
  display: block;
  position: relative;
  z-index: 1000;
  ${(props) =>
    props.top ? 'top: 0' : 'bottom: 0'};
`;



export const NavHolder = styled.div`
  ${(props) => baseConfig(props)}
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
