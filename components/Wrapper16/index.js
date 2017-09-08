import React from 'react';
import { Wrapper } from './elements';

export default function({ className, children, onClick }) {
  return <Wrapper className={className} onClick={onClick}>{children}</Wrapper>;
}
