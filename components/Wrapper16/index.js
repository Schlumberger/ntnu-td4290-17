import React from 'react';
import { Wrapper } from './elements';

export default function({ className, children }) {
  return <Wrapper className={className}>{children}</Wrapper>;
}
