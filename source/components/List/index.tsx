import React, { ReactElement, useEffect } from 'react';
import { SwipeableList, Type as ListType } from 'react-swipeable-list';
import useState from 'react-usestateref';
import { withTheme } from 'styled-components';
import { ListHolder } from './styles';

const List = (props: { theme; children; threshold?: number; fullSwipe?: boolean }) => {
  const [fullSwipe, setFullSwipe] = useState(props?.fullSwipe);
  const [threshold, setThreshold] = useState(props?.threshold || 0.3);

  useEffect(() => {
    setFullSwipe(props?.fullSwipe);
  }, [props?.fullSwipe]);

  useEffect(() => {
    setThreshold(props?.threshold || 0.3);
  }, [props?.threshold]);

  const passProps = (elements?: ReactElement) => {
    // console.log('list passProps', elements, toggleIndexes, openIndexes, closeIndexes, noClickIndexes);
    return (
      elements &&
      React.Children.map(elements, (child, index) => {
        const newProps = {
          index,
          ...elements?.props,
          fullSwipe,
          threshold,
        };

        const cloneChild = React.cloneElement(child, newProps);
        return cloneChild;
      })
    );
  };

  return (
    <>
      <ListHolder
        className="basic-swipeable-list__container"
        style={{ width: '100%' }}
      >
        <SwipeableList
          fullSwipe={fullSwipe != undefined ? fullSwipe : true}
          threshold={threshold}
          type={ListType.IOS}
        >
          {passProps(props?.children)}
        </SwipeableList>
      </ListHolder>
    </>
  );
};
export default withTheme(List);
