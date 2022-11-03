import React from 'react';
import { SwipeableList, Type as ListType } from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import useState from 'react-usestateref';
import { withTheme } from 'styled-components';

const List = (props: { theme; children; threshold?: number; fullSwipe?: boolean }) => {
  const [fullSwipe, _setFullSwipe] = useState(props?.fullSwipe);
  const [threshold, _setThreshold] = useState(props?.threshold || 0.3);

  return (
    <>
      <div
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
      </div>
    </>
  );
};
export default withTheme(List);
