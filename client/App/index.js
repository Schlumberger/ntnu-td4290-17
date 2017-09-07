import React from "react";

import { Wrapper, Visualization } from "./elements";

import SideBar from "components/SideBar";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <SideBar />
        <Wrapper>
          <Visualization data={["test"]} />
        </Wrapper>
      </div>
    );
  }
}
