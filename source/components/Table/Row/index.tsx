import React, {
  CSSProperties,
  useEffect,
  // useState
} from 'react';
import useState from 'react-usestateref';
import { withTheme } from 'styled-components';
import Input from '../../Input';
import { Actions } from '../actions';
import { TH, TR } from '../styles';
import { TableController } from '../tableController';
import Column from './Column';

const Row = (props: {
  controllers?: TableController[];
  actions?: Actions;
  columnActions?: Actions;
  indexes: (number | string)[];
  row?: [
    {
      [key: string]: any;
    },
    (indexes?: (string | number)[], value?) => void
  ];
  delete?: (index?: number) => void;
  add?: (value?: { [key: string]: any }) => void;
  style?: CSSProperties;
}) => {
  const [controllers, setControllers] = useState(props?.controllers);
  const [indexes, setIndexes] = useState(props?.indexes);

  // const [addData, setAdd] = useState<((value?: {
  //   [key: string]: any;
  // }) => void)|undefined>(props?.add);
  // const [deleteData, setDelete] = useState<((index?: number) => void)|undefined>(props?.delete);

  useEffect(() => {
    setControllers(props?.controllers);
  }, [props?.controllers, ...(props?.controllers || [])]);

  useEffect(() => {
    setIndexes(props?.indexes);
  }, [props?.indexes]);

  useEffect(() => {
    // setAdd(props?.add);
  }, [props?.add]);

  useEffect(() => {
    // setDelete(props?.delete);
  }, [props?.delete]);

  useEffect(() => {
  }, [
    // deleteData,
    // addData,
    controllers,
    indexes
  ]);

  useEffect(() => {
    console.log('Row Data Changed', props?.row);
  }, [
    props?.row,
    Object.values(props?.row || {}),
    ...Object.values(props?.row || {}),
    props?.row?.[0],
    Object.values(props?.row?.[0] || {}),
    ...Object.values(props?.row?.[0] || {}),
  ]);

  useEffect(() => {}, [
    props?.indexes,
    props?.controllers,
    props?.row,
    props?.actions,
    props?.columnActions,
    props?.add,
    props?.delete,
  ]);

  return (
    <>
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
            key={'th' + index}
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
              }}
            >
              {props?.add && controller?.hasAdd ? (
                <>
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
                    type={'button'}
                    color={'green'}
                    onClick={() => props?.add?.(props?.row?.[0])}
                    value={'+'}
                  />
                </>
              ) : (
                <></>
              )}
              {props?.delete && controller?.hasDelete ? (
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
                  type={'button'}
                  color={'red'}
                  onClick={() => props?.delete?.(indexes?.[0] as number)}
                  value={'-'}
                />
              ) : (
                <></>
              )}
              {
                <Column
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
                  indexes={[...(indexes || []), controller?.index]}
                  data={[
                    props?.row?.[0]?.[controller?.index || ''],
                    props?.row?.[1],
                  ]}
                  actions={props?.columnActions}
                />
              }
            </div>
          </TH>
        ))}
      </TR>
    </>
  );
};
export default withTheme(Row);
