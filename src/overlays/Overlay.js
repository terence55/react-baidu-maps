import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from '../utils/wrapClass';
import { MAP } from '../utils/constants';

/**
 * Overlay
 * @author terencewu
 */

const publicMethodMap = [
  'isVisible',
  'show',
  'hide'
];

class Overlay extends React.Component {
  static propTypes = {
    [MAP]: PropTypes.object,
    customConstructor: PropTypes.func,
    constructorParams: PropTypes.object,
    initialize: PropTypes.func,
    draw: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  getInstanceFromComponent(component) {
    return component.label;
  }

  componentDidMount() {
    const { customConstructor, constructorParams, initialize, draw } = this.props;
    const CustomOverlayClass = this.getOverlayClass(customConstructor, initialize, draw);
    this.overlay = new CustomOverlayClass(constructorParams); // eslint-disable-line no-undef
    this.props[MAP].addOverlay(this.overlay);
  }

  render() {
    const { children } = this.props; // eslint-disable-line react/prop-types
    if (children) {
      return <div>{children}</div>;
    }
    return false;
  }

  getOverlayClass(customConstructor, initialize, draw) {
    return class CustomOverlay extends BMap.Overlay { // eslint-disable-line
      static displayName = 'CustomOverlay';

      constructor(params) {
        super();
        if (customConstructor) {
          customConstructor(this, params);
        }
      }

      initialize(map) {
        if (initialize) {
          initialize(this, map);
        }
      }

      draw() {
        if (draw) {
          draw(this);
        }
      }
    };
  }
}

export default wrapClass(Overlay, null, null, publicMethodMap);
