import React, { useEffect } from 'react';
import { withTheme } from 'styled-components';
import { Table as TableStyle } from './styles';
import { TableController } from './tableController';
import { Actions } from './actions';
import useObjectState from './useObjectState';
import Row from './Row';

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
    console.log('NEW Data Changed', newData?.[0]);
  }, [newData, newData?.[0], ...Object.values(newData?.[0]||{})]);

  useEffect(() => {
    console.log('Data Changed', data);
  }, [data, ...(data||[])]);

  useEffect(() => {
    console.log('OUT NEW Data Changed', props?.new?.[0]);
  }, [props?.new, props?.new?.[0], ...Object.values(props?.new?.[0]||{})]);

  useEffect(() => {
    console.log('OUT Data Changed', props?.data?.[0]);
  }, [props?.data, props?.data?.[0], ...(props?.data?.[0]||[])]);

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
              <Row
                controllers={controllers.map((controller) => {
                  const newController = { ...controller };
                  newController.type = 'title';
                  return newController;
                })}
              />
            </thead>
            <tbody style={{ width: '100%', paddingBottom: '20px' }}>
              {data?.map?.((row, index) => (
                  <Row
                    controllers={controllers}
                    indexes={[index]}
                    row={[row, updateData]}
                    delete={deleteData}
                  />
              ))}
              {addData ? (
                <Row
                  controllers={controllers}
                  indexes={[]}
                  row={[newData, updateNewData]}
                  add={addData}
                  actions={newActions}
                />
              ) : (<></>)}
            </tbody>
          </TableStyle>
        </>) : (<></>)
      }
    </>) : (props?.Loading ? <props.Loading/> : <></>))
  ;
};
export default withTheme(Table);
