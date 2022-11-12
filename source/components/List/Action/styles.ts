import styled from 'styled-components';

const ActionContent = styled.div`
  height: 100%;
  max-height: 100%;
  min-height: 100%;
  width: 100%;
  // min-width: 100px;
  display: block;
  flex: 1;
  align-items: center;
  padding: 0px;
  font-size: 12px;
  font-weight: 500;
  box-sizing: border-box;
  color: ${(props) => props.theme.primary};
  user-select: none;
`;

export {
  ActionContent,
};
