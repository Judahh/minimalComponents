import React from "react";
import { withTheme } from 'styled-components'
import { CloseType } from "./closeType";
import { CloseButton } from "./styles";

const Close = (props:{setClose?, closeType?: CloseType}) => {
  return (<CloseButton closeType={props.closeType} onClick={() => props.setClose()} />);
}
export default withTheme(Close);