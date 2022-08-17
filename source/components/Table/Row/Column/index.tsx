import React, {
  CSSProperties,
  useEffect,
  // useState
} from 'react';
import useState from 'react-usestateref';
import { withTheme } from 'styled-components';
import Input from '../../../Input';
import { H2 } from '../../../Text';
import { TableController } from '../../tableController';
import { Text } from '../../../Text';
import { Actions } from '../../actions';

const Column = (props: {
  controller?: TableController;
  actions?: Actions;
  indexes: (number | string)[];
  data?: {[key: string]: any;};
  update?: (indexes?: (string | number)[], value?) => void;
  style?: CSSProperties;
}) => {
  const [controller, setController] = useState(props?.controller);
  const [indexes, setIndexes] = useState(props?.indexes);
  const [data, setData] = useState(props?.data);
  let updateData = props?.update;

  const [actions, setActions] = useState(props?.actions || controller?.actions || {});

  useEffect(() => {
    setController(props?.controller);
  }, [props?.controller, props?.controller?.actions]);

  useEffect(() => {
    setIndexes(props?.indexes);
  }, [props?.indexes]);

  useEffect(() => {
    setData(props?.data);
  }, [props?.data]);

  useEffect(() => {
    updateData = props?.update;
  }, [props?.update]);

  useEffect(() => {
    setActions(props?.actions || controller?.actions || {});
  }, [props?.actions, controller, controller?.actions]);

  useEffect(() => {
    console.log('Column OUT Data Changed', data);
  }, [data]);

  useEffect(() => {
    // console.log('Column OUT Data Changed', data);
  }, [controller, indexes, actions, data, updateData]);

  return (
    <>
      {controller?.type === 'title' ? (
        <H2 style={{ ...props?.style, ...controller?.titleStyle }}>
          {controller?.name || ''}
        </H2>
      ) : updateData && controller?.hasEdit ? (
        <Input
          style={{ ...props?.style, ...controller?.inputStyle }}
          type={controller.type || 'text'}
          name={controller?.name || controller?.index}
          value={data}
          setValue={(value) => {
            // console.log('Column setValue', value, indexes,updateData);
            updateData?.(indexes, value);
          }}
          defaultValue={data || controller?.defaultValue}
          aria-label={
            controller?.ariaLabel ||
            controller?.name ||
            controller?.index
          }
          placeholder={
            controller?.placeholder ||
            controller?.name ||
            controller?.index
          }
          onKeyUp={(e) => actions?.onKeyUp?.(e, indexes)}
          onKeyDown={(e) => actions?.onKeyDown?.(e, indexes)}
          onInput={(e) => actions?.onInput?.(e, indexes)}
          onChange={(e) => actions?.onChange?.(e, indexes)}
          onClick={() => actions?.onClick?.(indexes)}
          {...(controller?.inputProps || {})}
        />
      ) : controller?.hasAdd &&
        !controller?.hasEdit &&
        data == undefined ? (
        <></>
      ) : (
        <Text
          style={{
            ...(props?.style || {}),
            marginTop: '5px',
            marginBottom: '5px',
            ...controller?.textStyle,
          }}
        >
          {data ||
            controller?.name ||
            controller?.defaultValue ||
            controller?.index}
        </Text>
      )}
    </>
  );
};
export default withTheme(Column);
