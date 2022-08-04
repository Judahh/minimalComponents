import React from "react";
import RModal from 'react-modal';
import { withTheme } from 'styled-components'
import Close from "../Input/Button/close";
import { CloseType } from "../Input/Button/closeType";
import { H1 } from "../Text";

const Modal = (props:{ title?:string, isOpen?: boolean, setClose?, setOpen?, children?, theme?, closeType?: CloseType}) => {
  console.log('MODAL', props);

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
        padding: '0px',
      },
    }}
  >
    <div style={{ display:'inline-flex', float: 'left', padding: '10px', boxSizing: 'border-box', width: '100%'}}>
      <H1 style={{ marginBottom: '0', display:'inline-flex', float: 'left', margin: '0px', boxSizing: 'border-box' }}>
        {props.title || ''}
      </H1>)
      <div style={{ display:'inline-flex', float: 'right', margin: '0px', boxSizing: 'border-box'}}>
        <Close setClose={props.setClose} closeType={props.closeType} />
      </div>
    </div>
    <div style={{ margin: '20px', boxSizing: 'border-box' }}>
      {props.children}
    </div>
  </RModal>)
}
export default withTheme(Modal);