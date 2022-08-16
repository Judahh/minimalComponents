import React, { CSSProperties, useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
import Input from '../../../Input';
import { H2 } from '../../../Text';
import { TableController } from '../../tableController';
import { Text } from '../../../Text';
import { Actions } from '../../actions';

const Column = (props:
    {
        controller?: TableController;
        actions?: Actions;
        indexes: (number|string)[];
        data?: [any, (indexes?: (string | number)[], value?) => void];
        Loading?;
        loading?;
        style?: CSSProperties;
    }) => {
  const controller = props?.controller;
  const indexes = props?.indexes;

  const actions: Actions = props?.actions || controller?.actions || {};

  const [data, updateData] = props?.data || [];

  const loading = useState(props?.loading);

  useEffect(() => {
    // console.log('Column Data Changed', data);
  }, [data]);

  useEffect(() => {
    // console.log('Column OUT Data Changed', props?.data);
  }, [props?.data]);

  useEffect(() => {
    // console.log('Column Loading Changed', loading, props?.Loading);
  }, [loading, props?.Loading]);

  return (true ? //(!loading ?
    (<>
      {controller?.type === 'title' ?
        <H2 style={{...props?.style, ...controller?.titleStyle}}>{controller?.name || ''}</H2>
        : updateData && controller?.hasEdit ?
          <Input
            style={{...props?.style, ...controller?.inputStyle}}
            type={controller.type || 'text'}
            name={controller?.name || controller?.index}
            value={data}
            setValue={(value)=> {
              // console.log('Column setValue', value, indexes,updateData);
              updateData?.(indexes, value)
            }}
            defaultValue={data || controller?.defaultValue}
            aria-label={controller?.ariaLabel || controller?.name || controller?.index}
            placeholder={controller?.placeholder || controller?.name || controller?.index}
            onKeyUp={(e) => actions?.onKeyUp?.(e, indexes)}
            onKeyDown={(e) => actions?.onKeyDown?.(e, indexes)}
            onInput={(e) => actions?.onInput?.(e, indexes)}
            onChange={(e) => actions?.onChange?.(e, indexes)}
            onClick={() => actions?.onClick?.(indexes)}
            {...(controller?.inputProps || {})}
        />
        : controller?.hasAdd && !controller?.hasEdit && data == undefined ?
          (<></>) :
          (<Text style={{...(props?.style||{}), marginTop: '5px', marginBottom: '5px', ...controller?.textStyle}}>{data || controller?.name || controller?.defaultValue || controller?.index}</Text>)
      }
    </>) : (props?.Loading ? <props.Loading/> : <></>))
  ;
};
export default withTheme(Column);
