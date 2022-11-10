import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import { ListHolder } from './styles';
import { withTheme } from 'styled-components';
import { exists } from '../../utils/util';

const List = (props: {
  children?: any[];
  drawerState?: [
    boolean | undefined,
    React.Dispatch<React.SetStateAction<boolean | undefined>>
  ];
  onClick?: any;

  toggleIndexes;
  openIndexes;
  closeIndexes;
  noClickIndexes;

  style?: CSSStyleDeclaration;

  vertical?: boolean;

  search?: string;
  setSearch?;

  fullSwipe?: boolean;
  threshold?: number;
  holdThreshold?: number;
  fullSwipeThreshold?: number;
}) => {
  const [vertical, setVertical] = useState(false);
  console.log('list Props', props.vertical);
  const toggle = () => {
    // console.log('toggle', props?.drawerState?.[0]);
    props?.drawerState?.[1]?.(!props?.drawerState?.[0]);
  };

  const open = () => {
    props?.drawerState?.[1]?.(true);
  };

  const close = () => {
    props?.drawerState?.[1](false);
  };

  const passProps = (
    elements: any[],
    toggleIndexes,
    openIndexes,
    closeIndexes,
    noClickIndexes
  ) => {
    // console.log('list passProps', elements, toggleIndexes, openIndexes, closeIndexes, noClickIndexes);
    return (
      elements &&
      React.Children.map(elements, (child, index) => {
        let has = exists(openIndexes, index);
        let drawerAction:
          | React.Dispatch<React.SetStateAction<boolean>>
          | undefined;

        if (has) {
          drawerAction = open;
          has = exists(closeIndexes, index);
          if (has) {
            drawerAction = toggle;
          }
        } else {
          has = exists(closeIndexes, index);
          if (has) {
            drawerAction = close;
          }
        }

        has = exists(toggleIndexes, index);

        if (has) {
          drawerAction = toggle;
        }

        const newProps: {
          onClick?;

          drawerAction;
          drawerState;
          drawerOpen;
          drawerClose;
          drawerToggle;

          fullSwipe?: boolean;
          threshold?: number;
          holdThreshold?: number;
          fullSwipeThreshold?: number;
          search?: string;
          vertical?: boolean;
          setSearch?;
        } = {
          drawerAction: drawerAction,
          drawerState: props?.drawerState,
          drawerOpen: open,
          drawerClose: close,
          drawerToggle: toggle,
          fullSwipe: props.fullSwipe,
          threshold: props.threshold,
          holdThreshold: props.holdThreshold,
          fullSwipeThreshold: props.fullSwipeThreshold,
          search: props.search,
          vertical: !!!props.vertical,
          setSearch: props.setSearch,
        };

        if (drawerAction) {
          newProps.onClick = drawerAction;
        }

        has = exists(noClickIndexes, index);

        if (newProps.onClick == undefined && has) delete newProps.onClick;

        const cloneChild = React.cloneElement(child, newProps);
        return cloneChild;
      })
    );
  };

  const [children, setChildren] = useState(
    props.children ? (
      passProps(
        props?.children,
        props?.toggleIndexes,
        props?.openIndexes,
        props?.closeIndexes,
        props?.noClickIndexes
      )
    ) : (
      <></>
    )
  );

  useEffect(() => {
    setChildren(
      props.children ? (
        passProps(
          props?.children,
          props?.toggleIndexes,
          props?.openIndexes,
          props?.closeIndexes,
          props?.noClickIndexes
        )
      ) : (
        <></>
      )
    );
  }, [
    props?.children,
    props?.drawerState,
    props?.drawerState?.[0],
    props?.toggleIndexes,
    props?.openIndexes,
    props?.closeIndexes,
    props?.noClickIndexes,
  ]);

  useEffect(() => {
    setVertical(!!props.vertical);
  }, [props.vertical]);

  return (
    <ListHolder
      style={props?.style}
      className={
        (props?.drawerState?.[0] ? 'openned' : 'closed') +
        ' ' +
        (vertical ? 'vertical' : 'horizontal')
      }
    >
      {children}
    </ListHolder>
  );
};

export default withTheme(List);
