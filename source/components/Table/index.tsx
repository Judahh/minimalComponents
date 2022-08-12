import React, { useEffect } from 'react';
import { withTheme } from 'styled-components';
import Input from '../Input';
import { H2 } from '../Text';
import { Table as TableStyle, TH, TR} from './styles';
import { TableController } from './tableController';
import { Text } from '../Text';
import { Actions } from './actions';
import useObjectState from './useObjectState';

const Table = (props:
    {
        controllers?: TableController[];
        newActions?: Actions;
        data?: [{
          [key: string]: any;
        }[], (indexes?: (string | number)[], value?) => void];
        new?: [{
          [key: string]: any;
        }, (indexes?: (string | number)[], value?) => void];
        delete?: (index?: number) => void;
        add?: (value?: {
          [key: string]: any;
        }) => void;
        Loading?;
        loading?;
    }) => {
  const controllers = props?.controllers;
  const newActions = props?.newActions;

  const addData = props.add;
  const deleteData = props.delete;

  const [data, updateData] = props?.data || [];
  const [newData, updateNewData] = props?.new || [];

  const loading = useObjectState(props?.loading);

  useEffect(() => {
    console.log('Data Changed', data, newData);
  }, [data, newData]);

  useEffect(() => {
    console.log('OUT Data Changed', props?.data?.[0], props?.new?.[0]);
  }, [props?.data, props?.new, props?.data?.[0], props?.new?.[0], ...(props?.data?.[0]||[]), ...Object.values(props?.new?.[0]||{})]);

  useEffect(() => {
    console.log('Loading Changed', loading, props?.Loading);
  }, [loading, props?.Loading]);

  return (true ? //(!loading ?
    (<>
      {
      (controllers && controllers.length > 0) ? (
        <>
          <TableStyle>
            <thead style={{ width: '100%', paddingBottom: '20px' }}>
              <TR>
                {controllers.map((controller, controllerIndex) => (
                  <TH key={'CONTROLLER' + controllerIndex}>
                    <H2>{controller?.name || ''}</H2>
                  </TH>
                ))}
              </TR>
            </thead>
            <tbody style={{ width: '100%', paddingBottom: '20px' }}>
              {
                data ?
                data.map((row, index) => (
                  <TR style={{ cursor: 'pointer' }} key={'ROW' + index}>
                    {controllers?.map((controller, controllerIndex) => (
                      <TH key={'ELEMENT' + controllerIndex}>
                        {controller?.hasDelete ?
                          <Input
                            type={"button"}
                            color={'red'}
                            onClick={() => deleteData?.(index)}
                            value={"-"}
                          />
                        : <></>}
                        {controller?.hasEdit ?
                          <Input
                            type={controller.type || 'text'}
                            name={controller?.name}
                            value={row?.[controller?.name || '']}
                            setValue={(value)=> updateData?.([index, controller?.name || ''], value)}
                            defaultValue={row?.[controller?.name || ''] || controller?.defaultValue}
                            aria-label={controller?.ariaLabel || controller?.name}
                            placeholder={controller?.placeholder || controller?.name}
                            onKeyUp={(e) => controller?.actions?.onKeyUp?.(e, index, controller?.name || '')}
                            onKeyDown={(e) => controller?.actions?.onKeyDown?.(e, index, controller?.name || '')}
                            onInput={(e) => controller?.actions?.onInput?.(e, index, controller?.name || '')}
                            onChange={(e) => controller?.actions?.onChange?.(e, index, controller?.name || '')}
                            onClick={() => controller?.actions?.onClick?.(index, controller?.name || '')}
                        />
                        : (<Text>{row?.[controller?.name || ''] || controller?.name || controller?.defaultValue}</Text>)}
                    </TH>
                    )
                    )}
                  </TR>
                )):(<></>)
              }
              {addData ? (
                <TR style={{ cursor: 'pointer' }} key={data?.length || 0}>
                {controllers?.map((controller, controllerIndex) => (
                  <TH key={'ADD' + controllerIndex}>
                    {controller?.hasAdd ? (<>
                      <Input
                        type={"button"}
                        color={"green"}
                        onClick={()=>addData?.(props.new)}
                        value={"+"}
                      />
                    </>) : (<></>)}
                    {controller?.hasEdit ?
                          <Input
                            type={controller.type || 'text'}
                            name={controller?.name}
                            value={newData?.[controller?.name || '']}
                            setValue={(value)=> updateNewData?.([controller?.name || ''], value)}
                            defaultValue={newData?.[controller?.name || ''] || controller?.defaultValue}
                            aria-label={controller?.ariaLabel || controller?.name}
                            placeholder={controller?.placeholder || controller?.name}
                            onKeyUp={(e) => newActions?.onKeyUp?.(e, undefined, controller?.name || '')}
                            onKeyDown={(e) => newActions?.onKeyDown?.(e, undefined, controller?.name || '')}
                            onInput={(e) => newActions?.onInput?.(e, undefined, controller?.name || '')}
                            onChange={(e) => newActions?.onChange?.(e, undefined, controller?.name || '')}
                            onClick={() => newActions?.onClick?.(undefined, controller?.name || '')}
                          />
                        : newData?.[controller?.name || ''] ? (<Text>{newData?.[controller?.name || '']}</Text>) : (<></>)}
                  </TH>
                ))}
                </TR>
              ) : (<></>)}
            </tbody>
          </TableStyle>
        </>) : (<></>)
      }
    </>) : (props?.Loading ? <props.Loading/> : <></>))
  ;
};
export default withTheme(Table);
