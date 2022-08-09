import styled from "styled-components";
import { baseConfig } from "../../../utils/util";

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
        animation: ${(props) => props?.theme?.animation?.flag?.duration || 1.5}s;
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
          animation: ${(props) => props?.theme?.animation?.flag?.duration || 1.5}s;
        }
      }
    }
  }
`;
