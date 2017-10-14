import React from 'react';
import { string, array, object, func } from 'prop-types';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';

import computeFaults from 'computed/computeFaults';
import computeLayers from 'computed/computeLayers';
import computeMaxDimentions from 'computed/computeMaxDimentions';

import computeSubareas from 'computed/computeSubareas';
import computeIntersections from 'computed/computeIntersections';

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
          subareas={this.props.subareas}
          intsctns={this.props.intersections}
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
  subareas: array,
  intersections: array,
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
    subareas: computeSubareas,
    intersections: computeIntersections,
    dimentions: computeMaxDimentions,
    yAxisUnit: state`settings.yAxisUnit`,
    layerClicked: signal`app.layerClicked`,
    emptyClicked: signal`app.emptyClicked`,
    places: state`places`
  },
  App
);
