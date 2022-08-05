import styled from "styled-components";
import { baseConfig } from "../../util";

export const Indicator = styled.li`
  ${(props) => baseConfig(props)}
  background: ${(props) => props.theme.primary};
  width: 15px;
  height: 15px;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;

export const Image = styled.img`
  position:relative;
  width: 100%;
  min-height: 70%;
  display: block;
  background-color: #f1f1f1;
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: "";
  }
`;
export const BackgroundImage = styled.img`
  position:absolute;
  &::after {
    position: relative;
  }
`;

