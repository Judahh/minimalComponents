import styled from "styled-components";

export const IconList = styled.div`
  display: flex;

  @media screen and (max-width: 380px) {
    flex-wrap: wrap;
  }
`;

export const Logo = styled.img`
  cursor: pointer;
  // width: 45px;
  // height: 20px;
  height: 30px;
  // margin-top: 10px;
`;

export const LogoSmall = styled.img`
  cursor: pointer;
  // width: 45px;
  // height: 20px;
  height: 25px;
  // margin-top: 10px;
`;

export const Icon = styled.img`
  cursor: pointer;
  height: 25px;
  margin: 0 20px;
`;

export const LogoHolder = styled.div`
  transition: all 0.2s;
`;

export const TextHolder = styled.a`
  cursor: pointer;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  transition: all 0.2s;

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

export const Path = styled.path`
  stroke: ${(props) => props.theme.primary} !important;
  ${(props) => props.withFill ? "fill: " + props.theme.primary + "!important;" : ""}
`;

export const PathL = styled.path`
  stroke: ${(props) => props.theme.holder} !important;
  ${(props) => props.withFill ? "fill: " + props.theme.holder + "!important;" : ""}
`;

export const APTI = styled.svg`
  width: auto;
  max-width: 50%;
  height: auto;
  max-height: 45%;
  align-self: center;

  @media screen and (max-width: 1000px) {
    max-width: 80%;
    max-height: 45%;
  }

  @media (orientation: landscape) {
    max-width: 45%;
    max-height: 80%;
  }
`;

export const Theme = styled.svg`
  cursor: pointer;
`;

export const Coffee = styled.svg`
--secondary: ${(props) => props.theme.primary} !important;
height: 100%;
align-self: center;
padding-top: 10vh;

#steamL {
  stroke-dasharray: 13;
  stroke-dashoffset: 13;
  animation: steamLarge 2s infinite;
}
#steamR {
  stroke-dasharray: 9;
  stroke-dashoffset: 9;
  animation: steamSmall 2s infinite;
}
@-moz-keyframes swing {
  50% {
    transform: rotate(-3deg);
  }
}
@-webkit-keyframes swing {
  50% {
    transform: rotate(-3deg);
  }
}
@-o-keyframes swing {
  50% {
    transform: rotate(-3deg);
  }
}
@keyframes swing {
  50% {
    transform: rotate(-3deg);
  }
}
@-moz-keyframes steamLarge {
  0% {
    stroke-dashoffset: 13;
    opacity: 1;
  }
  50% {
    stroke-dashoffset: 39;
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 39;
    opacity: 1;
  }
}
@-webkit-keyframes steamLarge {
  0% {
    stroke-dashoffset: 13;
    opacity: 1;
  }
  50% {
    stroke-dashoffset: 39;
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 39;
    opacity: 1;
  }
}
@-o-keyframes steamLarge {
  0% {
    stroke-dashoffset: 13;
    opacity: 1;
  }
  50% {
    stroke-dashoffset: 39;
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 39;
    opacity: 1;
  }
}
@keyframes steamLarge {
  0% {
    stroke-dashoffset: 13;
    opacity: 1;
  }
  50% {
    stroke-dashoffset: 39;
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 39;
    opacity: 1;
  }
}
@-moz-keyframes steamSmall {
  0% {
    stroke-dashoffset: 9;
    opacity: 1;
  }
  50% {
    stroke-dashoffset: 27;
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 27;
    opacity: 1;
  }
}
@-webkit-keyframes steamSmall {
  0% {
    stroke-dashoffset: 9;
    opacity: 1;
  }
  50% {
    stroke-dashoffset: 27;
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 27;
    opacity: 1;
  }
}
@-o-keyframes steamSmall {
  0% {
    stroke-dashoffset: 9;
    opacity: 1;
  }
  50% {
    stroke-dashoffset: 27;
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 27;
    opacity: 1;
  }
}
@keyframes steamSmall {
  0% {
    stroke-dashoffset: 9;
    opacity: 1;
  }
  50% {
    stroke-dashoffset: 27;
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 27;
    opacity: 1;
  }
}
`;