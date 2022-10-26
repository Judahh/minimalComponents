import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import {
  List as DrawerList,
} from './styles';
import { withTheme } from 'styled-components';
import { exists } from '../../../utils/util';

const List = (props: {
  children?:any[];
  drawerState?: [boolean|undefined, React.Dispatch<React.SetStateAction<boolean|undefined>>];
  onClick?:any;

  toggleIndexes;
  openIndexes;
  closeIndexes;
  noClickIndexes;
}) => {
  const state: [boolean|undefined, React.Dispatch<React.SetStateAction<boolean|undefined>>, any] = useState(props?.drawerState?.[0]);
  const toggle = () => {
    props?.drawerState?.[1]?.(!state?.[0]);
  };

  const open = () => {
    props?.drawerState?.[1]?.(true);
  };

  const close = () => {
    props?.drawerState?.[1](false);
  };

  const passProps = (elements:any[], toggleIndexes, openIndexes, closeIndexes, noClickIndexes) => {
    // console.log('list passProps', elements, toggleIndexes, openIndexes, closeIndexes, noClickIndexes);
    return (
      elements &&
      React.Children.map(elements, (child, index) => {
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
          drawerState: props?.drawerState,
          drawerOpen: open,
          drawerClose: close,
          drawerToggle: toggle,
        };

        has = exists(noClickIndexes, index);

        if(drawerAction == undefined && has)
          delete newProps.onClick;

        const cloneChild = React.cloneElement(child, newProps);
        return cloneChild;
      })
    );
  };

  const [children, setChildren] = useState(props.children ? (passProps(props?.children, props?.toggleIndexes, props?.openIndexes, props?.closeIndexes, props?.noClickIndexes)):(<></>));

  useEffect(() => {
    setChildren(props.children ? (passProps(props?.children, props?.toggleIndexes, props?.openIndexes, props?.closeIndexes, props?.noClickIndexes)):(<></>))
  }, [props?.children, props?.drawerState, props?.drawerState?.[0], props?.toggleIndexes, props?.openIndexes, props?.closeIndexes, props?.noClickIndexes]);

  return (
    <DrawerList
      className={props?.drawerState?.[0] ? 'openned' : 'closed'}
    >
      {children}
    </DrawerList>
  );
};

export default withTheme(List);
