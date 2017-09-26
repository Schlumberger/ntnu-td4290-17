import React from 'react';
import { Wrapper } from './elements';

export default function InfoBox({ info, className, color }) {
  if (!info) {
    return (
      <Wrapper color={color} className={className}>
        <h4>{'Click a layer'}</h4>
      </Wrapper>
    );
  }
  return (
    <Wrapper color={color} className={className}>
      <h4>{info.id.split('-').join(' ')}</h4>
      <h4>{'minAge: ' + info.minAge}</h4>
      <h4>{'maxAge: ' + info.maxAge}</h4>
    </Wrapper>
  );
}
