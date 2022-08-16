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
  data?: [
    {
      [key: string]: any;
    }[],
    (indexes?: (string | number)[], value?) => void
  ];
  new?: [
    {
      [key: string]: any;
    },
    (indexes?: (string | number)[], value?) => void
  ];
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

  // const [addData, setAdd] = useState<
  //   ((value?: { [key: string]: any }) => void) | undefined
  // >(props?.add);
  // const [deleteData, setDelete] = useState<
  //   ((index?: number) => void) | undefined
  // >(props?.delete);

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
    console.log('props?.add', props?.add);
    // setAdd(props?.add);
  }, [props?.add]);

  useEffect(() => {
    // setDelete(props?.delete);
  }, [props?.delete]);

  useEffect(() => {
    setLoading(props?.loading);
  }, [props?.loading]);

  useEffect(() => {}, [props?.Loading]);

  useEffect(() => {
    // console.log('addData', addData, addData != undefined, addData !== undefined);
  }, [
    loading,
    // deleteData,
    // addData,
    controllers,
    newActions,
    rowActions,
  ]);

  useEffect(() => {
    console.log('Table NEW Data Changed', props?.new?.[0]?.[0]);
  }, [
    props?.new?.[0],
    props?.new?.[0]?.[0],
    ...Object.values(props?.new?.[0]?.[0] || {}),
  ]);

  useEffect(() => {
    console.log('Table Data Changed', props?.data?.[0]);
  }, [props?.data, props?.data?.[0], ...(props?.data?.[0] || [])]);

  useEffect(() => {
    console.log('Table OUT NEW Data Changed', props?.new?.[0]);
  }, [props?.new, props?.new?.[0], ...Object.values(props?.new?.[0] || {})]);

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
                {props?.data?.[0]?.map?.((row, index) => (
                  <Row
                    key={'row' + index}
                    controllers={controllers}
                    indexes={[index]}
                    row={[row, props?.data?.[1]]}
                    actions={rowActions}
                    delete={props?.delete}
                    style={{ ...props?.rowStyle }}
                  />
                ))}
              </tbody>

              <tfoot
                style={{
                  width: '100%',
                  paddingBottom: '20px',
                  ...props?.footerStyle,
                }}
              >
                {props?.add ? (
                  <Row
                    controllers={controllers}
                    indexes={[]}
                    row={props?.new}
                    add={props?.add}
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
