import styled, { css } from "styled-components";
import { baseConfig } from "../../utils/config";

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

export const BasicItemHolder = styled.div`
  ${(props) => baseConfig(props)}
  transition: all ${(props) => props?.theme?.transition?.logo?.duration || 0.2}s;
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
  color: ${(props) => props.theme.primary};
  transition: none;
  font-weight: ${(props) => props?.theme?.menu?.font?.weight || 'normal'};
  font-size: ${(props) => props?.theme?.menu?.font?.size || '18px'}
  vertical-align: middle;
  align-content: center;
  align-items: center;
  align-self: center;
  alignment-baseline: central;
  text-align: center;
  box-align: center;

  a:visited, & :visited, :visited, &:visited {
    color: ${(props) => props.theme.primary};
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
    font-size: ${(props) => props?.theme?.menu?.font?.size || '18px'};
  }
`;

const itemSizes = {
  small: "35px",
  medium: "30px",
  large: "25px",
};

export const ItemList = styled.div`
  ${(props) => baseConfig(props)}
  display: flex;

  @media screen and (max-width: 380px) {
    flex-wrap: wrap;
  }
`;

export const IconItem = styled.img`
  ${(props) => baseConfig(props)}
  cursor: pointer;
  height: ${(props) => props.size ? itemSizes[props.size] : props.height || "30px"};
  margin: 0 ${(props) => props.sides ? props.sides : "20px"};
`;

export const Holder = styled.a`
  ${(props) => baseConfig(props)}
  cursor: pointer;
  background: ${(props) => props?.theme?.background || 'white'};
  color: ${(props) => props?.theme?.primary};
  transition: all ${(props) => props?.theme?.transition?.holder?.duration || 0.2}s;

  &: hover {
    background: ${(props) => props?.theme?.background || 'white'};
    color: ${(props) => props?.theme?.bright};
    ${(props) => props?.theme?.boldOnHover && 'font-weight: bold;'}
  }

  span {
    margin-top: ${(props) => props?.marginTop || "25px"};
    display: inline-block;
  }
`;


export const DrawerItem = styled.div`
  ${(props) => baseConfig(props)}
  display: flex;
  flex-direction: column;
  text-align: center;
`

export const DrawerSubItem = styled.div`
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
  overflow: hidden;

  &.openned, &.open {
    overflow: initial;
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
    overflow: hidden;
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
  overflow: hidden;

  &.openned, &.open {
    overflow: initial;
  }

  &.closed {
    overflow: hidden;
  }
`;

export const DrawerHolder = styled.div`
  ${(props) => baseConfig(props)}
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 15px 30px;
  z-index: 1000;
  // border-bottom: ${(props) => props.theme.primary} 1px solid;
  box-sizing: border-box;
`;

export const NavList = styled.div`
  display: flex;
`;