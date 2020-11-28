import styled from 'styled-components';

export const StyledButton = styled.button`
  text-decoration: none;
  background-color: ${props => props.theme.backgroundColor};
  padding: ${props => props.theme.padding};
  border: ${props => props.theme.border};
  display: inline-block;
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.theme.fontSize};
  font-weight: ${props => props.theme.fontWeight};
  color: ${props => props.theme.color};
  width: ${props => props.theme.width};
  height: ${props => props.theme.height};
  margin: ${props => props.theme.margin};
  position: ${props => props.theme.position};
  top: ${props => props.theme.top};
  left: ${props => props.theme.left};
  transform: ${props => props.theme.transform};
  /* padding: 7px; */

  &:hover {
    cursor: pointer;
  }
`;
