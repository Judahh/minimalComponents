import React from 'react';
import { SwipeableList, Type as ListType } from 'react-swipeable-list';
import useState from 'react-usestateref';
import { withTheme } from 'styled-components';
import { ListHolder } from './styles';

const List = (props: { theme; children; threshold?: number; fullSwipe?: boolean }) => {
  const [fullSwipe, _setFullSwipe] = useState(props?.fullSwipe);
  const [threshold, _setThreshold] = useState(props?.threshold || 0.3);

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
          {props?.children}
        </SwipeableList>
      </ListHolder>
    </>
  );
};
export default withTheme(List);
