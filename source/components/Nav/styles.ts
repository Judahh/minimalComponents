import styled from 'styled-components';

export const NavWrapper = styled.div`
  display: block;
  width: 100%;
  height: 70px;
  left: 0;
  position: relative;
  top: 0;
  right: 5px;
`;
export const NavHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 15px 10px;
  z-index: 1000;
  // border-bottom: ${(props) => props.theme.text} 1px solid;
  box-sizing: border-box;
`;

export const NavList = styled.div`
  display: flex;
`;
