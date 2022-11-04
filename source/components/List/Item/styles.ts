import styled from 'styled-components';

const StyledListItem = (SwipeableListItem) => styled(SwipeableListItem)`
  // background-color: #f00;
  width: 100%;
  box-sizing: border-box;
  // overflow: hidden;
  border-style: solid;
  border-color: ${(props) => props.theme.primary};
  border-width: 0;
  // border-top-width: 1px;
  border-bottom-width: 1px;

  &:first-child {
    border-top-width: 0px;
  }

  &:last-child {
    border-bottom-width: 0px;
  }
`;

const ItemContent = styled.div`
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  // min-width: 100px;
  color: ${(props) => props.theme.primary};
  user-select: none;
`;

const AvatarHolder = styled.div`
  display: flex;
  height: 45px;
  // width: 50px;
  margin-right: 8px;
  user-drag: none;
  user-select: none;
  flex-direction: column;
`;

const AvatarHolderRight = styled.div`
  display: flex;
  height: 45px;
  // width: 50px;
  margin-left: 8px;
  user-drag: none;
  user-select: none;
  flex-direction: column;
  align-self: flex-end;
  align-items: flex-end;
`;

const ItemRow = styled.div`
  width: 100%;
  display: flex;
  padding: 0 8px;
  justify-content: space-between;
`;

const ItemRowCenter = styled.div`
  width: 100%;
  display: flex;
  padding: 0 8px;
  justify-content: center;
`;

const ItemColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: flex-start;
`;

const ItemColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: flex-end;
`;

const ItemColumnCentered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ItemNameLine = styled.span`
  font-weight: 500;
`;

const ItemInfoLine = styled.span`
  font-size: 14px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-items: left;
  justify-self: left;
  justify-content: flex-start;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-items: right;
  justify-self: right;
  justify-content: flex-end;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  justify-self: center;
  justify-content: center;
`;

export {
  StyledListItem,
  AvatarHolder,
  AvatarHolderRight,
  Left,
  Right,
  Center,
  ItemColumn,
  ItemColumnRight,
  ItemColumnCentered,
  ItemContent,
  ItemInfoLine,
  ItemNameLine,
  ItemRow,
  ItemRowCenter,
};
