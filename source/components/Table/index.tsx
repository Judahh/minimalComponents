import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { withTheme } from 'styled-components';
import Input from '../Input';
import { SubmitButton, DeleteButton } from '../Input/Button';
import { H2 } from '../Text';
import { Table as TableStyle, TH, TR} from './styles';
import { TableController } from './tableController';
import { Text } from '../Text';

const Table = (props:
    {
        controllers?: TableController[];
        data?: {
          [key: string]: [any, Dispatch<SetStateAction<any>>, {
            onClick?: () => void;
            onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
            onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
            onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
            onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
          }];
        }[];
        new?: {
          [key: string]: [any, Dispatch<SetStateAction<any>>, {
            onClick?: () => void;
            onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
            onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
            onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
            onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
          }];
        };
        delete?: (index?: number) => void;
        add?: (value?: {
          [key: string]: [any, Dispatch<SetStateAction<any>>, {
            onClick?: () => void;
            onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
            onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
            onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
            onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
          }];
        }) => void;
        Loading?;
        loading?;
    }) => {

  useEffect(() => {
    console.log('Table Changed', props);
  }, [props, ...Object.values(props)]);

  return (!props?.loading ? (
    <>
      {
      (props?.controllers && props?.controllers.length > 0) ? (
        <>
          <TableStyle>
            <thead style={{ width: '100%', paddingBottom: '20px' }}>
              <TR>
                {props?.controllers.map((controller) => (
                  <TH>
                    <H2>{controller.name}</H2>
                  </TH>
                ))}
              </TR>
            </thead>
            <tbody style={{ width: '100%', paddingBottom: '20px' }}>
              {
                props?.data ?
                props?.data.map((row, index) => (
                  <TR style={{ cursor: 'pointer' }} key={index}>
                    {props?.controllers?.map((controller) => (
                      <TH>
                        {controller?.hasDelete ?
                          <DeleteButton
                            onClick={() => props?.delete?.(index)}
                          >
                            -
                          </DeleteButton>
                        : <></>}
                        {controller?.hasEdit ?
                          <Input
                          name={controller?.name}
                          defaultValue={controller?.defaultValue}
                          aria-label={controller?.ariaLabel || controller?.name}
                          placeholder={controller?.placeholder || controller?.name}
                          value={row?.[controller.name || '']?.[0]}
                          setValue={row?.[controller.name || '']?.[1]}
                          onKeyUp={row?.[controller.name || '']?.[2]?.onKeyUp}
                          onKeyDown={row?.[controller.name || '']?.[2]?.onKeyDown}
                          onInput={row?.[controller.name || '']?.[2]?.onInput}
                          onChange={row?.[controller.name || '']?.[2]?.onChange}
                          onClick={row?.[controller.name || '']?.[2]?.onClick}
                        />
                        : (<Text>{row[controller?.name || '']?.[0] || controller?.name}</Text>)}
                    </TH>
                    )
                    )}
                  </TR>
                )):(<></>)
              }
              {props.add ? (
                <TR style={{ cursor: 'pointer' }} key={props?.data?.length || 0}>
                {props?.controllers?.map((controller) => (
                  <TH>
                    {controller?.hasAdd ? (<>
                      <SubmitButton
                        onClick={()=>props.add?.(props.new)}
                      >
                        +
                      </SubmitButton>
                    </>) : (<></>)}
                    {controller?.hasEdit ?
                          <Input
                            name={controller?.name}
                            defaultValue={controller?.defaultValue}
                            aria-label={controller?.ariaLabel || controller?.name}
                            placeholder={controller?.placeholder || controller?.name}
                            value={props?.new?.[controller?.name || '']?.[0]}
                            setValue={(value) => {
                              props?.new?.[controller?.name || '']?.[1]?.(value);
                            }}
                            onKeyUp={props?.new?.[controller?.name || '']?.[2]?.onKeyUp}
                            onKeyDown={props?.new?.[controller?.name || '']?.[2]?.onKeyDown}
                            onInput={props?.new?.[controller?.name || '']?.[2]?.onInput}
                            onChange={props?.new?.[controller?.name || '']?.[2]?.onChange}
                            onClick={props?.new?.[controller?.name || '']?.[2]?.onClick}
                          />
                        : (<Text>{props?.new?.[controller?.name || '']?.[0] || controller?.name}</Text>)}
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
