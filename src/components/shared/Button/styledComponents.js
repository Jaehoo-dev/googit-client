import styled from 'styled-components';

export const StyledButton = styled.button`
  text-decoration: none;
  background-color: ${props => props.theme.backgroundColor};
  padding: 10px;
  border: none;
  display: inline-block;
  border-radius: 10px;
  font-size: ${props => props.theme.fontSize};
  font-weight: ${props => props.theme.fontWeight};
  color: ${props => props.theme.color};
  width: ${props => props.theme.width};
  height: ${props => props.theme.height};

  &:hover {
    cursor: pointer;
  }
`;
