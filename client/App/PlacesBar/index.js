import React from 'react';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';

import { Wrapper, Note } from './elements';

export default connect(
  {
    // Get the state located in .layers
    layers: state`settings.visibility`,
    yAxisUnit: state`settings.yAxisUnit`,
    // Get the signal in app.layerClicked in the app-module
    layerClicked: signal`app.layerSettingClicked`,
    yAxisOptionClicked: signal`app.yAxisOptionClicked`,
    places: state`places`,
  },
  function PlacesTopBar({
    className,
    layerClicked,
    yAxisOptionClicked,
    layers = {},
    yAxisUnit,
    places
  }) {
    console.log('deem bitchiz');
    console.log(places);
    let placeNames = [];
    if (places) {
      for (let p of places.sort(function (x, y) {
        return x.x - y.x;
      })) {
        placeNames.push(<Note>{p.text}</Note>);
      }
    }
    console.log(placeNames);
    // const placeNames = places.map(place => (
    //   {place.text}
    // ));
    // console.log(placeNames);
    return (
      <Wrapper className={className}>
        {placeNames}
      </Wrapper>
    );
  }
);
