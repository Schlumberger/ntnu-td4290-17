import React from 'react';
import { connect } from 'cerebral/react';

import computeVisualizationData from 'computed/computeVisualizationData';

import { Wrapper, Visualization, ImmersiveBar } from './elements';

// Connect the component to cerebral so that cerebral can manage it
export default connect(
  // The first argument is an object that describes what you want to get from cerebral
  {
    // This assigns this.props.data to the return value of the computed
    data: computeVisualizationData
  },
  class App extends React.Component {
    render() {
      console.log(this.props.data);
      // Here we now have access to this.props.data as what the computed returned
      return (
        <Wrapper>
          <ImmersiveBar />
          <Visualization data={this.props.data} />
        </Wrapper>
      );
    }
  }
);
