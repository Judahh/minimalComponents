import styled from "styled-components";
import { baseConfig } from "../../utils/config";

export const Form = styled.form`
  ${(props) => baseConfig(props)}
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const LayoutWrapper = styled.div`
  ${(props) => baseConfig(props)}
  background: ${(props) => props.theme.background};
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding-top: 80px;
  padding-bottom: 160px;
  padding-left: 15px;
  padding-right: 15px;
  ::-webkit-scrollbar-track {
    background-color: #0E0E0E;
    position: absolute;
  }

  ::-webkit-scrollbar {
    width: 0.6vw;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ECECEC;
  }
`;

export const Wrapper = styled.div`
  ${(props) => baseConfig(props)}
  height: 100%;
  width: 100%;
`;

export const Center = styled.div`
  ${(props) => baseConfig(props)}
  margin: auto;
  width: fit-content;
  padding: 10px;
`;

export const Left = styled.div`
  ${(props) => baseConfig(props)}
  display: flex;
  flex-direction: column;
  min-width: 400px;
  /* border-right: 1px solid ${(props) => props.theme.holder}; */
  padding-right: 50px;
  padding-left: 50px;

  @media screen and (max-width: 1000px) {
    border: 0;
    padding: 100px 25px 25px;
    align-self: center;
  }

  @media screen and (max-width: 500px) {
    border: 0;
    padding: 100px 15px 15px;
    min-width: 200px;
    align-self: center;
  }
`;

export const Right = styled.div`
  ${(props) => baseConfig(props)}
  padding-right: 50px;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  // width: 600px;

  @media screen and (max-width: 1000px) {
    // width: 464px;
    max-width: 100%;
    padding: 15px 25px 25px;
    align-self: center;
  }
`;

export const Container = styled.div`
  ${(props) => baseConfig(props)}
  width: 100%;
  min-height: 100vh;
  max-width: 100%;
  background: ${(props) => props.theme.background};
`;

export const Content = styled.div`
  ${(props) => baseConfig(props)}
  z-index: 10;
  position: relative;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
`;

export const SubContent = styled.div`
  ${(props) => baseConfig(props)}
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
`;

export const Div = styled.div`
  ${(props) => baseConfig(props)}
  padding-left: 5vw;
  padding-right: 5vw;
`;

export const BasicContentWrapper = styled.div`
  ${(props) => baseConfig(props)}
  position: relative;
  text-align: center;
  top: 0;
  margin-top:70px;
  padding-bottom: 56.25%; /* 16:9 */
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const SimpleContentWrapper = styled.div`
  ${(props) => baseConfig(props)}
  display: flex;
  justify-content: center;

  @media screen and (max-width: 1000px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const ContentWrapper = styled.div`
  ${(props) => baseConfig(props)}
  padding: 160px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
`;

export const PageHolder = styled.div`
  width: 100%;

  ul {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  li {
    display: block;
    margin: 2px;
    padding: 2px;
  }

  color: ${(props) => props.theme.text};
`;

export const Block = styled.div`
  width: 50%;
  box-sizing: border-box;
  float: left;
  padding: 10px;
  @media screen and (max-width: 500px) {
    width: 100%;
    float: none;
  }
`;
