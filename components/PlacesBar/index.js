import React, { Component } from 'react';
import { string, shape, number, arrayOf, object } from 'prop-types';
import { Wrapper, Note } from './elements';
// import { create, update, destroy } from './visualization';

class PlacesBar extends Component {
  constructor (props) {
    super(props);

    this.state = {
      width: 0,
      height: 0
    };
    this.updateSize = this.updateSize.bind(this);
  }
  componentDidMount () {
    this.updateSize();
    window.addEventListener('resize', this.updateSize);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateSize () {
    this.setState({
      width: this.wrapper.offsetWidth,
      height: this.wrapper.offsetHeight
    });
  }

  render () {
    let placeNames = [];
    if (this.props.places) {
      let coef = this.state.width / this.props.dimensions.maxWidth;

      for (let p of this.props.places) {
        let left = p.x * coef;
        let leftCorr = Math.max(0, left - 10 * coef);
        placeNames.push(
          <Note key={p.id} left={leftCorr}>
            {p.text}
          </Note>
        );
      }
    }
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

PlacesBar.propTypes = {
  className: string,
  places: arrayOf(object),
  dimensions: shape({
    maxWidth: number
  })
};

export default PlacesBar;
