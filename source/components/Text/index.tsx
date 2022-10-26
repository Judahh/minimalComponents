import styled from 'styled-components';
import { baseConfig, getTextLimitationType, isHeading, textLimitation } from '../../utils/config';



export const Text = styled.div`
  ${(props) => baseConfig(props)}
  width: 100%;
  max-width: ${(props) => textLimitation(props?.theme)[getTextLimitationType(props?.limitationType)]};
  color: ${(props) => props?.color || props.theme.primary};
  margin: ${(props) => props.margin || isHeading(props.type)? '10px' : '0px'};
  text-align: ${(props) => props.textAlign || 'justify'};
`;

export const Error = styled(Text)`
  color: ${(props) => props.theme.error};
  max-width: ${(props) => textLimitation(props?.theme)[getTextLimitationType(props?.limitationType || 'limited')]};
`;

export const Notification = styled(Text)`
  max-width: ${(props) => textLimitation(props?.theme)[getTextLimitationType(props?.limitationType || 'limited')]};
`;

export const P = styled.p`
  ${(props) => baseConfig(props)}
  text-indent: 3ch;
  margin-bottom: 1em;
  line-height: 150%;
`;

export const Quantity = styled.div`
  ${(props) => baseConfig(props)}
  display: block;
  width: 25px;
  height: 25px;
  font-size: ${(props) => props?.theme?.quantity?.font?.size || '10px'};
  font-weight: ${(props) => props?.theme?.quantity?.font?.weight || 'bold'};
  color: ${(props) => props.theme.background};
  background-color: ${(props) => props.theme.primary};
  text-align: center;
  position: absolute;
  border-radius: 100%;
  text-align: center;
  left: 20px;
  margin-top: -10px;
  padding-top: 7px;
`;

export const ProgressText = styled.div`
  ${(props) => baseConfig(props)}
  display: block;
  mix-blend-mode: difference;
  color: white;
  text-align: center;
  position: absolute;
  border-radius: 100%;
  text-align: center;
  font-size: ${(props) => props?.theme?.progressText?.font?.size || '10px'};
  font-weight: ${(props) => props?.theme?.progressText?.font?.weight || 'bold'};

  left:0;
  right:0;

  margin-left: auto;
  margin-right: auto;
  top: 50%;
  bottom: 50%;
`;



export const Link = styled.a`
  ${(props) => baseConfig(props)}
  text-decoration: none;
  color: ${(props) => props.theme.primary};
  padding: ${(props) => (props.icon ? '15px' : '0')};
  margin: ${(props) => (props.icon ? '10px' : '0')};
  cursor: pointer;
  border-radius: 6px;
  transition: all ${(props) => props?.theme?.transition?.link?.duration || 0.15}s;

  &:hover {
    color: ${(props) => (props.icon ? props.theme.primary : props.theme.primary)};
  }

  &:first-child {
    padding-left: 0;
    margin-left: 0;
  }

  &:last-child {
    padding-right: 0;
    margin-right: 0;
  }

  @media screen and (max-width: 380px) {
    &:first-child {
      padding: ${(props) => (props.icon ? '15px' : '0')};
      margin: ${(props) => (props.icon ? '10px' : '15px 0')};
    }

    &:last-child {
      padding: ${(props) => (props.icon ? '15px' : '0')};
      margin: ${(props) => (props.icon ? '10px' : '15px 0')};
    }
  }

  &:visited {
    color: ${(props) => props.theme.primary};
  }
`;

export const AFixedLink = styled.a`
  ${(props) => baseConfig(props)}
  color: ${(props) => props.theme.primary};
  margin: 0 20px;
  position: relative;
  cursor: pointer;
  transition: all ${(props) => props?.theme?.transition?.fixedLink?.duration || 0.15}s ease-in-out;

  &:before {
    content: '';
    position: absolute;
    height: 2px;
    bottom: -3px;
    left: 0;
    // visibility: hidden;
    width: 0;
  }

  &:hover {
    &:before {
      background-color: ${(props) => props.theme.primary};
      visibility: visible;
      width: 100%;
    }
  }

  &:visited {
    color: ${(props) => props.theme.primary};
  }
`;

export const FixedLink = styled.div`
  ${(props) => baseConfig(props)}
  color: ${(props) => props.theme.primary};
  margin: 0 20px;
  position: relative;
  cursor: pointer;
  transition: all ${(props) => props?.theme?.transition?.fixedLink?.duration || 0.15}s ease-in-out;

  &:before {
    content: '';
    position: absolute;
    height: 2px;
    bottom: -3px;
    left: 0;
    // visibility: hidden;
    width: 0;
  }

  &:hover {
    &:before {
      background-color: ${(props) => props.theme.primary};
      visibility: visible;
      width: 100%;
    }
  }

  &:visited {
    color: ${(props) => props.theme.primary};
  }
`;