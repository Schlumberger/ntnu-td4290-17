import styled from 'styled-components';

import Viz from 'components/Visualization';
import Menu from './ImmersiveBar';
import Header from './Header';
import Info from 'components/InfoBox';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const ImmersiveBar = styled(Menu)`position: absolute;`;

export const Visualization = styled(Viz)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: -1000000000;
`;

export const HeaderMenu = styled(Header)`
  width: 100%;
  height: 100%:
`;

export const InfoBox = styled(Info)`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
