import styled from 'styled-components';

import Typ16 from '../Typ16';
import Wrapper16 from '../Wrapper16';

export const Wrapper = styled(Wrapper16)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 80px;
  width: 80px;
  background-color: rgba(70, 70, 70, 1);
  transition: background-color 0.5;
  pointer-events: all;
  cursor: pointer;
  &:hover {
    background-color: rgba(55, 55, 55, 1);
  }
  ${props => (props.show ? 'border: 3px solid #0d0' : null)};
`;

export const ActiveText = styled(Typ16)`
  color: white;
  text-align: center;
  font-weight: bold;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const InactiveText = styled(Typ16)`
  color: #bbbbbb;
  text-align: center;
`;
