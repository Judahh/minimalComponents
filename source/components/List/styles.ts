import styled from 'styled-components';

export const ListHolder = styled.div`
  // display: flex;
  &.vertical {
    width: 100%;
    // background-color: red;
  }
  &.horizontal {
    // height: 100%;
    // background-color: green;
  }

  &>div, &>ul {
    border: 0px solid;
    box-sizing: border-box;
    border-color: ${(props) => props.theme.primary};
    border-bottom-width: 1px;
  }

  &>div:first-child, &>ul:first-child {
    border-top-width: 0px;
  }

  &>div:last-child, &>ul:last-child {
    border-bottom-width: 0px;
  }
`;