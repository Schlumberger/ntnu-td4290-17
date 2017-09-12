import React from 'react';
import { connect } from 'cerebral/react';
import { state, signal } from 'cerebral/tags';

import { Wrapper, Title, LayerButton } from './elements';

export default connect(
  {
    // Get the state located in .layers
    layers: state`settings.visibility`,
    // Get the signal in app.layerClicked in the app-module
    layerClicked: signal`app.layerClicked`
  },
  function SideMenu({ className, layerClicked, layers = {} }) {
    // Map data to components
    const layerButtons = Object.keys(layers).map(layerID => (
      <LayerButton
        key={layerID}
        inactive={!layers[layerID]}
        // use signal as a function
        onClick={() => layerClicked({ layerID })}
      >
        {layerID.split('-').join(' ')}
      </LayerButton>
    ));

    return (
      <Wrapper className={className}>
        <Title>{'Layers'}</Title>
        {layerButtons}
      </Wrapper>
    );
  }
);
