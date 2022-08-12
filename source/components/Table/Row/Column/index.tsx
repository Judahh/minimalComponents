import React, { useEffect } from 'react';
import { withTheme } from 'styled-components';
import Input from '../../../Input';
import { H2 } from '../../../Text';
import { TableController } from '../../tableController';
import { Text } from '../../../Text';
import useObjectState from '../../useObjectState';
import { Actions } from '../../actions';

const Column = (props:
    {
        controller?: TableController;
        actions?: Actions;
        indexes: (number|string)[];
        data?: [any, (indexes?: (string | number)[], value?) => void];
        Loading?;
        loading?;
    }) => {
  const controller = props?.controller;
  const indexes = props?.indexes;

  const actions: Actions = props?.actions || controller?.actions || {};

  const [data, updateData] = props?.data || [];

  const loading = useObjectState(props?.loading);

  useEffect(() => {
    console.log('Data Changed', data);
  }, [data]);

  useEffect(() => {
    console.log('OUT Data Changed', props?.data);
  }, [props?.data]);

  useEffect(() => {
    console.log('Loading Changed', loading, props?.Loading);
  }, [loading, props?.Loading]);

  return (true ? //(!loading ?
    (<>
      {controller?.type === 'title' ?
        <H2>{controller?.name || ''}</H2>
        : updateData && controller?.hasEdit ?
          <Input
            type={controller.type || 'text'}
            name={controller?.name}
            value={data}
            setValue={(value)=> updateData?.([...indexes, controller?.name || ''], value)}
            defaultValue={data || controller?.defaultValue}
            aria-label={controller?.ariaLabel || controller?.name}
            placeholder={controller?.placeholder || controller?.name}
            onKeyUp={(e) => actions?.onKeyUp?.(e, [...indexes, controller?.name || ''])}
            onKeyDown={(e) => actions?.onKeyDown?.(e, [...indexes, controller?.name || ''])}
            onInput={(e) => actions?.onInput?.(e, [...indexes, controller?.name || ''])}
            onChange={(e) => actions?.onChange?.(e, [...indexes, controller?.name || ''])}
            onClick={() => actions?.onClick?.([...indexes, controller?.name || ''])}
        />
        : (<Text>{data || controller?.name || controller?.defaultValue}</Text>)
      }
    </>) : (props?.Loading ? <props.Loading/> : <></>))
  ;
};
export default withTheme(Column);
