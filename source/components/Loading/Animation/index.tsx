import React, { useEffect } from 'react';
import { withTheme } from 'styled-components';
import { Wrapper, Center } from '../../Content';
import { Text } from '../../Text';

const Animation = (props: {
  Animation;
  setLoading;
  alt?: string;
  loading;
  progress?: number;
  progress2?: number;
  Element?;
  anti?: boolean;
  type?: string;
  limitationType?: string;
}) => {
  const passProps = (props) => {
    return (
      props.children &&
      React.Children.map(props.children, (child) => {
        return React.cloneElement(child, {
          alt: props.alt || "loading...",
          anti: props.anti
        });
      })
    );
  };
  useEffect(() => {
  }, [props, ...Object.values(props)]);
  return (
    <Wrapper>
      <Center>
        <props.Animation anti={props.anti}>
          {passProps(props)}
          <>
            {props.progress && props.progress > 0 ? (
              <Text type={props.type} limitationType={props.limitationType}>{props.progress}%</Text>
            ) : (
              <></>
            )}
            {props.progress2 && props.progress2 > 0 ? (
              <Text type={props.type} limitationType={props.limitationType}>{props.progress2}%</Text>
            ) : (
              <></>
            )}
          </>
        </props.Animation>
      </Center>
    </Wrapper>
  );
};

export default withTheme(Animation);
