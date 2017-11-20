import React from 'react';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';
import Draggable from 'react-draggable';

import { Wrapper, ImmersiveButton, Handle, LayerButton } from './elements';

export default connect(
  {
    layers: state`settings.visibility`,
    diagramOption: state`settings.diagramOption`,
    layerSettingClicked: signal`app.layerSettingClicked`,
    faultSettingClicked: signal`app.faultSettingClicked`,
    inspectorSettingClicked: signal`app.inspectorSettingClicked`,
    diagramOptionClicked: signal`app.diagramOptionClicked`
  },
  function SideMenu ({
    className,
    layerSettingClicked,
    faultSettingClicked,
    inspectorSettingClicked,
    diagramOptionClicked,
    layers = {},
    diagramOption
  }) {
    return (
      <Draggable>
        <Wrapper className={className}>
          <Handle>
            <LayerButton
              inactive={diagramOption === 'age' || diagramOption === 'force'}
              onClick={() => layerSettingClicked()}
              show={layers.layers}
            >
              Layers
            </LayerButton>
            <LayerButton
              inactive={diagramOption === 'age' || diagramOption === 'force'}
              onClick={() => faultSettingClicked()}
              show={layers.faults}
            >
              Faults
            </LayerButton>
            <LayerButton
              onClick={() => inspectorSettingClicked()}
              show={layers.inspector}
            >
              Inspector
            </LayerButton>
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
