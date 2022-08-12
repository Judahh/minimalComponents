import React, { useEffect, useState } from 'react';
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
        indexes: (number|string)[];
        row?: [{
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
  const indexes = props?.indexes;

  const [row, updateRow] = props?.row || [];

  const addData = props.add;
  const deleteData = props.delete;

  const loading = useState(props?.loading);

  useEffect(() => {
    console.log('Row Data Changed', row);
  }, [row, Object.values(row||{}), ...Object.values(row||{})]);

  useEffect(() => {
    console.log('Row OUT Data Changed', props?.row?.[0]);
  }, [props?.row, Object.values(props?.row||{}), ...Object.values(props?.row||{})]);

  useEffect(() => {
    console.log('Row Loading Changed', loading, props?.Loading);
  }, [loading, props?.Loading]);

  return (true ? //(!loading ?
    (<>
      <TR style={{ cursor: 'pointer' }}>
        {controllers?.map?.((controller, index) => (
          <TH key={'ELEMENT' + index}>
            {addData && controller?.hasAdd ? (<>
              <Input
                type={"button"}
                color={"green"}
                onClick={()=>addData?.(row)}
                value={"+"}
              />
            </>) : (<></>)}
            {deleteData && controller?.hasDelete ?
              <Input
                type={"button"}
                color={'red'}
                onClick={() => deleteData?.(index)}
                value={"-"}
              />
            : <></>}
            {<Column
                controller={controller}
                indexes={[...(indexes||[]), index]}
                data={[row?.[controller?.name || ''], updateRow]}
                actions={props?.actions}
            />}
        </TH>
        )
        )}
      </TR>
    </>) : (props?.Loading ? <props.Loading/> : <></>))
  ;
};
export default withTheme(Row);
