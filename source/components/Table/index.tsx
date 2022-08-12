import React, { useEffect } from 'react';
import { withTheme } from 'styled-components';
import Input from '../Input';
import { H2 } from '../Text';
import { Table as TableStyle, TH, TR} from './styles';
import { TableController } from './tableController';
import { Text } from '../Text';
import { Actions } from './actions';
import useArrayState from './useArrayState';
import useObjectState from './useObjectState';

const Table = (props:
    {
        controllers?: TableController[];
        newActions?: Actions;
        data?: {
          [key: string]: any;
        }[];
        new?: {
          [key: string]: any;
        };
        delete?: (index?: number) => void;
        add?: (value?: {
          [key: string]: any;
        }) => void;
        Loading?;
        loading?;
    }) => {
  const controllers = useArrayState(props?.controllers);
  const newActions = useObjectState(props?.newActions);

  const data = useArrayState(props?.data);
  const newData = useObjectState(props?.new);

  const addData = useObjectState(props?.add);
  const deleteData = useObjectState(props?.delete);

  const loading = useObjectState(props?.loading);

  useEffect(() => {
    console.log('Table Changed', props);
  }, [props]);

  useEffect(() => {
    console.log('controllers Changed', controllers, newActions);
  }, [controllers, newActions]);

  useEffect(() => {
    console.log('Data Changed', data, newData);
  }, [data, newData]);

  useEffect(() => {
    console.log('Data Functions Changed', addData, deleteData);
  }, [addData, deleteData]);

  useEffect(() => {
    console.log('Loading Changed', loading, props?.Loading);
  }, [loading, props?.Loading]);

  return (!loading ? (
    <>
      {
      (controllers && controllers.length > 0) ? (
        <>
          <TableStyle>
            <thead style={{ width: '100%', paddingBottom: '20px' }}>
              <TR>
                {controllers.map((controller) => (
                  <TH>
                    <H2>{controller?.[0]?.name || ''}</H2>
                  </TH>
                ))}
              </TR>
            </thead>
            <tbody style={{ width: '100%', paddingBottom: '20px' }}>
              {
                data ?
                data.map((row, index) => (
                  <TR style={{ cursor: 'pointer' }} key={index}>
                    {controllers?.map((controller) => (
                      <TH>
                        {controller?.[0]?.hasDelete ?
                          <Input
                            type={"button"}
                            onClick={() => deleteData?.[0]?.(index)}
                            value={"-"}
                          />
                        : <></>}
                        {controller?.[0]?.hasEdit ?
                          <Input
                          name={controller?.[0]?.name}
                          defaultValue={row?.[controller?.[0]?.name || ''] || controller?.[0]?.defaultValue}
                          aria-label={controller?.[0]?.ariaLabel || controller?.[0]?.name}
                          placeholder={controller?.[0]?.placeholder || controller?.[0]?.name}
                          onKeyUp={(e) => controller?.[0]?.actions?.onKeyUp?.(e, index, controller?.[0].name || '')}
                          onKeyDown={(e) => controller?.[0]?.actions?.onKeyDown?.(e, index, controller?.[0].name || '')}
                          onInput={(e) => controller?.[0]?.actions?.onInput?.(e, index, controller?.[0].name || '')}
                          onChange={(e) => controller?.[0]?.actions?.onChange?.(e, index, controller?.[0].name || '')}
                          onClick={() => controller?.[0]?.actions?.onClick?.(index, controller?.[0].name || '')}
                        />
                        : (<Text>{row?.[0][controller?.[0]?.name || ''] || controller?.[0]?.name || controller?.[0]?.defaultValue}</Text>)}
                    </TH>
                    )
                    )}
                  </TR>
                )):(<></>)
              }
              {props.add ? (
                <TR style={{ cursor: 'pointer' }} key={data?.length || 0}>
                {controllers?.map((controller) => (
                  <TH>
                    {controller?.[0]?.hasAdd ? (<>
                      <Input
                        type={"button"}
                        onClick={()=>props.add?.(props.new)}
                        value={"+"}
                      />
                    </>) : (<></>)}
                    {controller?.[0]?.hasEdit ?
                          <Input
                            name={controller?.[0]?.name}
                            value={newData?.[controller?.[0]?.name || '']}
                            setValue={(value)=> newData[controller?.[0]?.name || ''] = value}
                            defaultValue={newData?.[controller?.[0]?.name || ''] || controller?.[0]?.defaultValue}
                            aria-label={controller?.[0]?.ariaLabel || controller?.[0]?.name}
                            placeholder={controller?.[0]?.placeholder || controller?.[0]?.name}
                            onKeyUp={(e) => newActions?.[0]?.onKeyUp?.(e, undefined, controller?.[0]?.name || '')}
                            onKeyDown={(e) => newActions?.[0]?.onKeyDown?.(e, undefined, controller?.[0]?.name || '')}
                            onInput={(e) => newActions?.[0]?.onInput?.(e, undefined, controller?.[0]?.name || '')}
                            onChange={(e) => newActions?.[0]?.onChange?.(e, undefined, controller?.[0]?.name || '')}
                            onClick={() => newActions?.[0]?.onClick?.(undefined, controller?.[0]?.name || '')}
                          />
                        : newData?.[controller?.[0]?.name || ''] ? (<Text>{newData?.[controller?.[0]?.name || '']}</Text>) : (<></>)}
                  </TH>
                ))}
                </TR>
              ) : (<></>)}
            </tbody>
          </TableStyle>
        </>) : (<></>)
      }
    </>) : (props?.Loading ? <props.Loading/> : <></>));
};
export default withTheme(Table);
