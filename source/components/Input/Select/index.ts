//@ts-ignore
import styled from 'styled-components';
export const selectStyle = (props) => {
  return {
    dropdownIndicator: () => ({
      backgroundColor: 'transparent',
      color: '' + props.theme.primary,
    }),

    indicatorSeparator: (styles) => ({
      ...styles,
      backgroundColor: 'transparent',
    }),

    control: (styles) => ({
      ...styles,
      cursor: 'pointer',
      margin: '5px',
      backgroundColor: props.theme.background,
      border: 'none',
      borderColor: '' + props.theme.primary,
      borderBottom: '1px solid ' + props.theme.primary,
      borderRadius: '0',
      color: '' + props.theme.primary,
      minWidth: '25px',
      ':active': {
        backgroundColor: props.theme.background,
        border: 'none',
        borderBottom: '1px solid ' + props.theme.primary,
        borderRadius: '0',
      },
      ':hover': {
        backgroundColor: props.theme.background,
        border: 'none',
        borderBottom: '1px solid ' + props.theme.bright,
        borderRadius: '0',
      },
    }),

    menu: (styles, { isFocused, isSelected }) => ({
      ...styles,
      cursor: 'pointer',
      backgroundColor:
        '' + (isSelected ? props.theme.background : props.theme.primary),
      border:
        '1px solid ' + isSelected || isFocused
          ? props.theme.primary
          : props.theme.background,
      color:
        '' + isSelected || isFocused
          ? props.theme.bright
          : props.theme.background,
      width: 'fit-content',
    }),
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        cursor: 'pointer',
        color: '' + props.theme.bright,
        backgroundColor: props.theme.background,
        border: isSelected ? '1px solid ' + props.theme.bright : 'none',
      };
    },
    input: (styles) => ({
      ...styles,
      color: '' + props.theme.bright,
    }),
    placeholder: (styles) => ({ ...styles, color: '' + props.theme.primary }),
    singleValue: (styles) => ({ ...styles, color: '' + props.theme.bright }),
  };
};
