import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import {
  List as DrawerList,
} from './styles';
import { withTheme } from 'styled-components';

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
    return (
      elements &&
      React.Children.map(elements, (child, index) => {
        let find = toggleIndexes?.findIndex?.(openIndex=>openIndex === index);
        let has = find !== null && find !== undefined && find > -1;
        let drawerAction: React.Dispatch<React.SetStateAction<boolean>> | undefined = props?.toggle;

        if (!has) {
          find = openIndexes?.findIndex?.(openIndex=>openIndex === index);
          has = find !== null && find !== undefined && find > -1;
          drawerAction = props?.open;
          if (!has) {
            find = closeIndexes?.findIndex?.(closeIndex=>closeIndex === index);
            has = find !== null && find !== undefined && find > -1;
            drawerAction = has ? props?.close : undefined;
          }
        }
        find = noClickIndexes?.findIndex?.(openIndex=>openIndex === index);
        has = find !== null && find !== undefined && find > -1;
        const newProps = {
          onClick: drawerAction,
          drawerAction: drawerAction,
          drawerState: props?.state,
          drawerOpen: props?.open,
          drawerClose: props?.close,
          drawerToggle: props?.toggle,
        };
        if (has)
          delete newProps.onClick

        console.log('newProps', index, newProps);

        const cloneChild = React.cloneElement(child, newProps);
        return cloneChild;
      })
    );
  };

  const [children, setChildren] = useState(props.children ? (passProps(props?.children, props?.toggleIndexes, props?.openIndexes, props?.closeIndexes, props?.noClickIndexes)):(<></>));

  useEffect(() => {
    setChildren(props.children ? (passProps(props?.children, props?.toggleIndexes, props?.openIndexes, props?.closeIndexes, props?.noClickIndexes)):(<></>))
    console.log('children', children);
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
