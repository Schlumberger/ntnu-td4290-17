import React from 'react';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';

import { Wrapper, Title, ImmersiveButton } from './elements';

export default connect(
  {
    // Get the state located in .layers
    layers: state`settings.visibility`,
    yAxisUnit: state`settings.yAxisUnit`,
    // Get the signal in app.layerClicked in the app-module
    layerClicked: signal`app.layerClicked`,
    yAxisOptionClicked: signal`app.yAxisOptionClicked`
  },
  function SideMenu({
    className,
    layerClicked,
    yAxisOptionClicked,
    layers = {},
    yAxisUnit
  }) {
    // Map data to components
    const layerButtons = Object.keys(layers).map(layerID => (
      <ImmersiveButton
        key={layerID}
        inactive={!layers[layerID]}
        // use signal as a function
        onClick={() => layerClicked({ layerID })}
      >
        {layerID.split('-').join(' ')}
      </ImmersiveButton>
    ));

    return (
      <Wrapper className={className}>
        <Title>{'Layers'}</Title>
        {layerButtons}
        <Title>{'Y-Axis'}</Title>
        <ImmersiveButton
          onClick={() => yAxisOptionClicked({ unit: 'age' })}
          inactive={yAxisUnit === 'age'}
        >
          {'Age'}
        </ImmersiveButton>
        <ImmersiveButton
          onClick={() => yAxisOptionClicked({ unit: 'depth' })}
          inactive={yAxisUnit === 'depth'}
        >
          {'Depth'}
        </ImmersiveButton>
      </Wrapper>
    );
  }
);
