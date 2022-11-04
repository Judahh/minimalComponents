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

  .leading-actions {
    display: flex;
  }

  .leading-actions > * {
    width: 0;
    overflow-x: hidden;
  }

  .swipeable-list {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .swipeable-list-item {
    position: relative;
    transition: max-height 0.5s ease-in-out;
    max-height: 1000px;
    transform-origin: top;
    overflow: hidden;
    width: 100%;
  }

  .swipeable-list-item--remove {
    max-height: 0;
    transition: max-height 0.35s ease-out;
  }

  .swipeable-list-item__content {
    width: 100%;
    align-items: center;
    box-sizing: border-box;
    height: 100%;
    display: flex;
  }

  .swipeable-list-item__content--return {
    transition: transform 0.5s ease-in-out;
  }

  @-webkit-keyframes content-return-leading-ms {
    20% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes content-return-leading-ms {
    20% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  .swipeable-list-item__content--return-leading-ms {
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-name: content-return-leading-ms;
    animation-name: content-return-leading-ms;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
  }

  @-webkit-keyframes content-return-trailing-ms {
    20% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes content-return-trailing-ms {
    20% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  .swipeable-list-item__content--return-trailing-ms {
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-name: content-return-trailing-ms;
    animation-name: content-return-trailing-ms;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
  }

  .swipeable-list-item__content--remove {
    transition: transform 0.5s ease-in-out;
  }

  .swipeable-list-item__leading-actions {
    position: absolute;
    display: flex;
    width: 0px;
    overflow: hidden;
    height: 100%;
  }

  .swipeable-list-item__leading-actions--return {
    transition: width 0.5s ease-in-out;
  }

  @-webkit-keyframes actions-return-ms {
    20% {
      width: 100%;
    }
    100% {
      width: 0;
    }
  }

  @keyframes actions-return-ms {
    20% {
      width: 100%;
    }
    100% {
      width: 0;
    }
  }

  .swipeable-list-item__actions--return-ms {
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-name: actions-return-ms;
    animation-name: actions-return-ms;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
  }

  .swipeable-list-item__leading-actions > * {
    overflow: hidden;
    display: flex;
    justify-content: flex-end;
    transform: scale(1);
    transform-origin: center left;
    transition: transform 0.2s ease-out;
  }

  .swipeable-list-item__trailing-actions {
    display: flex;
    width: 0px;
    position: absolute;
    right: 0;
    top: 0;
    justify-content: flex-end;
    overflow: hidden;
    height: 100%;
  }

  .swipeable-list-item__trailing-actions--return {
    transition: width 0.5s ease-in-out;
  }

  .swipeable-list-item__trailing-actions > * {
    overflow: hidden;
    transform: scale(1);
    transform-origin: center right;
    transition: transform 0.2s ease-out;
  }

  .swipeable-list-item__leading-actions--scaled > * {
    transform: scale(1.2);
    transform-origin: center left;
    transition: transform 0.2s ease-in;
  }

  .swipeable-list-item__trailing-actions--scaled > * {
    transform: scale(1.2);
    transform-origin: center right;
    transition: transform 0.2s ease-in;
  }

  .swipe-action {
    display: flex;
    width: 100%;
    align-items: stretch;
  }

  .swipe-action > * {
    flex: 1;
  }

  .swipe-action__grayed > * {
    background-color: gray !important;
  }

  .swipe-action__leading > * {
    justify-content: flex-start;
  }

  .swipe-action__trailing > * {
    justify-content: flex-end;
  }

  .swipe-action__leading--full-swipe-rest,
  .swipe-action__trailing--full-swipe-rest {
    width: 0;
    transition: width 0.2s;
  }

  .swipe-action__leading--full-swipe-main > * {
    justify-content: flex-end;
  }

  .swipe-action__trailing--full-swipe-main > * {
    justify-content: flex-start;
  }

  .trailing-actions {
    display: flex;
  }

  .trailing-actions > * {
    width: 0;
    overflow-x: hidden;
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
