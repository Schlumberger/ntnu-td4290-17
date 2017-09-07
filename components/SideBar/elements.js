import styled from "styled-components";

export const SidebarContainer = styled.div`
  background: #dddddd;
  width: 100px;
  position: fixed !important;
  z-index: 1;
  overflow: auto;
  height: 100%;
  line-height: 1.5;
`;

export const SidebarTitle = styled.span`
  display: block;
  color: inherit;
  font-family: Verdana, sans-serif;
  font-size: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const SidebarLink = styled.a`
  display: block;
  color: inherit;
  text-decoration-line: none;
  font-family: Verdana, sans-serif;
  font-size: 16px;
  padding-left: 16px;
  padding-right: 16px;
  :hover {
    background: #aaaaaa;
  }
`;
