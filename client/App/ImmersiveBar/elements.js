import styled from 'styled-components';

import Button from 'components/ImmersiveButton';

import Typ20 from 'components/Typ20';

export const Wrapper = styled.div`
  padding: 10px;
  pointer-events: none;
`;

export const Handle = styled.div`
  background: rgba(0, 0, 0, .3);
  border-radius: 5px;
  display: inline-flex;
  justify-content: center;
  margin: auto;
  cursor: move;
  pointer-events: all;
`;

export const ImmersiveButton = styled(Button)`
  text-transform: capitalize;
  margin: 8px;
`;
