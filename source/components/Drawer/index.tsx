import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import {
  DrawerWrapper,
  DrawerMenu,
  DrawerHolder,
} from './styles';
import { withTheme } from 'styled-components';

const Drawer = (props: { top?: boolean; children?:any[]; nav?:{props?:{children?:any[];}; }; navOpenIndexes?:number[]; navCloseIndexes?:number[]; navToggleIndexes?:number[]; navNoClickIndexes?:number[]; childrenOpenIndexes?:number[]; childrenCloseIndexes?:number[]; childrenToggleIndexes?:number[]; childrenNoClickIndexes?:number[];}) => {
  const state: [boolean, React.Dispatch<React.SetStateAction<boolean>>, any] = useState(false);

  const toggle = () => {
    state?.[1]?.(!state?.[0]);
  };

  const open = () => {
    state?.[1]?.(true);
  };

  const close = () => {
    state[1](false);
  };

  const passProps = (elements:any[], toggleIndexes, openIndexes, closeIndexes, noClickIndexes) => {
    const grandchildren = React.Children.map(elements, (element) => {
      if (element.props?.children)
        return React.Children.map(element.props?.children, (grandchild) => grandchild);
    }).flat();
    return (
      elements &&
      grandchildren.map(elements, (child, index) => {
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
          drawerState: state,
          drawerOpen: open,
          drawerClose: close,
          drawerToggle: toggle,
        };
        if (has)
          delete newProps.onClick

        const cloneChild = React.cloneElement(child, newProps);
        return cloneChild;
      })
    );
  };

  const [children, setChildren] = useState(props.children ? (passProps(props.children, props.childrenToggleIndexes, props.childrenOpenIndexes, props.childrenCloseIndexes, props.childrenNoClickIndexes)):(<></>));
  const [navElements, setNavElements] = useState(props?.nav?.props?.children ? (passProps(props?.nav?.props?.children, props.navToggleIndexes, props.navOpenIndexes, props.navCloseIndexes, props.navNoClickIndexes)):(<></>));

  useEffect(() => {
    setChildren(props.children ? (passProps(props.children, props.childrenToggleIndexes, props.childrenOpenIndexes, props.childrenCloseIndexes, props.childrenNoClickIndexes)):(<></>))
    setNavElements(props?.nav?.props?.children ? (passProps(props?.nav?.props?.children, props.navToggleIndexes, props.navOpenIndexes, props.navCloseIndexes, props.navNoClickIndexes)):(<></>))
  }, [props?.children, props?.nav?.props?.children, state?.[0]]);

  return (
    <DrawerWrapper
      className={state?.[0] ? 'openned' : 'closed'}
      top={props.top}
    >
      <DrawerHolder
        className={state?.[0] ? 'openned' : 'closed'}
      >
        {navElements}
      </DrawerHolder>
      <DrawerMenu
        className={state?.[0] ? 'openned' : 'closed'}
        top={props.top}
      >
        {children}
      </DrawerMenu>
    </DrawerWrapper>
  );
};

export default withTheme(Drawer);
