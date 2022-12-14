import React, { Context, useContext, useEffect } from 'react';
import NotificationContextModel from './notificationContextModel';
import { NotificationWrapper } from './styles';
import { withTheme } from 'styled-components';

const Notification = (props: {context: Context<NotificationContextModel>} ) => {
  const { error, children, text, timer, setChildren, setError, setText } =
    useContext(props.context);
  const clear = () => {
    setError(false);
    setChildren([]);
    setText('');
  };

  useEffect(() => {
    let timeout;
    if (
      ((text && text.length > 0) || (children && children.length > 0)) &&
      timer &&
      timer > 0
    ) {
      timeout = setTimeout(clear, timer);
    }
    return () => {
      clearTimeout(timeout);
    }
  }, [error, children, text, timer]);

  return (
    <>
      <NotificationWrapper onClick={clear} error={error}>
        {text || children}
      </NotificationWrapper>
    </>
  );
};
export default withTheme(Notification);
