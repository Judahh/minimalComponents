import React, { useRef } from 'react';
import { withTheme } from 'styled-components';

const FileButton = (props: { Button; name?; accept; onChange }) => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = () => {
    if (hiddenFileInput?.current) (hiddenFileInput.current as any).click();
  };

  return (
    <>
      <props.Button onClick={handleClick} />
      <input
        type="file"
        ref={hiddenFileInput}
        name={props.name}
        accept={props.accept}
        onChange={props.onChange}
        style={{ display: 'none' }}
      />
    </>
  );
};
export default withTheme(FileButton);
