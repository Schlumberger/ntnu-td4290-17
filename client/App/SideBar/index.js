import React from 'react';
import {
  SidebarContainer,
  SidebarLink,
  SidebarImage,
  SidebarLinkText,
  SidebarHamburger,
  SidebarHamburgerContainer,
  SidebarHamburgerText
} from './elements';

export default function SideBar() {
  return (
    <SidebarContainer>
      <SidebarHamburgerContainer>
        <SidebarHamburger />
        <SidebarHamburger />
        <SidebarHamburger />
        <SidebarHamburgerText>SCHLUMBERGER</SidebarHamburgerText>
        <SidebarHamburger />
        <SidebarHamburger />
        <SidebarHamburger />
      </SidebarHamburgerContainer>

      <SidebarLink href="#">
        <SidebarImage src="https://www.w3schools.com/html/html5.gif" />
        <SidebarLinkText>Link 1</SidebarLinkText>
      </SidebarLink>
      <SidebarLink href="#">
        <SidebarImage src="http://icons.iconarchive.com/icons/marcus-roberto/google-play/128/Google-Chrome-icon.png" />
        <SidebarLinkText>Link 2</SidebarLinkText>
      </SidebarLink>
      <SidebarLink href="#">
        <SidebarImage src="http://icons.iconarchive.com/icons/bokehlicia/pacifica/256/browser-chromium-icon.png" />
        <SidebarLinkText>Link 3</SidebarLinkText>
      </SidebarLink>
    </SidebarContainer>
  );
}
