import React, { useEffect, useState } from 'react';
import { CheckboxContainer, CheckIcon, StyledCheckbox } from './styles';

export const Checkbox = (props: {
  checked?: boolean;
  onChange;
  title?: string;
}) => {
  const [checked, setChecked] = useState<boolean | undefined>(props.checked);
  const [title, setTitle] = useState<string | undefined>(props.title);
  const [init, setInit] = useState<boolean | undefined>(false);
  useEffect(() => {
    setChecked(props.checked);
    setTitle(props.title);
  }, [props, props.checked, props.title, props.onChange]);
  useEffect(() => {
    if (init) props.onChange(checked);
    else setInit(true);
  }, [checked]);

  useEffect(() => {}, [title]);
  return (
    <CheckboxContainer
      onClick={() => {
        setChecked(!checked);
      }}
    >
      <StyledCheckbox checked={checked} title={title}>
        <CheckIcon viewBox="0 0 24 24">
          {checked ? <polyline points="20 6 9 17 4 12" /> : <></>}
        </CheckIcon>
      </StyledCheckbox>
    </CheckboxContainer>
  );
};
