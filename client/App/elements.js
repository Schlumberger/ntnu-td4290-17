import styled from 'styled-components';

import Viz from 'components/Visualization';
import Menu from './SideMenu';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 45px 1fr 50px;
  grid-template-areas: 'headerMenu headerMenu' 'sideMenu   visualization'
    'footer     footer';
  height: 100vh;
  width: 100vw;
`;

export const HeaderMenu = styled.div`
  grid-area: headerMenu;
  background-color: red;
  width: 100%;
  height: 100%:
`;

export const SideMenu = styled(Menu)`
  grid-area: sideMenu;
  background-color: green;
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
