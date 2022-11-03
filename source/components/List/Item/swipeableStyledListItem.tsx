import { SwipeableListItem } from 'react-swipeable-list';
import { StyledListItem } from './styles';

const SwipeableStyledListItem = StyledListItem(
  SwipeableListItem
) as SwipeableListItem;

export default SwipeableStyledListItem;
