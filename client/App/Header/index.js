import React from 'react';
import { string, node } from 'prop-types';
import { UlHeader, WrapperHeader, LiHeader, WrapperImg } from './elements';

function Header ({ children, className }) {
  const buttons = ['Home', 'Data', 'Storage', 'About us'].map(button => (
    <LiHeader key={button}>{button}</LiHeader>
  ));

  return (
    <WrapperHeader className={className}>
      <WrapperImg>
        <img
          src='https://protrain.hs.llnwd.net/e2/sitefiles/10178/Templates/145/schlumberger-logo.png'
          height='50px'
        />
      </WrapperImg>
      <UlHeader>{buttons}</UlHeader>
    </WrapperHeader>
  );
}

Header.propTypes = {
  className: string,
  children: node
};

export default Header;
