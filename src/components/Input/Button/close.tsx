import React from "react";
import { withTheme } from 'styled-components'
import { CloseButton} from ".";
import { CloseType } from "./closeType";

const Close = (props:{setClose?, closeType?: CloseType}) => {
  return (<CloseButton closeType={props.closeType} onClick={() => props.setClose()} />);
}
export default withTheme(Close);