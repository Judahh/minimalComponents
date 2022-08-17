import styled from "styled-components";
import { baseConfig } from "../../../utils/util";

export const IconList = styled.div`
  ${(props) => baseConfig(props)}
  display: flex;

  @media screen and (max-width: 380px) {
    flex-wrap: wrap;
  }
`;

export const Logo = styled.img`
  ${(props) => baseConfig(props)}
  cursor: pointer;
  height: 30px;
`;

export const LogoSmall = styled.img`
  ${(props) => baseConfig(props)}
  cursor: pointer;
  // width: 45px;
  // height: 20px;
  height: 25px;
  // margin-top: 10px;
`;

export const Icon = styled.img`
  ${(props) => baseConfig(props)}
  cursor: pointer;
  height: 25px;
  margin: 0 20px;
`;

export const LogoHolder = styled.div`
  ${(props) => baseConfig(props)}
  transition: all ${(props) => props?.theme?.transition?.logo?.duration || 0.2}s;
`;

export const Holder = styled.a`
  ${(props) => baseConfig(props)}
  cursor: pointer;
  background: ${(props) => props?.theme?.background || 'white'};
  color: ${(props) => props?.theme?.text || 'primary'};
  transition: all ${(props) => props?.theme?.transition?.holder?.duration || 0.2}s;

  &: hover {
    background: ${(props) => props?.theme?.background || 'white'};
    color: ${(props) => props?.theme?.bright};
  }

  span {
    margin-top: 25px;
    display: inline-block;
  }
`;

export const Path = styled.path`
  ${(props) => baseConfig(props)}
  stroke: ${(props) => props?.theme?.primary || 'black'} !important;
  ${(props) => props.withFill ? "fill: " + props?.theme?.primary + "!important;" : ""}
`;

export const PathL = styled.path`
  ${(props) => baseConfig(props)}
  stroke: ${(props) => props?.theme?.holder} !important;
  ${(props) => props.withFill ? "fill: " + props?.theme?.holder + "!important;" : ""}
`;

export const APTI = styled.svg`
  ${(props) => baseConfig(props)}
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
  ${(props) => baseConfig(props)}
  cursor: pointer;
`;

export const Coffee = styled.svg`
${(props) => baseConfig(props)}
--secondary: ${(props) => props?.theme?.primary || 'black'} !important;
height: 100%;
align-self: center;
padding-top: 10px;

#steamL {
  stroke-dasharray: 13;
  stroke-dashoffset: 13;
  animation: steamLarge ${(props) => props?.theme?.animation?.steamLarge?.duration || 2}s infinite;
}
#steamR {
  stroke-dasharray: 9;
  stroke-dashoffset: 9;
  animation: steamSmall ${(props) => props?.theme?.animation?.steamSmall?.duration || 2}s infinite;
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