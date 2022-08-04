import React, { useState } from 'react';
import {
  DrawerWrapper,
  DrawerMenu,
  Item,
  NavHolder,
} from './styles';
import { withTheme } from 'styled-components';

const Drawer = (props: { children?:any[]; nav?:any[]; navOpenIndexes?:number[]; navCloseIndexes?:number[]; navSetOpenIndexes?:number[]; navToggleIndexes?:number[]; navNoClickIndexes?:number[]; childrenOpenIndexes?:number[]; childrenCloseIndexes?:number[]; childrenSetOpenIndexes?:number[]; childrenToggleIndexes?:number[]; childrenNoClickIndexes?:number[];}) => {
  const [openned, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!openned);
  };

  const open = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  const passProps = (elements:any[], toggleIndexes, setOpenIndexes, openIndexes, closeIndexes, noClickIndexes) => {
    return (
      elements &&
      React.Children.map(elements, (child, index) => {
        let find = setOpenIndexes?.findIndex?.(openIndex=>openIndex === index);
        let has = find !== null && find !== undefined && find > -1;
        let aSetOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined = has ? setOpen : undefined;

        find = toggleIndexes?.findIndex?.(openIndex=>openIndex === index);
        has = find !== null && find !== undefined && find > -1;
        let onClick: React.Dispatch<React.SetStateAction<boolean>> | undefined = toggle;

        if (!has) {
          find = openIndexes?.findIndex?.(openIndex=>openIndex === index);
          has = find !== null && find !== undefined && find > -1;
          onClick = open;
          if (!has) {
            find = closeIndexes?.findIndex?.(closeIndex=>closeIndex === index);
            has = find !== null && find !== undefined && find > -1;
            onClick = has ? close : undefined;
          }
        }
        find = noClickIndexes?.findIndex?.(openIndex=>openIndex === index);
        has = find !== null && find !== undefined && find > -1;
        const newProps = {
          onClick: onClick,
          drawerAction: onClick,
          drawerSetOpen: aSetOpen
        };
        if (has)
          delete newProps.onClick

        return React.cloneElement(child, newProps);
      })
    );
  };

  return (
    <DrawerWrapper
      className={openned ? 'openned' : 'closed'}
    >
      <NavHolder>
        {props.nav ? (passProps(props.nav, props.navToggleIndexes, props.navSetOpenIndexes, props.navOpenIndexes, props.navCloseIndexes, props.navNoClickIndexes)):(<></>)}
      </NavHolder>
      <DrawerMenu
        className={openned ? 'openned' : 'closed'}
      >
        <Item>
          {props.children ? (passProps(props.children, props.childrenToggleIndexes, props.childrenSetOpenIndexes, props.childrenOpenIndexes, props.childrenCloseIndexes, props.childrenNoClickIndexes)):(<></>)}
        </Item>
      </DrawerMenu>
    </DrawerWrapper>
  );
};

export default withTheme(Drawer);
