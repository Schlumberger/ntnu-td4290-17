import React from 'react';
import { Wrapper } from './elements';

export default function InfoBox({ info, className, color }) {
  if (!info) {
    return (
      <Wrapper color={color} className={className}>
        <h3>{'Click a layer'}</h3>
      </Wrapper>
    );
  }
  return (
    <Wrapper color={color} className={className}>
      <h3>{info.id.split('-').join(' ')}</h3>
      <h3>{'minAge: ' + info.minAge}</h3>
      <h3>{'maxAge: ' + info.maxAge}</h3>
    </Wrapper>
  );
}
