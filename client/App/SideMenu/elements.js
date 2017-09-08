import styled from 'styled-components';

import Button from 'components/LayerButton';

import Typ20 from 'components/Typ20';

export const Wrapper = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const Title = styled(Typ20)`
  width: 100%;
  text-align: center;
`;

export const LayerButton = styled(Button)`margin: 10px;`;
