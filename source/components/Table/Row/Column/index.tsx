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
  data?: [any, (indexes?: (string | number)[], value?) => void];
  style?: CSSProperties;
}) => {
  const [controller, setController] = useState(props?.controller);
  const [indexes, setIndexes] = useState(props?.indexes);

  const [actions, setActions] = useState(props?.actions || controller?.actions || {});

  useEffect(() => {
    console.log('Column Data Changed', props?.data?.[0]);
  }, [props?.data?.[0]]);

  useEffect(() => {
    setController(props?.controller);
  }, [props?.controller, props?.controller?.actions]);

  useEffect(() => {
    setIndexes(props?.indexes);
  }, [props?.indexes]);

  useEffect(() => {
    setActions(props?.actions || controller?.actions || {});
  }, [props?.actions, controller, controller?.actions]);

  useEffect(() => {
    console.log('Column OUT Data Changed', props?.data);
  }, [props?.data]);

  useEffect(() => {
    // console.log('Column OUT Data Changed', props?.data);
  }, [controller, indexes, actions]);

  return (
    <>
      {controller?.type === 'title' ? (
        <H2 style={{ ...props?.style, ...controller?.titleStyle }}>
          {controller?.name || ''}
        </H2>
      ) : props?.data?.[1] && controller?.hasEdit ? (
        <Input
          style={{ ...props?.style, ...controller?.inputStyle }}
          type={controller.type || 'text'}
          name={controller?.name || controller?.index}
          value={props?.data?.[0]}
          setValue={(value) => {
            // console.log('Column setValue', value, indexes,props?.data?.[1]);
            props?.data?.[1]?.(indexes, value);
          }}
          defaultValue={props?.data?.[0] || controller?.defaultValue}
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
        props?.data?.[0] == undefined ? (
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
          {props?.data?.[0] ||
            controller?.name ||
            controller?.defaultValue ||
            controller?.index}
        </Text>
      )}
    </>
  );
};
export default withTheme(Column);
