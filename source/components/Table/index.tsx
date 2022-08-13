import React, { CSSProperties, useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
import { Table as TableStyle } from './styles';
import { TableController } from './tableController';
import { Actions } from './actions';
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
        style?: CSSProperties;
        tableStyle?: CSSProperties;
        headerStyle?: CSSProperties;
        bodyStyle?: CSSProperties;
        headerRowStyle?: CSSProperties;
        rowStyle?: CSSProperties;
        addRowStyle?: CSSProperties;
        Loading?;
        loading?;
    }) => {
  const controllers = props?.controllers;
  const newActions = props?.newActions;

  const addData = props.add;
  const deleteData = props.delete;

  const [data, updateData] = props?.data || [];
  const [newData, updateNewData] = props?.new || [];

  const loading = useState(props?.loading);

  useEffect(() => {
    // console.log('Table NEW Data Changed', newData?.[0]);
  }, [newData, newData?.[0], ...Object.values(newData?.[0]||{})]);

  useEffect(() => {
    // console.log('Table Data Changed', data);
  }, [data, ...(data||[])]);

  useEffect(() => {
    // console.log('Table OUT NEW Data Changed', props?.new?.[0]);
  }, [props?.new, props?.new?.[0], ...Object.values(props?.new?.[0]||{})]);

  useEffect(() => {
    // console.log('Table OUT Data Changed', props?.data?.[0]);
  }, [props?.data, props?.data?.[0], ...(props?.data?.[0]||[])]);

  useEffect(() => {
    // console.log('Table Loading Changed', loading, props?.Loading);
  }, [loading, props?.Loading]);

  return (true ? //(!loading ?
    (<>
      {
      (controllers && controllers.length > 0) ? (
        <>
          <div style={{ width: '100%', maxWidth: '100%', ...props.style }}>
            <TableStyle style={props?.tableStyle}>
              <thead style={{ width: '100%', maxWidth: '100%', paddingBottom: '20px', ...props?.headerStyle }}>
                <Row
                  controllers={controllers.map((controller) => {
                    const newController = { ...controller };
                    newController.type = 'title';
                    return newController;
                  })}
                  style={{ ...props?.headerRowStyle }}
                />
              </thead>
              <tbody style={{ width: '100%', paddingBottom: '20px', ...props?.bodyStyle }}>
                {data?.map?.((row, index) => (
                    <Row
                      controllers={controllers}
                      indexes={[index]}
                      row={[row, updateData]}
                      delete={deleteData}
                      style={{ ...props?.rowStyle }}
                    />
                ))}
                {addData ? (
                  <Row
                    controllers={controllers}
                    indexes={[]}
                    row={[newData, updateNewData]}
                    add={addData}
                    actions={newActions}
                    style={{ ...props?.addRowStyle }}
                  />
                ) : (<></>)}
              </tbody>
            </TableStyle>
          </div>
        </>) : (<></>)
      }
    </>) : (props?.Loading ? <props.Loading/> : <></>))
  ;
};
export default withTheme(Table);
