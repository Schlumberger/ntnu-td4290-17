import styled from 'styled-components';

export const Wrapper = styled.div`
  border-style: solid;
  border-width: 5px;
  border-color: ${props => props.color};
  border-radius: 3px;
  min-width: 200px;
  background-color: #d6d6d6;
  text-transform: capitalize;
`;
