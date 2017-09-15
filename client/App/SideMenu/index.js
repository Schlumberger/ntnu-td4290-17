import React from 'react';
import { connect } from 'cerebral/react';
import { state, signal } from 'cerebral/tags';

import { Wrapper, Title, LayerButton } from './elements';

export default connect(
  {
    //my figure state
    figure: state`figure`,

    // Get the state located in .layers
    layers: state`settings.visibility`,
    // Get the signal in app.layerClicked in the app-module
    layerClicked: signal`app.layerClicked`,

    transitionClicked: signal`app.transitionClicked`
  },
  function SideMenu({
    className,
    layerClicked,
    transitionClicked,
    figure,
    layers = {}
  }) {
    //set a timer for transitionClicked
    //setTimeout(() => transitionClicked(), 299);

    // Map data to components

    // const layerButtons = Object.keys(layers).map(layerID => (
    //   <LayerButton
    //     key={layerID}
    //     inactive={!layers[layerID]}
    //     // use signal as a function
    //     onClick={() => layerClicked({ layerID })}
    //   >
    //     {layerID.split('-').join(' ')}
    //   </LayerButton>
    // ));

    return (
      <Wrapper className={className}>
        <Title>{'Layers'}</Title>

        <LayerButton onClick={() => transitionClicked()}>
          {'Go from ' + figure}
        </LayerButton>
      </Wrapper>
    );
  }
);
