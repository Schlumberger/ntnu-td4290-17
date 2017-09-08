import React from 'react';
import { connect } from 'cerebral/react';
import { state, signal } from 'cerebral/tags';

import { Wrapper, Title, LayerButton } from './elements';

export default connect(
  {
    layers: state`layers`,
    layerClicked: signal`app.layerClicked`
  },
  function SideMenu({ className, layerClicked, layers = {} }) {
    const layerButtons = Object.keys(layers).map(layerID => (
      <LayerButton
        key={layerID}
        inactive={!layers[layerID]}
        onClick={() => layerClicked({ layerID })}
      >
        {layerID}
      </LayerButton>
    ));

    return (
      <Wrapper className={className}>
        <Title>{'Side Menu'}</Title>
        {layerButtons}
      </Wrapper>
    );
  }
);
