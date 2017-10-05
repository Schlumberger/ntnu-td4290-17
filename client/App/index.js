import React from 'react';
import { string, array, object, func } from 'prop-types';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';

import computeFaults from 'computed/computeFaults';
import computeLayers from 'computed/computeLayers';
import computeMaxDimentions from 'computed/computeMaxDimentions';

import genTestData from 'computed/genTestData';
import genSubareasByFaults from 'computed/genSubareasByFaults';

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
    const { testLayers, testFaults } = genTestData();

    genSubareasByFaults(testLayers, testFaults);

    // console.log('Layers after compution:');
    // console.log(testLayers);
    //
    // //convert subareas to actual layers for vizualization
    // testLayers[0].subareas.forEach(s => {
    //   //we copy the original layers atributes, but override the points with the subareas points
    //   let nLayer = {};
    //   for (var k in testLayers[0]) nLayer[k] = testLayers[0][k];
    //   nLayer.points = s.points;
    //   testLayers.push(nLayer);
    // });
    //
    // testLayers.splice(0, 1);

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
          faults={testFaults}
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
