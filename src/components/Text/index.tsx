import styled from 'styled-components';
import { baseConfig } from '../../util';

export const H1 = styled.h1`
  ${baseConfig}
  width: 100%;
  font-size: 2.2vh;
  font-family: Spartan-Light;
  font-weight: bold;
  margin-bottom: 5vh;
  color: ${(props) => props.theme.primary};

  // @media screen and (max-width: 1000px) {
  //   font-size: 2vh;
  // }
`;

export const H2 = styled.h2`
  ${baseConfig}
  width: 100%;
  font-size: 2vh;
  font-family: Spartan-Light;
  font-weight: bold;
  color: ${(props) => props.theme.primary};

  text-align: justify;

  // @media screen and (max-width: 1000px) {
  //   font-size: 1.5vh;
  // }
`;

export const H3 = styled.h3`
  ${baseConfig}
  width: 100%;
  font-size: 1.7vh;
  font-family: Spartan-Light;
  font-weight: bold;
  color: ${(props) => props.theme.primary};

  text-align: justify;

  // @media screen and (max-width: 1000px) {
  //   font-size: 1.5vh;
  // }
`;

export const H4 = styled.h4`
  ${baseConfig}
  width: 100%;
  font-size: 1.5vh;
  font-family: Spartan-Light;
  font-weight: bold;
  color: ${(props) => props.theme.primary};

  text-align: justify;

  // @media screen and (max-width: 1000px) {
  //   font-size: 1.5vh;
  // }
`;

export const H5 = styled.h5`
  ${baseConfig}
  width: 100%;
  font-size: 1.3vh;
  font-family: Spartan-Light;
  font-weight: bold;
  color: ${(props) => props.theme.primary};

  text-align: justify;

  // @media screen and (max-width: 1000px) {
  //   font-size: 1.5vh;
  // }
`;

export const H6 = styled.h6`
  ${baseConfig}
  width: 100%;
  font-size: 1.3vh;
  font-family: Spartan-Light;
  font-weight: bold;
  color: ${(props) => props.theme.primary};

  text-align: justify;

  // @media screen and (max-width: 1000px) {
  //   font-size: 1.5vh;
  // }
`;

export const Text = styled.span`
  ${baseConfig}
  font-size: 2vh;
  max-width: 256px;
  margin: 8px 0;
  line-height: 150%;
  color: ${(props) => props.theme.primary};
`;

export const SubText = styled.span`
  ${baseConfig}
  font-size: 1.5vh;
  max-width: 256px;
  margin: 8px 0;
  line-height: 150%;
  color: ${(props) => props.theme.primary};
`;

export const MediumText = styled(Text)`
  ${baseConfig}
  position: relative;
  font-weight: normal;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    height: 2px;
    bottom: -3px;
    left: 0;
    // visibility: hidden;
    width: 0;
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    &:before {
      background-color: ${(props) => props.theme.primary};
      visibility: visible;
      width: 100%;
    }
  }
`;

export const CopyrightText = styled.span`
  ${baseConfig}
  color: ${(props) => props.theme.primary};
`;

export const P = styled.p`
  ${baseConfig}
  text-indent: 3ch;
  font-size: 1.75vh;
  margin-bottom: 1em;
  line-height: 150%;
`;

export const Quantity = styled.div`
  ${baseConfig}
  display: block;
  width: 25px;
  height: 25px;
  color: ${(props) => props.theme.background};
  background-color: ${(props) => props.theme.primary};
  text-align: center;
  position: absolute;
  border-radius: 100%;
  text-align: center;
  font-size: 10px;
  left: 20px;
  margin-top: -10px;
  font-weight: bold;
  padding-top: 7px;
`;

export const Error = styled.span`
  ${baseConfig}
  font-size: 2vh;
  font-family: Spartan-ExtraLight;
  font-weight: 200;
  color: ${(props) => props.theme.error};
  max-width: 202px;
`;

export const Notification = styled.span`
  ${baseConfig}
  font-size: 2vh;
  font-family: Spartan-ExtraLight;
  font-weight: 200;
  color: ${(props) => props.theme.primary};
  max-width: 202px;
`;

export const Link = styled.a`
  ${baseConfig}
  text-decoration: none;
  color: ${(props) => props.theme.text};
  padding: ${(props) => (props.icon ? '15px' : '0')};
  margin: ${(props) => (props.icon ? '10px' : '0')};
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;

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
  ${baseConfig}
  font-weight: normal;
  font-size: 15px;
  color: ${(props) => props.theme.primary};
  font-family: Spartan-Light;
  margin: 0 20px;
  position: relative;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    height: 2px;
    bottom: -3px;
    left: 0;
    // visibility: hidden;
    width: 0;
    transition: all 0.2s ease-in-out;
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