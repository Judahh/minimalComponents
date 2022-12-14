import React, {
  CSSProperties,
  useEffect,
  // useState
} from 'react';
import useState from 'react-usestateref';
import { withTheme } from 'styled-components';
import Input from '../../../Input';
import { TableController } from '../../tableController';
import { Text } from '../../../Text';
import { Actions } from '../../actions';

const Column = (props: {
  controller?: TableController;
  actions?: Actions;
  indexes: (number | string)[];
  data?: number | string;
  update?: (indexes?: (string | number)[], value?) => void;
  style?: CSSProperties;
}) => {
  const [controller, setController] = useState(props?.controller);
  const [indexes, setIndexes] = useState(props?.indexes);
  const [data, setData] = useState(props?.data);
  let updateData = props?.update;

  const [actions, setActions] = useState(
    props?.actions || controller?.actions || {}
  );

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
    // console.log('Update Column', indexes);
    // if (controller?.inputProps)
    // console.log('Update Column', controller?.inputProps);
  }, [controller, indexes, actions, data, updateData, controller?.inputProps]);

  return (
    <>
      {controller?.type === 'title' ? (
        <Text
          limitationType={controller?.titleLimitationType}
          type={controller?.titleType}
          style={{ ...props?.style, ...controller?.titleStyle }}
        >
          {controller?.name || controller?.index || ''}
        </Text>
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
            controller?.ariaLabel || controller?.name || controller?.index
          }
          placeholder={
            controller?.placeholder || controller?.name || controller?.index
          }
          onKeyUp={(e) => {
            // console.log('Column onKeyUp', e, indexes);
            return actions?.onKeyUp?.(e, indexes);
          }}
          onKeyDown={(e) => actions?.onKeyDown?.(e, indexes)}
          onInput={(e) => actions?.onInput?.(e, indexes)}
          onChange={(e) => {
            // console.log('Column onChange', e, indexes);
            return actions?.onChange?.(e, indexes);
          }}
          onClick={() => actions?.onClick?.(indexes)}
          {...(controller?.inputProps || {})}
        />
      ) : controller?.hasAdd && !controller?.hasEdit && data == undefined ? (
        <></>
      ) : (
        <Text
          limitationType={controller?.textLimitationType}
          type={controller?.textType}
          style={{
            ...(props?.style || {}),
            marginTop: '5px',
            marginBottom: '5px',
            ...controller?.textStyle,
          }}
        >
          {data ||
            controller?.defaultValue ||
            controller?.name ||
            controller?.index}
        </Text>
      )}
    </>
  );
};
export default withTheme(Column);
