import React from 'react';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';
import Draggable from 'react-draggable';

import { Wrapper, ImmersiveButton, Handle } from './elements';

export default connect(
  {
    // Get the state located in .layers
    layers: state`settings.visibility`,
    diagramOption: state`settings.diagramOption`,
    // Get the signal in app.layerClicked in the app-module
    layerSettingClicked: signal`app.layerSettingClicked`,
    diagramOptionClicked: signal`app.diagramOptionClicked`
  },
  function SideMenu ({
    className,
    layerSettingClicked,
    diagramOptionClicked,
    layers = {},
    diagramOption
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
              onClick={() => diagramOptionClicked({ option: 'age' })}
              inactive={diagramOption === 'age'}
            >
              {'Age\nDiagram'}
            </ImmersiveButton>
            <ImmersiveButton
              onClick={() => diagramOptionClicked({ option: 'depth' })}
              inactive={diagramOption === 'depth'}
            >
              {'Depth\nDiagram'}
            </ImmersiveButton>

            <ImmersiveButton
              // forceDiagram button
              onClick={() => diagramOptionClicked({ option: 'force' })}
              inactive={diagramOption === 'force'}
            >
              {'Force'}
            </ImmersiveButton>
          </Handle>
        </Wrapper>
      </Draggable>
    );
  }
);
