import React from "react";
import RModal from 'react-modal';
import { withTheme } from 'styled-components'
import Close from "../Input/Button/close";
import { CloseType } from "../Input/closeType";

const Modal = (props:{isOpen?: boolean, setClose?, setOpen?, children?, theme?, closeType?: CloseType}) => {
  return (
  <RModal isOpen={props.isOpen}
    // onAfterOpen={afterOpenModal}
    onRequestClose={props.setClose}
    onRequestOpen={props.setOpen}
    style={{
      overlay: {
        backgroundColor: 'transparent',
      },
      content: {
        top: '80px',
        backgroundColor: props?.theme?.background,
        border: '1px solid ' + props?.theme?.primary,
      },
    }}
  >
    <Close setClose={props.setClose} closeType={props.closeType} />
    {props.children}
  </RModal>)
}
export default withTheme(Modal);