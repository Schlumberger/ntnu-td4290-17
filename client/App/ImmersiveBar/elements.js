import styled from 'styled-components';

import Button from 'components/ImmersiveButton';

import Typ20 from 'components/Typ20';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

export const ImmersiveButton = styled(Button)`
  text-transform: capitalize;
  margin-right: 8px;
`;
