import React from 'react';
import { string, array, object, func } from 'prop-types';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';

import computeFaults from 'computed/computeFaults';
import computeLayers from 'computed/computeLayers';
import computeMaxDimentions from 'computed/computeMaxDimentions';

import {
  Wrapper,
  Visualization,
  ImmersiveBar,
  InfoBox,
  GridWrapper,
  PlacesBar,
  ButtonWrapper,
  ButtonIcon,
  ButtonText
} from './elements';

const dependencies = {
  user: state`app.user`,
  faults: computeFaults,
  layers: computeLayers,
  dimentions: computeMaxDimentions,
  yAxisUnit: state`settings.yAxisUnit`,
  layerClicked: signal`app.layerClicked`,
  emptyClicked: signal`app.emptyClicked`,
  routed: signal`app.routed`,
  places: state`places`
};

class App extends React.Component {
  render () {
    // Here we now have access to this.props.* as what the computed returned
    return (
      <Wrapper>
        {this.props.user ? (
          <div>
            <PlacesBar
              places={this.props.places}
              dimensions={this.props.dimentions}
            />
            <GridWrapper>
              <ImmersiveBar />
              <InfoBox />
            </GridWrapper>
            <Visualization
              faults={this.props.faults}
              layers={this.props.layers}
              dimentions={this.props.dimentions}
              yAxisUnit={this.props.yAxisUnit}
              onLayerClicked={this.props.layerClicked}
              onEmptyClicked={this.props.emptyClicked}
            />
          </div>
        ) : (
          <ButtonWrapper onClick={() => this.props.routed()}>
            <ButtonText>{'Login with google'}</ButtonText>
          </ButtonWrapper>
        )}
      </Wrapper>
    );
  }
}

App.propTypes = {
  faults: array,
  layers: array,
  dimentions: object,
  yAxisUnit: string,
  layerClicked: func,
  emptyClicked: func,
  places: array
};

// Connect the component to cerebral so that cerebral can manage it
export default connect(
  // The first argument is an object that describes what you want to get from cerebral
  dependencies,
  App
);
