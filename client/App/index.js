import React from 'react';
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
    places: state`places`
  },
  class App extends React.Component {
    render() {
      const testLayers = [
        {
          category: 'carboniferous',
          fill: '#218e93',
          geometryType: 'area',
          id: 'base-carboniferous',
          maxAge: 358.9,
          minAge: 298.9,
          stroke: 'white',
          type: 'layer',
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

      const testFaults = [
        {
          fill: 'none',
          geometryType: 'line',
          id: 'fault-14',
          maxAge: 358.9,
          minAge: 298.9,
          stroke: 'black',
          type: 'fault',
          points: [
            {
              x: 5,
              y: 0
            },
            {
              x: 17,
              y: 50
            }
          ]
        }
      ];

      console.log(this.props.faults);

      //setTimeout(200);

      //divideAreasByFaults(testLayers, this.props.faults);

      // Here we now have access to this.props.* as what the computed returned
      return (
        <Wrapper>
          <PlacesBar
            places={this.props.places}
            dimensions={this.props.dimentions}
          />
          <GridWrapper>
            <ImmersiveBar />
            <InfoBox color={this.props.infoBoxColor} info={this.props.info} />
          </GridWrapper>
          <Visualization
            faults={testFaults}
            layers={testLayers} //this.props.layers}
            dimentions={this.props.dimentions}
            yAxisUnit={this.props.yAxisUnit}
            onLayerClicked={this.props.layerClicked}
          />
        </Wrapper>
      );
    }
  }
);
