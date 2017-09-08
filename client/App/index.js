import React from 'react';
import { connect } from 'cerebral/react';

import computeVisualizationData from 'computed/computeVisualizationData';

import { Wrapper, Visualization } from './elements';

import SideBar from './SideBar';


export default connect(
  {
    data: computeVisualizationData
  },
  class App extends React.Component {
    render() {
      return (
        <Wrapper>
          <HeaderMenu />
          <SideMenu />
          <Visualization data={this.props.data} />
          <Footer />
        </Wrapper>
      );
    }

  }
);
