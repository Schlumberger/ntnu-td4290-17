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
        inactive={
          !layers[layerID] ||
					diagramOption === 'age' ||
					diagramOption === 'force'
        } // set inactive if the diagram is age or force
        // use signal as a function
        onClick={() => {
          if (diagramOption === 'age' || diagramOption === 'force') {
            // to make buttons non-pushable when not in depth mode
            return;
          }
          layerSettingClicked({ layerID });
        }}
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
              onClick={() =>
                diagramOptionClicked({
                  option: diagramOption === 'depth' ? 'age' : 'depth'
                })}
            >
              {diagramOption === 'depth' ? 'Wheeler\nDiagram' : 'Depth\nView'}
            </ImmersiveButton>
            <ImmersiveButton
              // forceDiagram button
              onClick={() => diagramOptionClicked({ option: 'force' })}
              inactive={diagramOption === 'force'}
            >
              {'Force\nLayout'}
            </ImmersiveButton>
          </Handle>
        </Wrapper>
      </Draggable>
    );
  }
);
