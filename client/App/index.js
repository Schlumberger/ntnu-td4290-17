import React from 'react';
import { connect } from '@cerebral/react';
import { state } from 'cerebral/tags';

import computeFaults from 'computed/computeFaults';
import computeLayers from 'computed/computeLayers';
import computeMaxDimentions from 'computed/computeMaxDimentions';

import { Wrapper, Visualization, ImmersiveBar } from './elements';

// Connect the component to cerebral so that cerebral can manage it
export default connect(
  // The first argument is an object that describes what you want to get from cerebral
  {
    // This assigns this.props.* to the return value of the computed
    faults: computeFaults,
    layers: computeLayers,
    dimentions: computeMaxDimentions,
    yAxisUnit: state`settings.yAxisUnit`
  },
  class App extends React.Component {
    render() {
      // Here we now have access to this.props.* as what the computed returned
      return (
        <Wrapper>
          <ImmersiveBar />
          <Visualization
            faults={this.props.faults}
            layers={this.props.layers}
            dimentions={this.props.dimentions}
            yAxisUnit={this.props.yAxisUnit}
          />
        </Wrapper>
      );
    }
  }
);
