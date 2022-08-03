import React, { useEffect } from 'react';
import { withTheme } from 'styled-components';
import { Wrapper, Center } from '../../Content';
import { H4 } from '../../Text';

const Animation = (props: {
  Animation;
  setLoading;
  alt?: string;
  loading;
  progress?: number;
  progress2?: number;
  Element?;
  anti?: boolean;
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
              <H4>{props.progress}%</H4>
            ) : (
              <></>
            )}
            {props.progress2 && props.progress2 > 0 ? (
              <H4>{props.progress2}%</H4>
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
