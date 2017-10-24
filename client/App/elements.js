import styled from 'styled-components';

import Viz from 'components/Visualization';
import PlacesTopBar from 'components/PlacesBar';
import Menu from './ImmersiveBar';
import Info from './InfoBox';

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
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 250px;
  grid-template-rows: 1fr 120px 100px 20px;
  grid-template-areas: 'center right' 'center rightBottom'
    'centerBottom rightBottom' 'margin margin';
`;

export const ImmersiveBar = styled(Menu)`
  pointer-events: none;
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
  cursor: move;
`;

export const ButtonWrapper = styled.div`
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, 0);
  display: inline-block;
  background: white;
  color: #444;
  border-radius: 5px;
  border: thin solid #888;
  box-shadow: 1px 1px 1px grey;
  white-space: nowrap;
  cursor: pointer;
  padding: 10px;
`;

export const ButtonText = styled.span`
  display: inline-block;
  vertical-align: middle;
  padding-left: 42px;
  padding-right: 42px;
  font-size: 14px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
`;
