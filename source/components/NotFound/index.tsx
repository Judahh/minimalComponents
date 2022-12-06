import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import { Text } from '../Text';
import { StyledNotFound } from './styles';

const NotFound = (props: {languageContext?: {notFound?: {title?: string, description?: string}}}) => {
  const [notFound, setNotFound] = useState(props?.languageContext?.notFound);

  useEffect(() => {
    setNotFound(props?.languageContext?.notFound);
  } , [props?.languageContext?.notFound]);

  return (
    <StyledNotFound>
      <Text sizeType={'h1'}>{notFound?.title || 404}</Text>
      <Text sizeType={'h2'}>{notFound?.description || 'Not Found'}</Text>
    </StyledNotFound>
  );
};

export default NotFound;
