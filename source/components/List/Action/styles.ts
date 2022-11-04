import styled from 'styled-components';

const ActionContent = styled.div`
  height: 100%;
  width: 100%;
  // min-width: 100px;
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 12px;
  font-weight: 500;
  box-sizing: border-box;
  color: ${(props) => props.theme.primary};
  user-select: none;
`;

export {
  ActionContent,
};
