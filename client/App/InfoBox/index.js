import React from 'react';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';
import Draggable from 'react-draggable';
import { Wrapper } from './elements';

export default connect(
  {
    info: state`app.info`,
    color: state`chronostrat.${state`app.info.category`}.color`
  },
  function InfoBox({ info, className, color }) {
    if (!info) {
      return (
        <Draggable>
          <Wrapper color={color} className={className}>
            <h4>{'Click a layer'}</h4>
          </Wrapper>
        </Draggable>
      );
    }
    return (
      <Draggable>
        <Wrapper color={color} className={className}>
          <h4>{info.id.split('-').join(' ')}</h4>
          <h4>{'minAge: ' + info.minAge}</h4>
          <h4>{'maxAge: ' + info.maxAge}</h4>
        </Wrapper>
      </Draggable>
    );
  }
);
