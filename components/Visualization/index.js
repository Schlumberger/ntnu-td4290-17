import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { Wrapper } from './elements';
import { create, update, destroy } from './visualization';

class Visualization extends Component {
  constructor (props) {
    super(props);

    this.state = {
      width: 0,
      height: 0
    };
    this.updateSize = this.updateSize.bind(this);
  }
  componentDidMount () {
    create(this.svg, this.props, this.state);

    this.updateSize();
    window.addEventListener('resize', this.updateSize);
  }

  componentDidUpdate () {
    update(this.svg, this.props, this.state);
  }

  componentWillUnmount () {
    destroy(this.svg);

    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateSize () {
    this.setState({
      width: this.wrapper.offsetWidth,
      height: this.wrapper.offsetHeight
    });
  }

  render () {
    return (
      <Wrapper
        className={this.props.className}
        innerRef={wrapper => (this.wrapper = wrapper)}
        onClick={() => this.props.onEmptyClicked()}
      >
        <svg ref={svg => (this.svg = svg)} />
      </Wrapper>
    );
  }
}

Visualization.propTypes = {
  className: string,
  onEmptyClicked: func
};

export default Visualization;
