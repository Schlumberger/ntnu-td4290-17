import React from "react";
import { SidebarContainer, SidebarLink, SidebarTitle } from "./elements";

export default function SideBar({ children }) {
  return (
    <SidebarContainer>
      <SidebarTitle>MENU</SidebarTitle>
      <SidebarLink href="#">Link 1</SidebarLink>
      <SidebarLink href="#">Link 2</SidebarLink>
      <SidebarLink href="#">Link 3</SidebarLink>
    </SidebarContainer>
  );
}
