import styled from 'styled-components';

import Viz from 'components/Visualization';
import Menu from './ImmersiveBar';
import PlacesTopBar from './PlacesBar';
import Header from './Header';
import Info from 'components/InfoBox';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const GridWrapper = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: grid;
  grid-template-columns: 1fr 250px;
  grid-template-rows: 1fr 120px 100px 20px;
  grid-template-areas: 'center right' 'center rightBottom'
    'centerBottom rightBottom' 'margin margin';
`;

export const ImmersiveBar = styled(Menu)`
  pointer-events: all;
  grid-area: centerBottom;
`;

export const PlacesBar = styled(PlacesTopBar)`
  pointer-events: all;
  grid-area: centerTop;
`;

export const Visualization = styled(Viz)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: -10;
`;

export const InfoBox = styled(Info)`
  grid-area: rightBottom;
  margin: 10px;
  pointer-events: all;
`;
