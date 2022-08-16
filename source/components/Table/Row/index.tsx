import React, { CSSProperties, useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
import Input from '../../Input';
import { Actions } from '../actions';
import { TH, TR} from '../styles';
import { TableController } from '../tableController';
import Column from './Column';


const Row = (props:
    {
        controllers?: TableController[];
        actions?: Actions;
        columnActions?: Actions;
        indexes: (number|string)[];
        row?: [{
          [key: string]: any;
        }, (indexes?: (string | number)[], value?) => void];
        delete?: (index?: number) => void;
        add?: (value?: {
          [key: string]: any;
        }) => void;
        style?: CSSProperties;
        Loading?;
        loading?;
    }) => {
  const controllers = props?.controllers;
  const indexes = props?.indexes;

  const [row, updateRow] = props?.row || [];

  const addData = props.add;
  const deleteData = props.delete;

  const loading = useState(props?.loading);

  useEffect(() => {
    // console.log('Row Data Changed', row);
  }, [row, Object.values(row||{}), ...Object.values(row||{})]);

  useEffect(() => {
    // console.log('Row OUT Data Changed', props?.row?.[0]);
  }, [props?.row, Object.values(props?.row||{}), ...Object.values(props?.row||{})]);

  useEffect(() => {
    // console.log('Row Loading Changed', loading, props?.Loading);
  }, [loading, props?.Loading]);

  return (true ? //(!loading ?
    (<>
      <TR
        style={{
          cursor: 'pointer',
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          alignmentBaseline: 'central',
          textAlign: 'center',
          verticalAlign: 'middle',
          ...props?.style,
        }}
        onKeyUp={(e) => props?.actions?.onKeyUp?.(e, indexes)}
        onKeyDown={(e) => props?.actions?.onKeyDown?.(e, indexes)}
        onInput={(e) => props?.actions?.onInput?.(e, indexes)}
        onChange={(e) => props?.actions?.onChange?.(e, indexes)}
        onClick={() => props?.actions?.onClick?.(indexes)}
      >
        {controllers?.map?.((controller, index) => (
          <TH
            key={'ELEMENT' + index}
            style={{
              cursor: 'pointer',
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              alignmentBaseline: 'central',
              verticalAlign: 'middle',
              ...controller?.style,
            }}
          >
            <div
              style={{
                cursor: 'pointer',
                alignItems: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                alignmentBaseline: 'central',
                verticalAlign: 'middle',
                justifyContent: 'center',
                display: 'flex',
                ...controller?.contentStyle,
              }}>
              {addData && controller?.hasAdd ? (<>
                <Input
                  style={{
                    float: 'left',
                    marginLeft: '5px',
                    marginRight: '5px',
                    marginBottom: '0px',
                    marginTop: '0px',
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                    alignmentBaseline: 'central',
                    verticalAlign: 'middle',
                    ...controller?.addStyle,
                  }}
                  type={"button"}
                  color={"green"}
                  onClick={()=>addData?.(row)}
                  value={"+"}
                />
              </>) : (<></>)}
              {deleteData && controller?.hasDelete ?
                <Input
                  style={{
                    float: 'left',
                    marginLeft: '5px',
                    marginRight: '5px',
                    marginBottom: '0px',
                    marginTop: '0px',
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                    alignmentBaseline: 'central',
                    verticalAlign: 'middle',
                    ...controller?.deleteStyle,
                  }}
                  type={"button"}
                  color={'red'}
                  onClick={() => deleteData?.(indexes?.[0] as number)}
                  value={"-"}
                />
              : <></>}
              {<Column
                  style={{
                    float: 'left',
                    cursor: 'pointer',
                    alignItems: 'center',
                    alignContent: 'center',
                    alignSelf: 'center',
                    alignmentBaseline: 'central',
                    verticalAlign: 'middle',
                    marginLeft: '5px',
                    marginRight: '5px',
                    marginBottom: '0px',
                    marginTop: '0px',
                    ...controller?.columnStyle,
                  }}
                  controller={controller}
                  indexes={[...(indexes||[]), controller?.index]}
                  data={[row?.[controller?.index || ''], updateRow]}
                  actions={props?.columnActions}
              />}
          </div>
        </TH>
        )
        )}
      </TR>
    </>) : (props?.Loading ? <props.Loading/> : <></>))
  ;
};
export default withTheme(Row);
