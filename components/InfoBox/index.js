import React from 'react';
import { Wrapper } from './elements';

export default function InfoBox({ info, className }) {
  if (!info) {
    return <Wrapper className={className}>{'Click a layer'}</Wrapper>;
  }
  return (
    <Wrapper className={className}>
      <h3>{info.id}</h3>
      <h3>{'minAge: ' + info.minAge}</h3>
      <h3>{'maxAge: ' + info.maxAge}</h3>
    </Wrapper>
  );
}
