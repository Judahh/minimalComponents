import React, { CSSProperties } from 'react';
import { withTheme } from 'styled-components';
import { Quantity as Q, QuantityHolder } from './index';

const Quantity = (props: {
  holderStyle?: CSSProperties;
  style?: CSSProperties;
  value?: number;
  children?: any;
}) => {
  return (
    <>
      {(props.value != undefined && props.value > 1 || props.children != undefined) && (
        <QuantityHolder style={props.holderStyle}>
          <Q style={props?.style}>{props.children || props.value || 0}</Q>
        </QuantityHolder>
      )}
    </>
  );
};
export default withTheme(Quantity);
