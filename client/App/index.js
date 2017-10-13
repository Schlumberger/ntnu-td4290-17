import React from 'react';
import { string, array, object, func } from 'prop-types';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';

import computeFaults from 'computed/computeFaults';
import computeLayers from 'computed/computeLayers';
import computeMaxDimentions from 'computed/computeMaxDimentions';

import genTestData from 'computed/genTestData';
import genSublayersByFaults from 'computed/genSublayersByFaults';

import {
  Wrapper,
  Visualization,
  ImmersiveBar,
  InfoBox,
  GridWrapper,
  PlacesBar
} from './elements';

function divideLayers(testLayers, testFaults) {
  //testLayers is mutated
  genSublayersByFaults(testLayers, testFaults);

  // console.log('Layers after compution:');
  // console.log(testLayers);

  //convert subareas to actual layers for vizualization
  const preLayersLen = testLayers.length;
  testLayers.forEach(l => {
    l.subareas.forEach(s => {
      //we copy the original layers atributes, but override the points with the subareas points
      let nLayer = {};
      for (var k in l) nLayer[k] = l[k];
      nLayer.points = s.points;
      testLayers.push(nLayer);
    });
  });

  //remove old layers
  testLayers.splice(0, preLayersLen);

  console.log('Layers after adding sublayers:');
  console.log(testLayers);
}

class App extends React.Component {
  render() {
    //try splitting by faults
    divideLayers(this.props.layers, this.props.faults);
    //genSublayersByFaults(this.props.layers, this.props.faults);

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
          layers={this.props.layers}
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
