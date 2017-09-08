import styled from 'styled-components';

import Typ16 from '../Typ16';
import Wrapper16 from '../Wrapper16';

export const Wrapper = styled(Wrapper16)`
  width: 100%;
  border: 1px solid gray;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export const ActiveText = styled(Typ16)``;

export const InactiveText = styled(Typ16)`color: gray;`;
