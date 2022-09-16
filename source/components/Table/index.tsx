import React, {
  CSSProperties,
  useEffect,
  // useState
} from 'react';
import useState from 'react-usestateref';
import { withTheme } from 'styled-components';
import { Table as TableStyle } from './styles';
import { TableController } from './tableController';
import { Actions } from './actions';
import Row from './Row';

const Table = (props: {
  controllers?: TableController[];
  newActions?: Actions;
  rowActions?: Actions;
  data?: {
    [key: string]: any;
  }[];
  new?: {
    [key: string]: any;
  };
  update?: (indexes?: (string | number)[], value?) => void;
  updateNew?: (indexes?: (string | number)[], value?) => void;
  delete?: (index?: number) => void;
  add?: (value?: { [key: string]: any }) => void;
  style?: CSSProperties;
  tableStyle?: CSSProperties;
  headerStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  footerStyle?: CSSProperties;
  headerRowStyle?: CSSProperties;
  rowStyle?: CSSProperties;
  addRowStyle?: CSSProperties;
  Loading?: JSX.Element;
  loading?: boolean;
}) => {
  const [controllers, setControllers] = useState(props?.controllers);
  const [newActions, setNewActions] = useState(props?.newActions);
  const [rowActions, setRowActions] = useState(props?.rowActions);
  const [newData, setNewData] = useState(props?.new);
  const [data, setData] = useState(props?.data);
  let updateData = props?.update;
  let updateNewData = props?.updateNew;
  let addData = props?.add;
  let deleteData = props?.delete;

  const [loading, setLoading] = useState(props?.loading);

  useEffect(() => {
    setControllers(props?.controllers);
  }, [props?.controllers, ...(props?.controllers || [])]);

  useEffect(() => {
    setNewActions(props?.newActions);
  }, [props?.newActions]);

  useEffect(() => {
    setRowActions(props?.rowActions);
  }, [props?.rowActions]);

  useEffect(() => {
    setNewData(props?.new);
  }, [props?.new]);

  useEffect(() => {
    updateNewData = props?.updateNew;
  }, [props?.updateNew]);

  useEffect(() => {
    setData(props?.data);
  }, [props?.data]);

  useEffect(() => {
    updateData = props?.update;
  }, [props?.update]);

  useEffect(() => {
    addData = props?.add;
  }, [props?.add]);

  useEffect(() => {
    deleteData = props?.delete;
  }, [props?.delete]);

  useEffect(() => {
    setLoading(props?.loading);
  }, [props?.loading]);

  useEffect(() => {}, [props?.Loading]);

  useEffect(() => {
    // console.log('Update Table', loading,
    // controllers,
    // newActions,
    // rowActions,
    // newData,
    // data,
    // updateData,
    // updateNewData,
    // addData,
    // deleteData);
  }, [
    loading,
    controllers,
    newActions,
    rowActions,
    newData,
    data,
    updateData,
    updateNewData,
    addData,
    deleteData,
  ]);

  return !loading ? (
    <>
      {controllers && controllers?.length > 0 ? (
        <>
          <div style={{ width: '100%', maxWidth: '100%', ...props?.style }}>
            <TableStyle style={props?.tableStyle}>
              <thead
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  paddingBottom: '20px',
                  ...props?.headerStyle,
                }}
              >
                <Row
                  controllers={controllers?.map((controller) => {
                    const newController = { ...controller };
                    newController.type = 'title';
                    return newController;
                  })}
                  style={{ ...props?.headerRowStyle }}
                />
              </thead>
              <tbody style={{ width: '100%', ...props?.bodyStyle }}>
                {data?.map?.((row, index) => {
                  // console.log('INIT Row', row, index);
                  return (
                    <Row
                      key={'row' + index}
                      controllers={controllers}
                      indexes={[index]}
                      row={row}
                      update={updateData}
                      actions={rowActions}
                      delete={deleteData}
                      style={{ ...props?.rowStyle }}
                    />
                  );
                })}
              </tbody>

              <tfoot
                style={{
                  width: '100%',
                  paddingBottom: '20px',
                  ...props?.footerStyle,
                }}
              >
                {addData ? (
                  <Row
                    controllers={controllers}
                    indexes={[]}
                    row={newData}
                    update={updateNewData}
                    add={addData}
                    columnActions={newActions}
                    style={{ ...props?.addRowStyle }}
                  />
                ) : (
                  <></>
                )}
              </tfoot>
            </TableStyle>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  ) : (
    props?.Loading || <></>
  );
};
export default withTheme(Table);
