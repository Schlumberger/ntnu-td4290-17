import React from 'react';
import { string, array, object, func } from 'prop-types';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';

import computeFaults from 'computed/computeFaults';
import computeLayers from 'computed/computeLayers';
import computeMaxDimentions from 'computed/computeMaxDimentions';

import divideAreasByFaults from 'computed/divideAreasByFaults';

import {
  Wrapper,
  Visualization,
  ImmersiveBar,
  InfoBox,
  GridWrapper,
  PlacesBar
} from './elements';

class App extends React.Component {
  render () {
    const testLayers = [
      {
        category: 'carboniferous',
        fill: '#218e93',
        geometryType: 'area',
        id: 'base-carboniferous',
        maxAge: 358.9,
        minAge: 298.9,
        points: [
          {
            x: 0,
            y0: 10,
            y1: 30,
            minAge: 30,
            maxAge: 30
          },
          {
            x: 10,
            y0: 7,
            y1: 45,
            minAge: 40,
            maxAge: 40
          },
          {
            x: 20,
            y0: 30,
            y1: 37,
            minAge: 50,
            maxAge: 50
          }
        ]
      }
    ];

    divideAreasByFaults(testLayers, this.props.faults);
    // Here we now have access to this.props.* as what the computed returned
    return (
      <Wrapper>
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
          layers={testLayers}
          dimentions={this.props.dimentions}
          yAxisUnit={this.props.yAxisUnit}
          onLayerClicked={this.props.layerClicked}
          onEmptyClicked={this.props.emptyClicked}
        />
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
  {
    // This assigns this.props.* to the return value of the computed
    faults: computeFaults,
    layers: computeLayers,
    dimentions: computeMaxDimentions,
    yAxisUnit: state`settings.yAxisUnit`,
    layerClicked: signal`app.layerClicked`,
    emptyClicked: signal`app.emptyClicked`,
    places: state`places`
  },
  App
);
