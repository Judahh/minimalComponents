import styled from 'styled-components';
import { baseConfig } from '../../utils/util';

export const H1 = styled.h1`
  ${(props) => baseConfig(props)}
  width: 100%;
  font-size: ${(props) => props?.theme?.h1?.font?.size || '18px'};
  font-weight: ${(props) => props?.theme?.h1?.font?.weight || 'bold'};
  margin: 10px;
  color: ${(props) => props.theme.primary};
`;

export const H2 = styled.h2`
  ${(props) => baseConfig(props)}
  width: 100%;
  font-size: ${(props) => props?.theme?.h2?.font?.size || '16px'};
  font-weight: ${(props) => props?.theme?.h2?.font?.weight || 'bold'};
  color: ${(props) => props.theme.primary};

  text-align: justify;
`;

export const H3 = styled.h3`
  ${(props) => baseConfig(props)}
  width: 100%;
  font-size: ${(props) => props?.theme?.h3?.font?.size || '14px'};
  font-weight: ${(props) => props?.theme?.h3?.font?.weight || 'bold'};
  color: ${(props) => props.theme.primary};

  text-align: justify;
`;

export const H4 = styled.h4`
  ${(props) => baseConfig(props)}
  width: 100%;
  font-size: ${(props) => props?.theme?.h4?.font?.size || '12px'};
  font-weight: ${(props) => props?.theme?.h4?.font?.weight || 'bold'};
  color: ${(props) => props.theme.primary};

  text-align: justify;
`;

export const H5 = styled.h5`
  ${(props) => baseConfig(props)}
  width: 100%;
  font-size: ${(props) => props?.theme?.h5?.font?.size || '10px'};
  font-weight: ${(props) => props?.theme?.h5?.font?.weight || 'bold'};
  color: ${(props) => props.theme.primary};

  text-align: justify;
`;

export const H6 = styled.h6`
  ${(props) => baseConfig(props)}
  width: 100%;
  font-size: ${(props) => props?.theme?.h6?.font?.size || '8px'};
  font-weight: ${(props) => props?.theme?.h6?.font?.weight || 'bold'};
  color: ${(props) => props.theme.primary};

  text-align: justify;
`;

export const Text = styled.div`
  ${(props) => baseConfig(props)}
  max-width: 256px;
  margin: 8px 0;
  line-height: 150%;
  color: ${(props) => props.theme.primary};
`;

export const SubText = styled.span`
  ${(props) => baseConfig(props)}
  font-size: ${(props) => props?.theme?.subText?.font?.size || '10px'};
  font-weight: ${(props) => props?.theme?.subText?.font?.weight || 'bold'};
  max-width: 256px;
  margin: 8px 0;
  line-height: 150%;
  color: ${(props) => props.theme.primary};
`;

export const CopyrightText = styled.span`
  ${(props) => baseConfig(props)}
  font-size: ${(props) => props?.theme?.copyrightText?.font?.size || '10px'};
  font-weight: ${(props) => props?.theme?.copyrightText?.font?.weight || 'bold'};
  color: ${(props) => props.theme.primary};
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

export const Error = styled.span`
  ${(props) => baseConfig(props)}
  font-size: ${(props) => props?.theme?.error?.font?.size || '14px'};
  font-weight: ${(props) => props?.theme?.error?.font?.weight || 'bold'};
  color: ${(props) => props.theme.error};
  max-width: 202px;
`;

export const Notification = styled.span`
  ${(props) => baseConfig(props)}
  font-size: ${(props) => props?.theme?.notification?.font?.size || '14px'};
  font-weight: ${(props) => props?.theme?.notification?.font?.weight || 'bold'};
  color: ${(props) => props.theme.primary};
  max-width: 202px;
`;

export const Link = styled.a`
  ${(props) => baseConfig(props)}
  text-decoration: none;
  color: ${(props) => props.theme.text};
  padding: ${(props) => (props.icon ? '15px' : '0')};
  margin: ${(props) => (props.icon ? '10px' : '0')};
  cursor: pointer;
  border-radius: 6px;
  transition: all ${(props) => props?.theme?.transition?.link?.duration || 0.15}s;

  &:hover {
    color: ${(props) => (props.icon ? props.theme.primary : props.theme.text)};
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
    color: ${(props) => props.theme.text};
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
    color: ${(props) => props.theme.text};
  }
`;