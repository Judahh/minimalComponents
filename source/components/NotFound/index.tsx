import React, { useEffect, useState } from 'react';
import { StyledNotFound } from './styles';

const NotFound = (props: {languageContext?: {notFound?: {title?: string, description?: string}}}) => {
  const [notFound, setNotFound] = useState(props?.languageContext?.notFound);

  useEffect(() => {
    setNotFound(props?.languageContext?.notFound);
  } , [props?.languageContext?.notFound]);

  return (
    <StyledNotFound>
      <h1>{notFound?.title || 404}</h1>
      <span>{notFound?.description || 'Not Found'}</span>
    </StyledNotFound>
  );
};

export default NotFound;
