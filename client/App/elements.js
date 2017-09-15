import styled from 'styled-components';

import Viz from 'components/Visualization';
import Menu from './ImmersiveBar';
import Header from './Header';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const ImmersiveBar = styled(Menu)`
  //grid-area: sideMenu;
  //background-color: rgba(0, 0, 0, 0.3);
  //width: 100%;
  position: absolute;
`;

export const Visualization = styled(Viz)`
  //grid-area: visualization;
  background-color: blue;
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

export const HeaderMenu = styled(Header)`
  grid-area: headerMenu;

  width: 100%;
  height: 100%:
`;
export const Footer = styled.div`
  grid-area: footer;
  background-color: yellow;
  width: 100%;
  height: 100%:
`;
