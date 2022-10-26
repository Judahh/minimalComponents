import React from 'react';
import RModal from 'react-modal';
import { withTheme } from 'styled-components';
import Close from '../Input/close';
import { IconType } from '../Input/icon';
import { Text } from '../Text';

const Modal = (props: {
  title?: string;
  isOpen?: boolean;
  setClose?;
  setOpen?;
  children?;
  theme?;
  iconType?: IconType;
  titleLimitationType?: string;
  titleType?: string;
}) => {
  return (
    <RModal
      isOpen={props.isOpen}
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
      <div
        style={{
          display: 'inline-flex',
          float: 'left',
          padding: '10px',
          boxSizing: 'border-box',
          width: '100%',
        }}
      >
        <Text
          type={props.titleType}
          limitationType={props.titleLimitationType}
          style={{
            marginBottom: '0',
            display: 'inline-flex',
            float: 'left',
            margin: '0px',
            boxSizing: 'border-box',
          }}
        >
          {props.title || ''}
        </Text>
        <div
          style={{
            display: 'inline-flex',
            float: 'right',
            margin: '0px',
            boxSizing: 'border-box',
          }}
        >
          <Close setClose={props.setClose} iconType={props.iconType} />
        </div>
      </div>
      <div style={{ margin: '20px', boxSizing: 'border-box' }}>
        {props.children}
      </div>
    </RModal>
  );
};
export default withTheme(Modal);
