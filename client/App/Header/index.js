import React from 'react';
import { UlHeader, WrapperHeader, LiHeader, WrapperImg } from './elements';

export default function Header({ children, className }) {
  const buttons = ['Home', 'Data', 'Storage', 'About us'].map(button => (
    <LiHeader key={button}>{button}</LiHeader>
  ));

  return (
    <WrapperHeader className={className}>
      <WrapperImg>
        <img
          src="https://protrain.hs.llnwd.net/e2/sitefiles/10178/Templates/145/schlumberger-logo.png"
          height="50px"
        />
      </WrapperImg>
      <UlHeader>{buttons}</UlHeader>
    </WrapperHeader>
  );
}
