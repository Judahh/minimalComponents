import styled from "styled-components";
import { baseConfig } from "../../utils/config";

const getElement = (props:{children?, text?}) => {
  const element = props.children || props.text;
  return element;
}

const hasText = (props:{children?, text?}) => {
  const element = getElement(props);
  return element && element.length > 0;
}

export const NotificationWrapper = styled.div`
  ${(props) => baseConfig(props)}
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  white-space: pre-line;
  color: ${(props:{theme}) => props.theme.background };
  background-color: ${(props:{error?:boolean, theme}) => props.error ? props.theme.error : props.theme.primary };
  height: ${(props) =>  hasText(props) ? 'auto' : '0px' };
  padding: ${(props:{children, text?}) =>  hasText(props) > 0 ? '10px' : '0px' };
`;