import React from "react";
import { withTheme } from 'styled-components'
import { IconType } from "./icon";
import { CloseButton } from "./styles";

const Close = (props:{setClose?, iconType?: IconType}) => {
  return (<CloseButton iconType={props.iconType} onClick={() => props.setClose()} />);
}
export default withTheme(Close);