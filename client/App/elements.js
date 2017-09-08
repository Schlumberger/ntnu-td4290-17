import styled from 'styled-components';

import Viz from 'components/Visualization';
import Menu from './SideMenu';
import Header from './Header';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 70px 1fr 50px;
  grid-template-areas: 'headerMenu headerMenu' 'sideMenu   visualization'
    'footer     footer';
  height: 100vh;
  width: 100vw;
`;

export const HeaderMenu = styled(Header)`
  grid-area: headerMenu;

  width: 100%;
  height: 100%:
`;

export const SideMenu = styled(Menu)`
  grid-area: sideMenu;
  background-color: #999999;
  width: 100%;
  height: 100%:
`;

export const Visualization = styled(Viz)`
  grid-area: visualization;
  background-color: blue;
  width: 100%;
  height: 100%:
`;

export const Footer = styled.div`
  grid-area: footer;
  background-color: yellow;
  width: 100%;
  height: 100%:
`;
