import React from 'react';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';
import Draggable from 'react-draggable';

import { Wrapper, ImmersiveButton, Handle } from './elements';

export default connect(
  {
    // Get the state located in .layers
    layers: state`settings.visibility`,
    yAxisUnit: state`settings.yAxisUnit`,
    forceDiagram: state`settings.forceDiagram`,
    // Get the signal in app.layerClicked in the app-module
    layerSettingClicked: signal`app.layerSettingClicked`,
    yAxisOptionClicked: signal`app.yAxisOptionClicked`,
    forceDiagramClicked: signal`app.forceDiagramClicked`
  },
  function SideMenu ({
    className,
    layerSettingClicked,
    yAxisOptionClicked,
    forceDiagramClicked,
    layers = {},
    yAxisUnit,
    forceDiagram
  }) {
    // Map data to components
    console.log(layers);
    const layerButtons = Object.keys(layers).map(layerID => (
      <ImmersiveButton
        key={layerID}
        inactive={!layers[layerID]}
        // use signal as a function
        onClick={() => layerSettingClicked({ layerID })}
      >
        {layerID.split('-').join(' ')}
      </ImmersiveButton>
    ));

    return (
      <Draggable>
        <Wrapper className={className}>
          <Handle>
            {layerButtons}
            <ImmersiveButton
              // depth/age button
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

            <ImmersiveButton
              // forceDiagram button
              onClick={() => yAxisOptionClicked({ unit: 'force' })}
              inactive={yAxisUnit === 'force'}
            >
              {'Force'}
            </ImmersiveButton>
          </Handle>
        </Wrapper>
      </Draggable>
    );
  }
);
