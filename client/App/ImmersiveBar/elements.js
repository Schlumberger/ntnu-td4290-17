import styled from 'styled-components';

import Button from 'components/ImmersiveButton';

import Typ20 from 'components/Typ20';

export const Wrapper = styled.div`
  //overflow-x: hidden;
  padding: 10px;
  width: 100px;
  max-width: 100px;
  display: inline-block;
`;

export const Title = styled(Typ20)`
  display: block;
  text-align: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const ImmersiveButton = styled(Button)`
  margin: 10px;
  text-transform: capitalize;
`;
