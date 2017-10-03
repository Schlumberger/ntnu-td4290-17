import React, { Component } from 'react';
import { Wrapper, Note } from './elements';
// import { create, update, destroy } from './visualization';

export default class PlacesBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0
    };
    this.updateSize = this.updateSize.bind(this);
  }
  componentDidMount() {
    this.updateSize();
    window.addEventListener('resize', this.updateSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateSize() {
    this.setState({
      width: this.wrapper.offsetWidth,
      height: this.wrapper.offsetHeight
    });
  }

  render() {
    let placeNames = [];
    if (this.props.places) {
      let coef = (this.state.width / 1000) / this.props.dimensions.maxWidth;

      for (let p of this.props.places) {
        let left = p.x * coef;
        let leftCorr = left - 10 * coef < 0 ? 0 : left - 10 * coef;
        placeNames.push(<Note key={p.id} left={leftCorr}>{p.text}</Note>);
      }
    };
    return (
      <Wrapper
        className={this.props.className}
        innerRef={wrapper => (this.wrapper = wrapper)}
      >
        {placeNames}
      </Wrapper>
    );
  }
}
