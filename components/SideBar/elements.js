import styled from 'styled-components';

export const SidebarContainer = styled.div`
  background: #dddddd;
  width: 50px;
  position: fixed !important;
  z-index: 1;
  overflow: auto;
  height: 100%;
  line-height: 1.5;
  transition: width 0.05s; /*linear;*/
  :hover {
    width: 120px;
  }
`;

export const SidebarHamburgerContainer = styled.div`
  display: block;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  max-height: 50px;
  overflow: hidden;
`;

export const SidebarHamburger = styled.span`
  display: block;
  width: 33px;
  height: 4px;
  margin-top: 3px;
  margin-bottom: 3px;
  position: relative;
  background: #888888;
  border-radius: 1px;
  float: left;
`;

export const SidebarHamburgerText = styled.span`
  font-family: Verdana, sans-serif;
  font-size: 10px;
`;

export const SidebarLink = styled.a`
  display: block;
  color: inherit;
  text-decoration-line: none;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  max-height: 40px;
  overflow: hidden;
  :hover {
    background: #aaaaaa;
  }
  :hover > span {
    margin-left: 16px;
  }
`;

export const SidebarLinkText = styled.span`
  margin-left: 10px;
  font-family: Verdana, sans-serif;
  font-size: 16px;

  transition: margin-left 0.1s;
`;

export const SidebarImage = styled.img`
  width: 20px;
  height: 20px;
`;
