import styled from 'styled-components';

import Typ16 from '../Typ16';
import Wrapper16 from '../Wrapper16';

export const Wrapper = styled(Wrapper16)`
  //border: 1px solid gray;
  padding: 20px;
  padding-left: 8px;
  border-radius: 30px;

  background-color: rgba(55, 55, 55, 0.8);
  transition: background-color 0.5;
  &:hover {
    cursor: pointer;
    background-color: rgba(55, 55, 55, 1);
  }
`;

export const ActiveText = styled(Typ16)`color: white;`;

export const InactiveText = styled(Typ16)`color: #bbbbbb;`;
