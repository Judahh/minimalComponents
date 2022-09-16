import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import {
  DrawerWrapper,
  DrawerMenu,
  DrawerHolder,
} from './styles';
import { withTheme } from 'styled-components';
import { exists } from '../../utils/util';

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

  const filterIndexes = (indexes:number[], children = 0) => {
    const filtered = indexes.map(index=> index - children).filter(index => index >= 0);
    return JSON.parse(JSON.stringify(filtered));
  }

  const passProps = (elements:any[], toggleIndexes, openIndexes, closeIndexes, noClickIndexes) => {
    // console.log('children passProps', elements, toggleIndexes, openIndexes, closeIndexes, noClickIndexes);
    return (
      React.Children.map?.(elements, (child, index) => {
        let has = exists(openIndexes, index);
        let drawerAction: React.Dispatch<React.SetStateAction<boolean>> | undefined;

        if (has) {
          drawerAction = open;
          has = exists(closeIndexes, index);
          if(has) {
            drawerAction = toggle;
          }
        } else {
          has = exists(closeIndexes, index);
          if(has) {
            drawerAction = close;
          }
        }

        has = exists(toggleIndexes, index);

        if(has) {
          drawerAction = toggle;
        }

        const newProps: {onClick?, drawerAction, drawerState, drawerOpen, drawerClose, drawerToggle} = {
          onClick: drawerAction,
          drawerAction: drawerAction,
          drawerState: state,
          drawerOpen: open,
          drawerClose: close,
          drawerToggle: toggle,
        };

        has = exists(noClickIndexes, index);

        if(drawerAction == undefined && has)
          delete newProps.onClick;

        // console.log('children newProps', newProps);

        const cloneChild = React.cloneElement(child, newProps);
        return cloneChild;
      })
    );
  };

  const passPropsToNav = (elements:any[], toggleIndexes, openIndexes, closeIndexes, noClickIndexes) => {
    let currentToggleIndexes = JSON.parse(JSON.stringify(toggleIndexes || []));
    let currentOpenIndexes = JSON.parse(JSON.stringify(openIndexes || []));
    let currentCloseIndexes = JSON.parse(JSON.stringify(closeIndexes || []));
    let currentNoClickIndexes = JSON.parse(JSON.stringify(noClickIndexes || []));

    return (
      elements &&
      React.Children.map(elements, (child, _index) => {
        const newProps = {
          toggleIndexes: currentToggleIndexes,
          openIndexes: currentOpenIndexes,
          closeIndexes: currentCloseIndexes,
          noClickIndexes: currentNoClickIndexes,
          state: state,
          open: open,
          close: close,
          toggle: toggle,
        };

        // console.log('newProps base', index, newProps);

        const cloneChild = React.cloneElement(child, newProps);

        const length = React.Children.count(child.props?.children);
        currentToggleIndexes = filterIndexes(currentToggleIndexes, length);
        currentOpenIndexes = filterIndexes(currentOpenIndexes, length);
        currentCloseIndexes = filterIndexes(currentCloseIndexes, length);
        currentNoClickIndexes = filterIndexes(currentNoClickIndexes, length);
        return cloneChild;
      })
    );
  };

  const [children, setChildren] = useState(props.children ? (passProps(props.children, props.childrenToggleIndexes, props.childrenOpenIndexes, props.childrenCloseIndexes, props.childrenNoClickIndexes)):(<></>));
  const [navElements, setNavElements] = useState(props?.nav?.props?.children ? (passPropsToNav(props?.nav?.props?.children, props.navToggleIndexes, props.navOpenIndexes, props.navCloseIndexes, props.navNoClickIndexes)):(<></>));

  useEffect(() => {
    setChildren(props.children ? (passProps(props.children, props.childrenToggleIndexes, props.childrenOpenIndexes, props.childrenCloseIndexes, props.childrenNoClickIndexes)):(<></>))
    setNavElements(props?.nav?.props?.children ? (passPropsToNav(props?.nav?.props?.children, props.navToggleIndexes, props.navOpenIndexes, props.navCloseIndexes, props.navNoClickIndexes)):(<></>))
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
