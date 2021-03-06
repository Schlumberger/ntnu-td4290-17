import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { Wrapper } from './elements';
import {
  create as vizCreate,
  update as vizUpdate,
  destroy as vizDestroy
} from './visualization';
import {
  create as forceCreate,
  update as forceUpdate,
  destroy as forceDestroy
} from './forceDiagram';

class Visualization extends Component {
  constructor (props) {
    super(props);

    this.state = {
      width: 0,
      height: 0
    };
    this.updateSize = this.updateSize.bind(this);

    // to check if we have changed to the forceDiagram or back
    this.wasForceDiagram = false;

    // init visualization methods to normal
    setNormalDiagramState(this);
  }
  componentDidMount () {
    this.create(this.svg, this.props, this.state);

    this.updateSize();
    window.addEventListener('resize', this.updateSize);
  }

  componentDidUpdate () {
    // check if the state has changed to or from forceDiagram.
    // if so, update state
    if (this.props.diagramOption !== 'force' && this.wasForceDiagram) {
      // go from forceDiagram to normal
      this.wasForceDiagram = false;
      // console.log('switch to normal diagram');

      // destroy the last visualization
      this.destroy(this.svg);
      // set new viz state
      setNormalDiagramState(this);
      // create new state
      this.create(this.svg, this.props, this.state);
    } else if (this.props.diagramOption === 'force' && !this.wasForceDiagram) {
      // go from normal diagram to force
      this.wasForceDiagram = true;
      // console.log('switch to force diagram');

      this.destroy(this.svg);
      setForceDiagramState(this);
      this.create(this.svg, this.props, this.state);
    } else {
      // if create is executed, update is also executed
      // do the update
      this.update(this.svg, this.props, this.state);
    }
  }

  componentWillUnmount () {
    this.destroy(this.svg);

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

const setForceDiagramState = object => {
  object.create = forceCreate;
  object.update = forceUpdate;
  object.destroy = forceDestroy;
};
const setNormalDiagramState = object => {
  object.create = vizCreate;
  object.update = vizUpdate;
  object.destroy = vizDestroy;
};

Visualization.propTypes = {
  className: string,
  onEmptyClicked: func,
  diagramOption: string
};

export default Visualization;
