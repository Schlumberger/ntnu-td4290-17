import React from 'react';
import { connect } from '@cerebral/react';
import { state } from 'cerebral/tags';
import Draggable from 'react-draggable';
import { Wrapper } from './elements';

export default connect(
  {
    info: state`app.info`,
    color: state`chronostrat.${state`app.info.category`}.color`,
    visible: state`settings.visibility.inspector`
  },
  function InfoBox ({ info, className, color, visible }) {
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
        <Wrapper color={color} visible={visible} className={className}>
          <h4>{info.id.split('-').join(' ')}</h4>
          <h4>{'Age: ' + info.minAge + ' - ' + info.maxAge + ' MY'}</h4>
        </Wrapper>
      </Draggable>
    );
  }
);
