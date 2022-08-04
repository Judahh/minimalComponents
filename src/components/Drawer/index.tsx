import React, { useState } from 'react';
import {
  DrawerWrapper,
  DrawerMenu,
  NavHolder,
} from './styles';
import { withTheme } from 'styled-components';

const Drawer = (props: { top?: boolean; children?:any[]; nav?:{props?:{children?:any[];}; }; navOpenIndexes?:number[]; navCloseIndexes?:number[]; navToggleIndexes?:number[]; navNoClickIndexes?:number[]; childrenOpenIndexes?:number[]; childrenCloseIndexes?:number[]; childrenToggleIndexes?:number[]; childrenNoClickIndexes?:number[];}) => {
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

  const passProps = (elements:any[], toggleIndexes, openIndexes, closeIndexes, noClickIndexes) => {
    return (
      elements &&
      React.Children.map(elements, (child, index) => {
        let find = toggleIndexes?.findIndex?.(openIndex=>openIndex === index);
        let has = find !== null && find !== undefined && find > -1;
        let drawerAction: React.Dispatch<React.SetStateAction<boolean>> | undefined = toggle;

        if (!has) {
          find = openIndexes?.findIndex?.(openIndex=>openIndex === index);
          has = find !== null && find !== undefined && find > -1;
          drawerAction = open;
          if (!has) {
            find = closeIndexes?.findIndex?.(closeIndex=>closeIndex === index);
            has = find !== null && find !== undefined && find > -1;
            drawerAction = has ? close : undefined;
          }
        }
        find = noClickIndexes?.findIndex?.(openIndex=>openIndex === index);
        has = find !== null && find !== undefined && find > -1;
        const newProps = {
          onClick: drawerAction,
          drawerAction: drawerAction,
          drawerSetOpen: setOpen,
          drawerOpen: open,
          drawerClose: close,
          drawerToggle: toggle,
          openned: openned,
        };
        if (has)
          delete newProps.onClick

        const cloneChild = React.cloneElement(child, newProps);
        return cloneChild;
      })
    );
  };

  const navElements = props?.nav?.props?.children ? (passProps(props?.nav?.props?.children, props.navToggleIndexes, props.navOpenIndexes, props.navCloseIndexes, props.navNoClickIndexes)):(<></>);
  const children = props.children ? (passProps(props.children, props.childrenToggleIndexes, props.childrenOpenIndexes, props.childrenCloseIndexes, props.childrenNoClickIndexes)):(<></>);

  return (
    <DrawerWrapper
      className={openned ? 'openned' : 'closed'}
      top={props.top}
    >
      <NavHolder>
        {navElements}
      </NavHolder>
      <DrawerMenu
        className={openned ? 'openned' : 'closed'}
        top={props.top}
      >
        {children}
      </DrawerMenu>
    </DrawerWrapper>
  );
};

export default withTheme(Drawer);
