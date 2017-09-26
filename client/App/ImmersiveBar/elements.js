import styled from 'styled-components';

import Button from 'components/ImmersiveButton';

import Typ20 from 'components/Typ20';

export const Wrapper = styled.div`padding: 10px;`;

export const Handle = styled.div`
  background-color: #999;
  display: inline-flex;
  justify-content: center;
  margin: auto;
  cursor: move;
`;

export const ImmersiveButton = styled(Button)`
  text-transform: capitalize;
  margin: 8px;
`;
