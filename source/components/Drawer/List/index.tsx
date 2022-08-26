import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import {
  List as DrawerList,
} from './styles';
import { withTheme } from 'styled-components';
import { exists } from '../../../utils/util';

const List = (props: {
  children?:any[];
  state: [boolean, React.Dispatch<React.SetStateAction<boolean>>, any];
  open;
  close;
  toggle;
  toggleIndexes;
  openIndexes;
  closeIndexes;
  noClickIndexes;
}) => {

  const passProps = (elements:any[], toggleIndexes, openIndexes, closeIndexes, noClickIndexes) => {
    console.log('list passProps', elements, toggleIndexes, openIndexes, closeIndexes, noClickIndexes);
    return (
      elements &&
      React.Children.map(elements, (child, index) => {
        let has = exists(openIndexes, index);
        let drawerAction: React.Dispatch<React.SetStateAction<boolean>> | undefined;

        if (has) {
          drawerAction = props?.open;
          has = exists(closeIndexes, index);
          if(has) {
            drawerAction = props?.toggle;
          }
        } else {
          has = exists(closeIndexes, index);
          if(has) {
            drawerAction = props?.close;
          }
        }

        has = exists(toggleIndexes, index);

        if(has) {
          drawerAction = props?.toggle;
        }

        const newProps: {onClick?, drawerAction, drawerState, drawerOpen, drawerClose, drawerToggle} = {
          onClick: drawerAction,
          drawerAction: drawerAction,
          drawerState: props?.state,
          drawerOpen: props?.open,
          drawerClose: props?.close,
          drawerToggle: props?.toggle,
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
  }, [props?.children, props?.state, props?.state?.[0], props?.toggleIndexes, props?.openIndexes, props?.closeIndexes, props?.noClickIndexes]);

  return (
    <DrawerList
      className={props?.state?.[0] ? 'openned' : 'closed'}
    >
      {children}
    </DrawerList>
  );
};

export default withTheme(List);
